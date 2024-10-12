import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";

export const vars = createGlobalThemeContract({
  boxShadow: "box-shadow",
  color: {
    accent: "accent",
    accentDark: "accent-dark",
    black: "black",
    gray: "gray",
    grayDark: "gray-dark",
    grayLight: "gray-light",
    white: "white",
  },
});

createGlobalTheme(":root", vars, {
  boxShadow: `0 2px 6px color-mix(in srgb, ${vars.color.gray}, transparent 75%), 0 8px 24px color-mix(in srgb, ${vars.color.gray}, transparent 67%), 0 16px 32px color-mix(in srgb, ${vars.color.gray}, transparent 67%)`,
  color: {
    accent: "#2337ff",
    accentDark: "#000d8a",
    black: "#0f1219",
    gray: "#60739f",
    grayDark: "#222939",
    grayLight: "#e5e9f0",
    white: "#fff",
  },
});
