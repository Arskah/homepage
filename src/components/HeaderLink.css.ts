import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const link = style({
  padding: "1rem 0.5rem",
  textDecoration: "none",
});

globalStyle(`${link}.active`, {
  borderBottomColor: vars.color.accent,
  fontWeight: "bolder",
});
