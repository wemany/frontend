import { JetBrains_Mono, Radio_Canada_Big } from "next/font/google";
import localFont from "next/font/local";

export const openSauceTwo = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/open-sauce-two/files/open-sauce-two-latin-300-italic.woff", // Light
      weight: "300",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/open-sauce-two/files/open-sauce-two-latin-400-normal.woff2", // Regular
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/open-sauce-two/files/open-sauce-two-latin-500-normal.woff2", // Medium
      weight: "500",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/open-sauce-two/files/open-sauce-two-latin-600-normal.woff2", // SemiBold
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/open-sauce-two/files/open-sauce-two-latin-700-normal.woff2", // Bold
      weight: "700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/open-sauce-two/files/open-sauce-two-latin-800-normal.woff2", // ExtraBold
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-open-sauce-two",
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const radioCanadaBig = Radio_Canada_Big({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-radio-canada-big",
});
