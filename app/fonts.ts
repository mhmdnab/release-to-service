import { Atkinson_Hyperlegible, Big_Shoulders, IBM_Plex_Mono } from "next/font/google";
import localFont from "next/font/local";

const body = Atkinson_Hyperlegible({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

/** Big Shoulders replaced "Big Shoulders Display" on Google Fonts; opsz 72 is set globally in CSS. */
const display = Big_Shoulders({
  weight: "variable",
  axes: ["opsz"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  // next/font has no metrics for this family, so it cannot size-adjust a fallback; name one explicitly instead.
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "Roboto Condensed", "sans-serif"],
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

/** Saira Stencil One is not in next/font's catalogue, so it is vendored (SIL OFL). */
const stencil = localFont({
  src: "./fonts/saira-stencil-one-latin.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-stencil",
});

export const fontClassName = [body.variable, display.variable, mono.variable, stencil.variable].join(" ");
