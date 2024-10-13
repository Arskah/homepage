import { style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

const animationType = "0.2s ease";

export const list = style({
  "@media": {
    "screen and (max-width: 760px)": {
      gap: "0.5rem",
    },
  },
  display: "grid",
  gap: "1.6rem",
  gridTemplateColumns: "1fr 1fr",
  listStyleType: "none",
  margin: 0,
  padding: 0,
});

export const item = style({
  ":first-child": {
    gridColumn: "1 / -1",
    marginBottom: "0.8rem",
    textAlign: "center",
  },

  "@media": {
    "screen and (max-width: 760px)": {
      ":first-child": {
        marginBottom: 0,
      },
      gridColumn: "1 / -1",
      textAlign: "center",
    },
  },
});

export const anchor = style({
  display: "block",
  textDecoration: "none",
});

export const title = style({
  color: vars.color.black,
  lineHeight: 1,
  margin: 0,
  selectors: {
    [`${anchor}:hover &`]: {
      color: vars.color.accent,
      transition: `color ${animationType}`,
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
      transition: `box-shadow ${animationType}`,
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
      transition: `color ${animationType}`,
    },
  },
});
