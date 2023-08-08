/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        pm: {
          yellow: "#FFFAC2",
          "green-1": "#5DE4C7",
          "green-2": "#5FB3A1",
          "green-3": "#42675A",
          skyblue: "#89DDFF",
          "bluegray-1": "#91B4D5",
          "bluegray-2": "#7390AA",
          "pink-1": "#F087BD",
          "pink-2": "#D0679D",
          "gray-1": "#A6ACCD",
          "gray-2": "#767C9D",
          "dark-1": "#303340",
          "dark-2": "#1B1E28",
          light: "#E4F0FB",
          bgwhite: "#D8E4FF",
          white: "#FFFFFF",
        },
      },
    },
    plugins: [],
  },
}
