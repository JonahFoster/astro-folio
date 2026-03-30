import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  fonts: [
    {
      name: "Playfair Display",
      cssVariable: "--font-headline",
      provider: fontProviders.google(),
      weights: [600, 700, 900],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      name: "Source Serif 4",
      cssVariable: "--font-body",
      provider: fontProviders.google(),
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Georgia", "serif"],
    },
    {
      name: "Courier Prime",
      cssVariable: "--font-mono",
      provider: fontProviders.google(),
      weights: [400],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["Courier New", "monospace"],
    },
  ],
});
