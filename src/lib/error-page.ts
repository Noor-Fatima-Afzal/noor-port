export function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Temporarily unavailable</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #09090b; color: #fafafa; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      main { width: min(92vw, 440px); text-align: center; }
      h1 { margin: 0 0 12px; font-size: 28px; line-height: 1.15; }
      p { margin: 0 0 24px; color: #a1a1aa; line-height: 1.6; }
      div { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
      a, button { border: 1px solid #3f3f46; border-radius: 10px; padding: 10px 14px; background: #18181b; color: #fafafa; font: inherit; text-decoration: none; cursor: pointer; }
      button:first-child { background: #fafafa; color: #09090b; border-color: #fafafa; }
    </style>
  </head>
  <body>
    <main>
      <h1>Temporarily unavailable</h1>
      <p>The portfolio is having trouble loading. Please refresh, or try again in a moment.</p>
      <div>
        <button onclick="location.reload()">Refresh</button>
        <a href="/">Go home</a>
      </div>
    </main>
  </body>
</html>`;
}