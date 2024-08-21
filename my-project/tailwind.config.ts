import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        light: {
          colors: {
            // background: "#F3F2F0", // or DEFAULT
            background: "#F8F8F8",
            // background: "#F5F5F5",
            foreground: "#11181C", // or 50 to 900 DEFAULT
            default: {
              100: "#EEF3F9", // Defined to control Input Field Box Color
              200: "#EEF3F9", // Defined to control Input Field Box Color when hovering
            },
            primary: {
              DEFAULT: "#006F9D",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#FFFFFF",
              foreground: "#11181C",
            },
            success: {
              foreground: "#FFFFFF",
            },
            danger: {
              foreground: "#FFFFFF",
            }
          }
        },
        dark: {
          colors: {
            background: "#171B20", // or DEFAULT
            foreground: "#FFFFFF", // or 50 to 900 DEFAULT
            default: {
              100: "#38434F", // Defined to control Input Field Box Color
              200: "#38434F", // Defined to control Input Field Box Color when hovering
            },
            primary: {
              //DEFAULT: "#006F9D",
              DEFAULT: "#029EE1",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#1B1F23",
              foreground: "#FFFFFF",
            },
            success: {
              DEFAULT: "#18C964",
              foreground: "#FFFFFF",

            },
            danger: {
              foreground: "#FFFFFF",
            }
          }
        }
      }
    }),
  ],
};
export default config;
