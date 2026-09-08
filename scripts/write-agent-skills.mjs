// Writes the Agent Skills discovery index to
// dist/.well-known/agent-skills/index.json. The SKILL.md files themselves are
// static assets under public/ that vite copies across; only the index is
// generated, because its digests are hashes of those files.
//
// Runs after `vite build` (which creates dist/), beside write-openapi.mjs.
import fs from "node:fs";
import path from "node:path";
import { ROOT, buildSkillsIndex } from "./agent-skills.mjs";

const out = path.join(ROOT, "dist", ".well-known", "agent-skills", "index.json");
const index = buildSkillsIndex();
if (!index.skills.length) {
  console.error("No skills found under public/.well-known/agent-skills/ — not writing an empty index.");
  process.exit(1);
}
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(index, null, 2) + "\n");
console.log(`Wrote ${path.relative(ROOT, out)} (${index.skills.length} skill${index.skills.length === 1 ? "" : "s"})`);
