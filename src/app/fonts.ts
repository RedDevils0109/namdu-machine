import { Inter, Plus_Jakarta_Sans } from "next/font/google";

export const headingFont = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});

export const bodyFont = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
});

export const fontVariables = `${headingFont.variable} ${bodyFont.variable}`;
