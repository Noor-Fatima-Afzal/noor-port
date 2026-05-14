import { createFileRoute } from "@tanstack/react-router";

const API_BASE_URL = "https://noor-fatima-01-portfolio-noor.hf.space";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Origin",
} as const;

export const Route = createFileRoute("/api/health")(({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: CORS_HEADERS }),

      GET: async () => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 30000);
          const upstream = await fetch(`${API_BASE_URL}/health`, {
            method: "GET",
            headers: { Accept: "application/json" },
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          const text = await upstream.text();
          return new Response(text, {
            status: upstream.ok ? upstream.status : 200,
            headers: {
              "Content-Type":
                upstream.headers.get("content-type") ?? "application/json",
              ...CORS_HEADERS,
            },
          });
        } catch (err) {
          return new Response(
            JSON.stringify({ ok: false, detail: String(err), fallback: true }),
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
