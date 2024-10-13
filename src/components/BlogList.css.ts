import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const list = style({
  "@media": {
    "screen and (max-width: 760px)": {
      gap: "0.5rem",
    },
  },
  display: "flex",
  flexWrap: "wrap",
  gap: "1.6rem",
  listStyleType: "none",
  margin: 0,

  padding: 0,
});

export const item = style({
  ":first-child": {
    marginBottom: "0.8rem",
    textAlign: "center",
    width: "100%",
  },
  "@media": {
    "screen and (max-width: 760px)": {
      ":first-child": {
        marginBottom: 0,
      },
      textAlign: "center",
      width: "100%",
    },
  },
  width: "calc(50% - 0.8rem)",
});

globalStyle(`${item} *`, {
  textDecoration: "none",
  transition: "0.2s ease",
});

export const anchor = style({
  display: "block",
});

export const title = style({
  color: vars.color.black,
  lineHeight: 1,
  margin: 0,
  selectors: {
    [`${anchor}:hover &`]: {
      color: vars.color.accent,
    },
    [`${item}:first-child &`]: {
      "@media": {
        "screen and (max-width: 760px)": {
          fontSize: "1.563em",
        },
      },
      fontSize: "1.895rem",
    },
  },
});

export const img = style({
  borderRadius: "12px",
  marginBottom: "0.4rem",
  selectors: {
    [`${anchor}:hover &`]: {
      boxShadow: vars.boxShadow,
    },
    [`${item}:first-child &`]: {
      marginTop: "1rem",
      width: "100%",
    },
  },
});

export const date = style({
  color: vars.color.gray,
  margin: 0,

  selectors: {
    [`${anchor}:hover &`]: {
      color: vars.color.accent,
    },
  },
});
