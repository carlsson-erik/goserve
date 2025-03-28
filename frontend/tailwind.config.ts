import type { Config } from "tailwindcss";
const colors = {
  gray: {
    950: "#121212",
    900: "#191919",
    850: "#202020",
    800: "#262626",
    700: "#353535",
    600: "#5A5A5A",
    500: "#747474",
    400: "#8E8E8E",
    300: "#ADADAD",
    200: "#D4D4D4",
    100: "#F4F4F4",
  },
  primary: {
    100: "#BDFBD7",
    300: "#3DF5A0",
    500: "#00E67A",
    700: "#00BD65",
    900: "#008F4C",
    950: "#04381E",
  },
  blue: {
    100: "#BDDDFC",
    300: "#6CB3F9",
    500: "#3D93F5",
    700: "#3773D3",
    900: "#2C43A1",
    950: "#0D273A",
  },
  pink: {
    100: "#F4BCDA",
    300: "#F663A8",
    500: "#F6017D",
    700: "#CD0672",
    900: "#900964",
    950: "#471022",
  },
  red: {
    100: "#FFCDBB",
    300: "#FF8C62",
    500: "#FE5B1B",
    700: "#E54E12",
    900: "#BE3A04",
    950: "#4B1703",
  },
  yellow: {
    100: "#FEEEBA",
    300: "#FFDA62",
    500: "#FBCE2F",
    700: "#E4AC1B",
    900: "#BC9509",
    950: "#403205",
  },
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
} satisfies Config;
