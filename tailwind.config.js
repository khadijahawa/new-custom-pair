/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    webpack5: true,
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },

    fontFamily: {
      sans: [
        "-apple-system",
        "ui-sans-serif",
        "system-ui",
        // "BlinkMacSystemFont",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Blinker",
      ],
      poppins: ["Poppins", "sans-serif"],
      blinker: ["Blinker", "sans-serif"],
    },
  },

  plugins: [],
};
