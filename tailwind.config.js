/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const monokai = {
  bg: "#272822",
  "bg-secondary": "#3e3d32",
  "bg-contrast": "#75715e",
  white: "#f8f8f2",
  yellow: "#e6db74",
  orange: "#fd971f",
  violet: { primary: "#ae81ff", dark: "#9055fa", darker: "#7426ff" },
  red: { primary: "#f92672", dark: "#871e44", light: "#f54786" },
  blue: "#66d9ef",
  green: { primary: "#a7e22e", dark: "#6a8f1e", light: "#bce861" },
};

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        monokai: monokai,
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    plugin(({ addComponents }) => {
      addComponents({
        ".btn-xs": {
          padding: "0.5rem 0.75rem",
          textAlign: "center",
          fontSize: "0.75rem" /* 12px */,
          fontWeight: "500",
          lineHeight: "1rem" /* 16px */,
          borderRadius: "0.5rem",
        },
        ".btn-sm": {
          padding: "0.5rem 0.75rem",
          textAlign: "center",
          fontSize: "0.875rem" /* 12px */,
          fontWeight: "500",
          lineHeight: "1.25rem" /* 16px */,
          borderRadius: "0.5rem",
        },
        ".btn-md": {
          padding: "0.625rem 1.25rem",
          textAlign: "center",
          fontSize: "0.875rem" /* 12px */,
          fontWeight: "500",
          lineHeight: "1.25rem" /* 16px */,
          borderRadius: "0.5rem",
        },
        ".btn-lg": {
          padding: "0.75rem 1.25rem",
          textAlign: "center",
          fontSize: "1rem" /* 12px */,
          fontWeight: "500",
          lineHeight: "1.5rem" /* 16px */,
          borderRadius: "0.5rem",
        },
        ".btn-xl": {
          padding: "0.875rem 1.5rem",
          textAlign: "center",
          fontSize: "1rem" /* 12px */,
          fontWeight: "500",
          lineHeight: "1.5rem" /* 16px */,
          borderRadius: "0.5rem",
        },
        ".btn-monokai-red": {
          backgroundColor: monokai.red.primary,
          color: monokai.white,
          "&:hover": {
            backgroundColor: monokai.red.dark,
          },
          "&:active": {
            backgroundColor: monokai.red.light,
          },
        },
        ".btn-monokai-violet": {
          backgroundColor: monokai.violet.primary,
          color: monokai.white,
          "&:hover": {
            backgroundColor: monokai.violet.dark,
          },
          "&:active": {
            backgroundColor: monokai.violet.darker,
          },
        },
        ".btn-monokai-green": {
          backgroundColor: monokai.green.primary,
          color: monokai["bg-secondary"],
          "&:hover": {
            backgroundColor: monokai.green.dark,
          },
          "&:active": {
            backgroundColor: monokai.green.light,
          },
        },
      });
    }),
  ],
};
