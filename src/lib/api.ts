/**
 * Resilient API wrapper for the portfolio backend.
 *
 * Handles cold starts, timeouts, retries with exponential backoff, and
 * graceful error fallbacks for a Hugging Face Spaces FastAPI service.
 *
 * All API calls in the app should go through this module — never fetch
 * the backend directly from a component.
 */

export const API_BASE_URL = "/api"; // proxied via TanStack server route → Hugging Face Space

const MAX_ATTEMPTS = 3;
const BASE_BACKOFF_MS = 1000; // 1s → 2s → 4s
const REQUEST_TIMEOUT_MS = 14000; // 14s per attempt
export const COLD_START_HINT_MS = 9000; // show "Waking up server…" after 9s

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status?: number };

export interface RequestOptions {
  /** Called when a single attempt exceeds COLD_START_HINT_MS (server likely cold). */
  onColdStart?: () => void;
  /** Called before each retry attempt (1-indexed attempt number coming next). */
  onRetry?: (nextAttempt: number) => void;
  /** Optional abort signal from the caller. */
  signal?: AbortSignal;
}

const SAFE_ERROR_MESSAGE =
  "Something is taking longer than expected. Retrying…";
const FINAL_ERROR_MESSAGE =
  "The assistant is temporarily unavailable. Please try again in a moment.";

function sleep(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

/**
 * Low-level resilient fetch with retries + cold-start awareness.
 * Returns parsed JSON on success, or a safe error envelope.
 */
export async function apiRequest<T = unknown>(
  path: string,
  init: RequestInit = {},
  opts: RequestOptions = {},
): Promise<ApiResult<T>> {
  const url = path.startsWith("http")
    ? path
    : `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    const coldStartTimer = setTimeout(() => {
      opts.onColdStart?.();
    }, COLD_START_HINT_MS);

    // Combine caller signal with our own
    const onCallerAbort = () => controller.abort();
    opts.signal?.addEventListener("abort", onCallerAbort);

    try {
      const res = await fetch(url, {
        ...init,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(init.body ? { "Content-Type": "application/json" } : {}),
          ...(init.headers ?? {}),
        },
      });
      clearTimeout(timeoutId);
      clearTimeout(coldStartTimer);

      // Retry on 5xx
      if (res.status >= 500 && res.status < 600) {
        console.warn(`[api] ${url} → ${res.status} (attempt ${attempt + 1})`);
        if (attempt + 1 < MAX_ATTEMPTS) {
          const delay = BASE_BACKOFF_MS * Math.pow(2, attempt);
          opts.onRetry?.(attempt + 2);
          await sleep(delay, opts.signal);
          continue;
        }
        return { ok: false, error: FINAL_ERROR_MESSAGE, status: res.status };
      }

      // 4xx — do not retry, surface a safe message
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.warn(`[api] ${url} → ${res.status}`, text);
        return {
          ok: false,
          error: FINAL_ERROR_MESSAGE,
          status: res.status,
        };
      }

      // Parse JSON safely
      const text = await res.text();
      if (!text) return { ok: true, data: null as T };
      try {
        const data = JSON.parse(text) as T;
        return { ok: true, data };
      } catch {
        console.warn(`[api] ${url} → invalid JSON`);
        return { ok: false, error: FINAL_ERROR_MESSAGE };
      }
    } catch (err) {
      clearTimeout(timeoutId);
      clearTimeout(coldStartTimer);

      const aborted =
        err instanceof DOMException && err.name === "AbortError";
      const callerAborted = opts.signal?.aborted ?? false;

      console.warn(
        `[api] ${url} attempt ${attempt + 1} failed:`,
        aborted ? "timeout/abort" : err,
      );

      if (callerAborted) {
        return { ok: false, error: "Request cancelled." };
      }

      if (attempt + 1 < MAX_ATTEMPTS) {
        const delay = BASE_BACKOFF_MS * Math.pow(2, attempt);
        opts.onRetry?.(attempt + 2);
        try {
          await sleep(delay, opts.signal);
        } catch {
          return { ok: false, error: "Request cancelled." };
        }
        continue;
      }

      return { ok: false, error: FINAL_ERROR_MESSAGE };
    } finally {
      opts.signal?.removeEventListener("abort", onCallerAbort);
    }
  }

  return { ok: false, error: SAFE_ERROR_MESSAGE };
}

// ---------- Domain endpoints ----------

export interface ChatResponse {
  answer?: string;
  response?: string;
  message?: string;
  sources_used?: number | string[];
  confidence?: number;
  uses_cv_data?: boolean;
  [k: string]: unknown;
}

export function askChat(question: string, opts: RequestOptions = {}) {
  return apiRequest<ChatResponse>(
    "/chat",
    {
      method: "POST",
      body: JSON.stringify({ question, top_k: 4 }),
    },
    opts,
  );
}

/**
 * Silently warm the backend on app load. Fire-and-forget.
 * Hits /health so cold-start latency is absorbed before the user types.
 */
let warmedUp = false;
export function warmUpBackend(): void {
  if (warmedUp || typeof window === "undefined") return;
  warmedUp = true;
  fetch(`${API_BASE_URL}/health`, { method: "GET" }).catch(() => {
    // Silent — best-effort wake-up
  });
}
