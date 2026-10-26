// Zero-dependency local server that mirrors the rewrites in vercel.json.
// Usage: node serve.mjs [port]
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.argv[2]) || 5174;
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".txt": "text/plain", ".xml": "application/xml",
};

async function isFile(p) { try { return (await stat(p)).isFile(); } catch { return false; } }

async function resolve(pathname) {
  const p = join(root, normalize(decodeURIComponent(pathname)));
  if (!p.startsWith(root)) return null; // block path traversal
  for (const c of [p, join(p, "index.html"), `${p}.html`]) if (await isFile(c)) return c;
  if (/^\/careers\/[^/]+(\/apply)?\/?$/.test(pathname)) return join(root, "careers", "role.html");
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://x");
  const file = await resolve(pathname);
  if (!file) { res.writeHead(404, { "Content-Type": types[".html"] }); res.end(await readFile(join(root, "404.html"))); return; }
  res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
  res.end(await readFile(file));
}).listen(port, () => console.log(`SenXDev (next) running at http://localhost:${port}`));
