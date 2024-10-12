import { style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const container = style({
  display: "flex",
  gap: "1em",
  justifyContent: "center",
  marginTop: "1em",
});

export const link = style({
  ":hover": {
    color: vars.color.grayDark,
  },
  color: vars.color.gray,
  textDecoration: "none",
});
