/** @type {import('tailwindcss').Config} */
module.exports = {
  // Touch screens have no hover: without this, iOS paints the hover:bg-* tint
  // on whatever link a finger drags across while scrolling the mobile menu.
  future: { hoverOnlyWhenSupported: true },
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      // Site theme, "Local & honest" in sky blue (Skagen picked the layout and
      // then the lighter sky colours on 10/11/2026): near-white paper,
      // ink navy, sky-blue accent, Fraunces display serif + Source Sans 3 body.
      // Mockups: project-files/design/landing-options/. Use these tokens, not
      // Tailwind's blue/green/gray — scripts/test-theme.mjs fails on those.
      colors: {
        paper: { DEFAULT: "#fbfcfd", 2: "#eff4f8", white: "#ffffff" },
        // ink = headings/body, ink-2 = secondary text, ink-3 = muted text
        // (4.8:1 on paper), deep = hover for ink fills.
        ink: { DEFAULT: "#17233b", 2: "#4a5468", 3: "#636a7a", deep: "#0e1729" },
        // accent = fills and large display type, accent-2 = hover fill and large
        // italic display, accent-3 = small accent text on paper (5.6:1).
        accent: { DEFAULT: "#7cc8f5", 2: "#2b8bd0", 3: "#1c6ba3", 50: "#eaf6fe", 100: "#cde9fb" },
        // moss = ticks and "good" states, brick = errors and "bad" states.
        moss: { DEFAULT: "#426f35", 50: "#e9f3e6" },
        brick: { DEFAULT: "#b3402e", 50: "#f8e9e3", 300: "#eaa898" },
        rule: "#d7e0e8",
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
        "hard-accent": "8px 8px 0 #7cc8f5",
        "hard-accent-sm": "5px 5px 0 #7cc8f5",
      },
    },
  },
  plugins: [],
}
