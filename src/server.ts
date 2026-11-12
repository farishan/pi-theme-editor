import { readFile, writeFile, readdir, mkdir, rename } from "node:fs/promises";
import { join, normalize, basename, extname } from "node:path";
import { homedir } from "node:os";

const PORT = Number(process.env.PI_THEME_EDITOR_PORT ?? 4317);
const AGENT_DIR = process.env.PI_AGENT_DIR ?? join(homedir(), ".pi", "agent");
const THEMES_DIR = join(AGENT_DIR, "themes");
const BUILTIN_THEMES_DIR = "/home/faris/.pi/agent/install/releases/1.5.2/node_modules/@earendil-works/pi-coding-agent/dist/modes/interactive/theme";
const PUBLIC_DIR = join(import.meta.dir, "..", "public");

const REQUIRED_COLORS = [
  "accent","border","borderAccent","borderMuted","success","error","warning","muted","dim","text",
  "thinkingText","selectedBg","userMessageBg","userMessageText","customMessageBg","customMessageText",
  "customMessageLabel","toolPendingBg","toolSuccessBg","toolErrorBg","toolTitle","toolOutput","mdHeading",
  "mdLink","mdLinkUrl","mdCode","mdCodeBlock","mdCodeBlockBorder","mdQuote","mdQuoteBorder","mdHr",
  "mdListBullet","toolDiffAdded","toolDiffRemoved","toolDiffContext","syntaxComment","syntaxKeyword",
  "syntaxFunction","syntaxVariable","syntaxString","syntaxNumber","syntaxType","syntaxOperator",
  "syntaxPunctuation","thinkingOff","thinkingMinimal","thinkingLow","thinkingMedium","thinkingHigh",
  "thinkingXhigh","bashMode",
];

const TOP_LEVEL = new Set(["$schema","name","appearance","vars","colors","export"]);

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

async function staticFile(pathname: string): Promise<Response | null> {
  const rel = pathname === "/" ? "/index.html" : pathname;
  const safe = normalize(rel).replace(/^(\.\.[/\\])+/, "");
  const full = join(PUBLIC_DIR, safe);
  if (!full.startsWith(PUBLIC_DIR)) return null;
  try {
    const body = await readFile(full);
    const mime: Record<string,string> = { ".html":"text/html; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".css":"text/css; charset=utf-8", ".json":"application/json; charset=utf-8" };
    return new Response(body, { headers: { "content-type": mime[full.slice(full.lastIndexOf("."))] ?? "application/octet-stream" } });
  } catch {
    return null;
  }
}

function validateTheme(theme: any): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!theme || typeof theme !== "object" || Array.isArray(theme)) {
    return { ok: false, errors: ["theme must be an object"] };
  }
  if (typeof theme.name !== "string" || !theme.name) errors.push("name is required (string)");
  if (theme.appearance !== undefined && theme.appearance !== "dark" && theme.appearance !== "light") errors.push("appearance must be dark or light");
  if (theme.vars !== undefined && (typeof theme.vars !== "object" || Array.isArray(theme.vars))) errors.push("vars must be an object");
  if (!theme.colors || typeof theme.colors !== "object" || Array.isArray(theme.colors)) errors.push("colors is required (object)");
  else {
    for (const k of REQUIRED_COLORS) if (!(k in theme.colors)) errors.push(`missing required color: ${k}`);
  }
  for (const k of Object.keys(theme)) if (!TOP_LEVEL.has(k)) errors.push(`unknown top-level field: ${k}`);
  return { ok: errors.length === 0, errors };
}

async function listThemes(): Promise<string[]> {
  await mkdir(THEMES_DIR, { recursive: true });
  const files = await readdir(THEMES_DIR);
  return files.filter((f) => extname(f) === ".json").map((f) => basename(f, ".json")).sort();
}

async function readTheme(name: string): Promise<any> {
  const safe = basename(name);
  const candidates = [join(THEMES_DIR, safe + ".json"), join(BUILTIN_THEMES_DIR, safe + ".json")];
  for (const c of candidates) {
    try { const raw = await readFile(c, "utf8"); return JSON.parse(raw); } catch {}
  }
  throw new Error("theme not found: " + safe);
}

async function writeTheme(name: string, theme: any): Promise<void> {
  const safe = basename(name);
  await mkdir(THEMES_DIR, { recursive: true });
  const target = join(THEMES_DIR, safe + ".json");
  const tmp = target + ".tmp";
  await writeFile(tmp, JSON.stringify(theme, null, 2) + "\n", "utf8");
  await rename(tmp, target);
}

Bun.serve({
  port: PORT,
  hostname: "127.0.0.1",
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/themes") {
      return json({ themes: await listThemes(), dir: THEMES_DIR });
    }

    if (url.pathname === "/api/theme" && req.method === "GET") {
      const name = url.searchParams.get("name");
      if (!name) return json({ error: "missing name" }, 400);
      try {
        const theme = await readTheme(name);
        return json({ name, theme });
      } catch (e: any) {
        return json({ error: e?.message ?? "not found" }, 404);
      }
    }

    if (url.pathname === "/api/theme" && req.method === "PUT") {
      let body: any;
      try { body = await req.json(); } catch { return json({ error: "invalid json" }, 400); }
      const name = body?.name;
      const theme = body?.theme;
      if (typeof name !== "string" || !name) return json({ error: "missing name" }, 400);
      const v = validateTheme(theme);
      if (!v.ok) return json({ error: "validation failed", errors: v.errors }, 400);
      if (theme.name !== name) theme.name = name;
      await writeTheme(name, theme);
      return json({ ok: true, name });
    }

    const file = await staticFile(url.pathname);
    if (file) return file;
    return new Response("Not found", { status: 404 });
  },
});

console.log(`pi-theme-editor → http://127.0.0.1:${PORT}`);
console.log(`themes dir: ${THEMES_DIR}`);