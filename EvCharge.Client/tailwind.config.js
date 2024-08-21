/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "primary": {
          "100": "#E1E9F6",
          "200": "#A8C2F0",
          "300": "#5A8AE2",
          "400": "#0054F0", // default
          "500": "#1241A2",
        },
        "brown": {
          "500": "#B7AEA8",
          "600": "#9F948F",
          "700": "#6E625E", // secondary text
          "800": "#331E11", // text, icon, btn
          "900": "#24150C",
        },
        "beige": {
          "100": "#FAF9F7",
          "200": "#F6F3F0", // primary bg
          "300": "#F1ECE8",
          "400": "#EDE6E1",
          "500": "#E8E0D9",
          "600": "#D6CEC8",
        }
      }
    },
  },
  plugins: [],
}

