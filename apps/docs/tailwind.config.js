module.exports = {
  ...require("@lightdotso/tailwindcss"),
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./theme.config.js",
  ],
};
