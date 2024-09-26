/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'neumorphic-light': '5px 5px 10px #d1d9e6, -5px -5px 10px #ffffff',
        'neumorphic-dark': 'inset 3px 3px 6px #d1d9e6, inset -3px -3px 6px #ffffff',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
