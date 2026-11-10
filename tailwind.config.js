/** @type {import('tailwindcss').Config} */
module.exports = {
  // Touch screens have no hover: without this, iOS paints the hover:bg-* tint
  // on whatever link a finger drags across while scrolling the mobile menu.
  future: { hoverOnlyWhenSupported: true },
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      // "Local & honest" palette + type for the Google Ads landing pages
      // (/instant-quote/<service>/). Chosen 09/11/2026 from three mockups in
      // project-files/design/landing-options/. Warm paper, ink, ochre accent;
      // Fraunces (display serif) + Source Sans 3 (body), loaded by the page.
      colors: {
        paper: { DEFAULT: "#f6f1e7", 2: "#efe7d8", white: "#fffdf9" },
        ink: { DEFAULT: "#17233b", 2: "#4a5468" },
        ochre: { DEFAULT: "#d9861c", 2: "#b86d0f" },
        rule: "#dfd5c2",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", '"Times New Roman"', "serif"],
        body: ['"Source Sans 3"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        hard: "4px 4px 0 #17233b",
        "hard-ochre": "8px 8px 0 #d9861c",
      },
    },
  },
  plugins: [],
}
