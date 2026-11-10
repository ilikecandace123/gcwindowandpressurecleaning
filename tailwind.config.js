/** @type {import('tailwindcss').Config} */
module.exports = {
  // Touch screens have no hover: without this, iOS paints the hover:bg-* tint
  // on whatever link a finger drags across while scrolling the mobile menu.
  future: { hoverOnlyWhenSupported: true },
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      // Site theme, "Local & honest" (Skagen's pick, 10/11/2026): warm paper,
      // ink navy, ochre accent, Fraunces display serif + Source Sans 3 body.
      // Mockups: project-files/design/landing-options/. Use these tokens, not
      // Tailwind's blue/green/gray — scripts/test-theme.mjs fails on those.
      colors: {
        paper: { DEFAULT: "#f6f1e7", 2: "#efe7d8", white: "#fffdf9" },
        // ink = headings/body, ink-2 = secondary text, ink-3 = muted text
        // (4.8:1 on paper), deep = hover for ink fills.
        ink: { DEFAULT: "#17233b", 2: "#4a5468", 3: "#636a7a", deep: "#0e1729" },
        // ochre = fills and large display type, ochre-2 = hover fill and large
        // italic display, ochre-3 = small accent text on paper (4.9:1).
        ochre: { DEFAULT: "#d9861c", 2: "#b86d0f", 3: "#96580a", 50: "#fbf2e0", 100: "#f6e2be" },
        // moss = ticks and "good" states, brick = errors and "bad" states.
        moss: { DEFAULT: "#426f35", 50: "#edf2e3" },
        brick: { DEFAULT: "#b3402e", 50: "#f8e9e3", 300: "#eaa898" },
        rule: "#dfd5c2",
      },
      fontFamily: {
        sans: ['"Source Sans 3"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        body: ['"Source Sans 3"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
        display: ['"Fraunces"', "Georgia", '"Times New Roman"', "serif"],
      },
      // Soft shadows are ink-tinted and tight; "hard" shadows are the offset
      // print-style block used on the price stamp, photos and primary buttons.
      boxShadow: {
        sm: "0 1px 0 rgba(23,35,59,.06)",
        DEFAULT: "0 6px 14px -10px rgba(23,35,59,.35)",
        md: "0 10px 20px -14px rgba(23,35,59,.4)",
        lg: "0 18px 30px -22px rgba(23,35,59,.5)",
        xl: "0 24px 40px -24px rgba(23,35,59,.5)",
        "2xl": "0 30px 50px -28px rgba(23,35,59,.55)",
        hard: "4px 4px 0 #17233b",
        "hard-sm": "3px 3px 0 #17233b",
        "hard-ochre": "8px 8px 0 #d9861c",
        "hard-ochre-sm": "5px 5px 0 #d9861c",
      },
    },
  },
  plugins: [],
}
