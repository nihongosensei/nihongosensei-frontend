// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        gray: colors.neutral,
        primary: colors.blue,
      },
      fontWeight: {
        bold: 600,
      },
    },
  },
  variants: {
    extend: {},
  },
};
