import { style, styleVariants } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const container = style({
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
});

// TODO: more like a utility class, move somewhere
export const mobileHidden = style({
  "@media": {
    "screen and (max-width: 760px)": {
      display: "none",
    },
  },
});

export const link = styleVariants({
  black: {
    ":hover": {
      color: vars.color.black,
    },
    color: vars.color.black,
    display: "flex",
    textDecoration: "none",
  },
  gray: {
    ":hover": {
      color: vars.color.grayDark,
    },
    color: vars.color.gray,
    display: "flex",
    textDecoration: "none",
  },
});

export type LinkVariant = keyof typeof link;
