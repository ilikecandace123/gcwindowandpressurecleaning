/**
 * Agent Skills discovery index — /.well-known/agent-skills/index.json
 *
 * The Agent Skills format (agentskills.io) packages a capability as a folder
 * with a SKILL.md at its root: YAML frontmatter carrying `name` and
 * `description`, then instructions. The discovery specification
 * (github.com/cloudflare/agent-skills-discovery-rfc) says how a site publishes
 * the skills it offers, under the RFC 8615 .well-known prefix, so a client can
 * find them without being told where to look.
 *
 * This site publishes one skill: how to price, check coverage for, and hand off
 * a booking of exterior cleaning here. It is the same instruction set already
 * at /agent-instructions.md, in the format skills-aware runtimes read.
 *
 * The index is BUILT, never hand-written, because every entry carries a
 * `digest` over the raw bytes of its artefact. Generating it from the files
 * themselves is the only way the two cannot drift: edit a SKILL.md and the next
 * build re-hashes it. `name` and `description` are read out of the frontmatter
 * for the same reason.
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const SKILLS_DIR = path.join(ROOT, "public", ".well-known", "agent-skills");
export const SCHEMA_URL = "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

/** agentskills.io: 1-64 chars, lowercase alphanumeric and hyphens, no leading, trailing or doubled hyphen. */
export const SKILL_NAME_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Read the YAML frontmatter of a SKILL.md.
 *
 * Deliberately small: the spec's frontmatter is a flat map of scalars plus an
 * optional one-level `metadata` map, which is all this reads. It is not a YAML
 * parser and is not meant to be one — a skill that needs more than the spec
 * describes should not be published here.
 */
export function parseFrontmatter(source) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(source);
  if (!match) return null;
  const fields = {};
  let current = null;
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    if (/^\s+\S/.test(line) && current) {
      const nested = /^\s+([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
      if (nested) fields[current][nested[1]] = nested[2].trim();
      continue;
    }
    const top = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!top) continue;
    const [, key, value] = top;
    if (value === "") {
      fields[key] = {};
      current = key;
    } else {
      fields[key] = value.trim();
      current = null;
    }
  }
  return fields;
}

/** Every skill directory published under public/.well-known/agent-skills/. */
export function skillDirectories() {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  return fs
    .readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(SKILLS_DIR, entry.name, "SKILL.md")))
    .map((entry) => entry.name)
    .sort();
}

export const sha256 = (bytes) => `sha256:${crypto.createHash("sha256").update(bytes).digest("hex")}`;

/**
 * Build the discovery document.
 *
 * `url` is relative to the index, which RFC 3986 resolution handles, so the
 * document stays correct if it is ever mirrored under another origin.
 */
export function buildSkillsIndex() {
  const skills = skillDirectories().map((dir) => {
    const file = path.join(SKILLS_DIR, dir, "SKILL.md");
    const bytes = fs.readFileSync(file);
    const front = parseFrontmatter(bytes.toString("utf8"));
    if (!front || !front.name || !front.description) {
      throw new Error(`${dir}/SKILL.md has no usable frontmatter (name and description are required)`);
    }
    if (front.name !== dir) {
      throw new Error(`${dir}/SKILL.md declares name "${front.name}"; the spec requires it to match the directory name`);
    }
    return {
      name: front.name,
      type: "skill-md",
      description: front.description,
      url: `/.well-known/agent-skills/${dir}/SKILL.md`,
      digest: sha256(bytes),
    };
  });

  return { $schema: SCHEMA_URL, skills };
}
