// Headings spell out "and" rather than using "&" (Skagen, 10/11/2026).
// Names keep their "&" in data, navigation, page titles and schema; this is
// applied where a name or title is shown as a heading.
export function spellAnd(text) {
  return typeof text === "string" ? text.replace(/\s+&(?:amp;)?\s+/g, " and ") : text;
}
