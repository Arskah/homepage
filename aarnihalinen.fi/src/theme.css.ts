import {
  globalStyle,
  globalFontFace,
  createGlobalTheme,
} from "@vanilla-extract/css";

const font = "Atkinson";

export const vars = createGlobalTheme(":root", {
  color: {
    accent: "#2337ff",
    accentDark: "#000d8a",
    black: "15, 18, 25",
    gray: "96, 115, 159",
    grayLight: "229, 233, 240",
    grayDark: "34, 41, 57",
    grayGradient: "rgba(var(--gray-light), 50%), #fff",
    boxShadow:
      "0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%), 0 16px 32px rgba(var(--gray), 33%)",
  },
});

globalFontFace(font, {
  src: "url('/fonts/atkinson-regular.woff') format('woff')",
  fontWeight: 400,
  fontStyle: "normal",
  fontDisplay: "swap",
});
globalFontFace(font, {
  src: "url('/fonts/atkinson-bold.woff') format('woff')",
  fontWeight: 700,
  fontStyle: "normal",
  fontDisplay: "swap",
});

globalStyle("body", {
  fontFamily: `${font}, sans-serif`,
  margin: 0,
  padding: 0,
  textAlign: "left",
  background: `linear-gradient(${vars.color.grayGradient}) no-repeat`,
  backgroundSize: "100% 600px",
  wordWrap: "break-word",
  overflowWrap: "break-word",
  color: `rgb(${vars.color.grayDark})`,
  fontSize: "20px",
  lineHeight: 1.7,

  "@media": {
    "screen and (max-width: 720px)": {
      fontSize: 18,
    },
  },
});

globalStyle("main", {
  width: "720px",
  maxWidth: "calc(100% - 2em)",
  margin: "auto",
  padding: "3em 1em",

  "@media": {
    "screen and (max-width: 720px)": {
      padding: "1em",
    },
  },
});

globalStyle("h1, h2, h3, h4, h5, h6", {
  margin: "0 0 0.5rem 0",
  color: vars.color.black,
  lineHeight: 1.2,
});

globalStyle("h1", {
  fontSize: "3.052em",
});
globalStyle("h2", {
  fontSize: "2.441em",
});
globalStyle("h3", {
  fontSize: "1.953em",
});
globalStyle("h4", {
  fontSize: "1.563em",
});
globalStyle("h5", {
  fontSize: "1.25em",
});
globalStyle("h6", {
  fontSize: "",
});
globalStyle("strong, b", {
  fontWeight: 700,
});
globalStyle("a, a:hover", {
  color: vars.color.accent,
});
globalStyle("p", {
  marginBottom: "1em",
});
globalStyle(".prose p", {
  marginBottom: "2em",
});
globalStyle("textarea", {
  width: "100%",
  fontSize: 16,
});
globalStyle("input", {
  fontSize: 16,
});
globalStyle("table", {
  width: "100%",
});
globalStyle("img", {
  maxWidth: "100%",
  height: "auto",
  borderRadius: 8,
});
globalStyle("code", {
  padding: "2px 5px",
  backgroundColor: `rgb(${vars.color.grayLight})`,
  borderRadius: 2,
});
globalStyle("pre", {
  padding: "1.5em",
  borderRadius: 8,
});
globalStyle("pre > code", {
  all: "unset",
});
globalStyle("blockquote", {
  borderLeft: `4px solid var(${vars.color.accent})`,
  padding: "0 0 0 20px",
  margin: 0,
  fontSize: "1.333em",
});
globalStyle("hr", {
  border: "none",
  borderTop: `1px solid rgb(${vars.color.grayLight})`,
});
