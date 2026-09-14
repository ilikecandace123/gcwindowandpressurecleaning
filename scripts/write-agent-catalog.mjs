// Writes the ARD catalog to dist/.well-known/ard.json, and the same document to
// dist/.well-known/ai-catalog.json (ARD §5.1: consumers MAY still consult the
// predecessor path, and serving it costs one file).
//
// The MCP server card is NOT written here — /.well-known/mcp is an existing
// FILE, so /.well-known/mcp/server-card.json cannot also be a directory on
// disk. The middleware serves it from the same builder instead.
//
// Runs after `vite build` (which creates dist/), beside write-agent-skills.mjs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildArdCatalog, ARD_PATH, AI_CATALOG_PATH } from "../src/publicApi/agentCatalog.js";
import { buildSkillsIndex } from "./agent-skills.mjs";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const catalog = buildArdCatalog({ skills: buildSkillsIndex().skills });

if (!catalog.entries.length) {
  console.error("ARD catalog has no entries — not writing an empty catalog.");
  process.exit(1);
}

const body = JSON.stringify(catalog, null, 2) + "\n";
for (const publishedPath of [ARD_PATH, AI_CATALOG_PATH]) {
  const out = path.join(ROOT, "dist", publishedPath.replace(/^\//, ""));
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, body);
  console.log(`Wrote ${path.relative(ROOT, out)} (${catalog.entries.length} entries)`);
}
