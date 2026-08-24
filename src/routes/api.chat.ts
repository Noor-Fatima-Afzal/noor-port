import { createFileRoute } from "@tanstack/react-router";

// Single source of truth for the Hugging Face Spaces backend.
// Keep this as a plain constant: reading process.env at module scope can break
// serverless runtime startup and make the whole published app return 502.
const API_BASE_URL = "https://noor-fatima-01-portfolio-noor.hf.space";
const UPSTREAM = `${API_BASE_URL}/chat`;

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Origin",
} as const;

export const Route = createFileRoute("/api/chat")(({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: CORS_HEADERS }),

      POST: async ({ request }: { request: Request }) => {
        try {
          const body = await request.json().catch(() => ({}));
          const question = String(
            (body as any)?.question ?? (body as any)?.message ?? "",
          ).trim();
          const top_k = Number((body as any)?.top_k) || 4;

          if (question.length < 3) {
            return new Response(
              JSON.stringify({
                error: "Message must be at least 3 characters.",
              }),
              {
                status: 400,
                headers: {
                  "Content-Type": "application/json",
                  ...CORS_HEADERS,
                },
              },
            );
          }

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 45000);

          let upstream: Response;
          try {
            upstream = await fetch(UPSTREAM, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({ question, top_k }),
              signal: controller.signal,
            });
          } finally {
            clearTimeout(timeoutId);
          }

          if (!upstream.ok) {
            const errText = await upstream.text().catch(() => "");
            console.error(
              `[api/chat] upstream ${upstream.status}:`,
              errText.slice(0, 300),
            );
            return new Response(
              JSON.stringify({
                answer:
                  "The AI assistant is temporarily unavailable (the backend is sleeping or restarting). Please try again in a moment.",
                fallback: true,
                upstream_status: upstream.status,
              }),
              {
                status: 200,
                headers: {
                  "Content-Type": "application/json",
                  ...CORS_HEADERS,
                },
              },
            );
          }

          const text = await upstream.text();
          return new Response(text, {
            status: 200,
            headers: {
              "Content-Type":
                upstream.headers.get("content-type") ?? "application/json",
              ...CORS_HEADERS,
            },
          });
        } catch (err) {
          console.error("[api/chat] proxy error:", err);
          return new Response(
            JSON.stringify({
              answer:
                "I couldn't reach the AI assistant right now. The backend may be waking up — please try again in a few seconds.",
              fallback: true,
              detail: err instanceof Error ? err.message : String(err),
            }),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json",
                ...CORS_HEADERS,
              },
            },
          );
        }
      },
    },
  },
}) as any);
