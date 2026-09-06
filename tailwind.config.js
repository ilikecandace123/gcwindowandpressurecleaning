/** @type {import('tailwindcss').Config} */
module.exports = {
  // Touch screens have no hover: without this, iOS paints the hover:bg-* tint
  // on whatever link a finger drags across while scrolling the mobile menu.
  future: { hoverOnlyWhenSupported: true },
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
