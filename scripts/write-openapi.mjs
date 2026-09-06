// Writes the OpenAPI document (src/publicApi/openapi.js) to dist/openapi.json so
// it is served as a static file at /openapi.json — the conventional location
// agents probe first. The Function at /api/v1/openapi.json serves the same
// object live; a test asserts the two are identical.
//
// Runs after `vite build` (which creates dist/) and before prerender.mjs.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildOpenApi } from "../src/publicApi/openapi.js";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(ROOT, "dist", "openapi.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(buildOpenApi(), null, 2) + "\n");
console.log(`Wrote ${path.relative(ROOT, out)}`);
