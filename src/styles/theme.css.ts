import {
  createGlobalTheme,
  createGlobalThemeContract,
  globalFontFace,
  globalStyle,
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
  pageBg: "page-bg",
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
  pageBg: `linear-gradient(
        color-mix(in srgb, ${vars.color.grayLight}, transparent 50%),
        ${vars.color.white}
      )
      no-repeat`,
});

globalFontFace("Atkinson", {
  fontDisplay: "swap",
  fontStyle: "normal",
  fontWeight: 400,
  src: 'url("/fonts/atkinson-regular.woff") format("woff")',
});

globalFontFace("Atkinson", {
  fontDisplay: "swap",
  fontStyle: "normal",
  fontWeight: 700,
  src: 'url("/fonts/atkinson-bold.woff") format("woff")',
});

globalStyle("body, html", { fontSize: "20px" });

globalStyle("body", {
  "@media": {
    "screen and (max-width: 760px)": {
      fontSize: 18,
    },
  },
  background: vars.pageBg,
  backgroundSize: "100% 600px",
  color: vars.color.grayDark,
  fontFamily: '"Atkinson", sans-serif',
  fontSize: 20,
  lineHeight: 1.7,
  margin: 0,
  overflowWrap: "break-word",
  padding: 0,
  textAlign: "left",
  wordWrap: "break-word",
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  color: vars.color.black,
  lineHeight: 1.2,
  margin: "0 0 0.5rem 0",
});

globalStyle("h1", {
  fontSize: "3.052rem",
});

globalStyle("h2", {
  fontSize: "2.441rem",
});

globalStyle("h3", {
  fontSize: "1.953rem",
});

globalStyle("h4", {
  fontSize: "1.563rem",
});

globalStyle("h5", {
  fontSize: "1.25rem",
});

// globalStyle("h6", {
//   fontSize: "1"
// })

globalStyle("a, a:hover", {
  color: vars.color.accent,
});

globalStyle("p", {
  marginBottom: "1rem",
});

globalStyle("textarea", {
  fontSize: 16,
  width: "100%",
});

globalStyle("input", {
  fontSize: 16,
});

globalStyle("table", {
  width: "100%",
});

globalStyle("img", {
  borderRadius: 8,
  height: "auto",
  maxWidth: "100%",
});

globalStyle("code", {
  backgroundColor: vars.color.grayLight,
  borderRadius: 2,
  padding: "2px 5px",
});

globalStyle("pre", {
  borderRadius: 8,
  padding: "1.5rem",
});

globalStyle("pre > code", {
  all: "unset",
});

globalStyle("blockquote", {
  borderLeft: `4px solid ${vars.color.accent}`,
  fontSize: "1.333rem",
  margin: 0,
  padding: "0 0 0 1rem",
});
