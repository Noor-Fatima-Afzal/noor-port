// Vercel serverless function wrapper around the TanStack Start SSR bundle.
// Vercel routes any request not matched by a static asset in dist/client to
// this function (see ../vercel.json). The function converts the Node IncomingMessage
// into a web Request, passes it to the SSR handler, and streams the response back.
import { Readable } from "node:stream";
import handler from "../dist/server/server.js";

// Note: Do not set `export const config = { runtime: "..." }` here.
// Vercel's serverless function config only accepts "edge" / "experimental-edge"
// in this field; the Node.js runtime is selected automatically for `.mjs`
// files (and can be pinned via `functions` in vercel.json if needed).

function getProtocol(req) {
  const xfProto = req.headers["x-forwarded-proto"];
  if (typeof xfProto === "string" && xfProto.length) return xfProto.split(",")[0].trim();
  return "https";
}

function toWebRequest(req) {
  const protocol = getProtocol(req);
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, String(value));
    }
  }

  const method = req.method || "GET";
  const init = { method, headers };
  if (method !== "GET" && method !== "HEAD") {
    init.body = Readable.toWeb(req);
    init.duplex = "half";
  }
  return new Request(url, init);
}

async function sendWebResponse(webRes, res) {
  res.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  if (!webRes.body) {
    res.end();
    return;
  }
  const nodeStream = Readable.fromWeb(webRes.body);
  nodeStream.pipe(res);
}

export default async function vercelHandler(req, res) {
  try {
    const webRequest = toWebRequest(req);
    const webResponse = await handler.fetch(webRequest);
    await sendWebResponse(webResponse, res);
  } catch (err) {
    console.error("[vercel-ssr]", err);
    res.statusCode = 500;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("Internal Server Error");
  }
}
