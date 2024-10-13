import { style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const link = style({
  ":hover": {
    color: vars.color.black,
  },
  borderBottom: "4px solid transparent",
  color: vars.color.black,
  padding: "1rem 0.5rem",
  textDecoration: "none",
});

export const active = style({
  borderBottomColor: vars.color.accent,
  fontWeight: "bolder",
});
