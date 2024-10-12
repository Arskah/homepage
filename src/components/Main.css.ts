import { style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const main = style({
  margin: 0,
  maxWidth: "100%",
  width: "calc(100% - 2em)",
});

export const prose = style({
  color: vars.color.grayDark,
  margin: "auto",
  maxWidth: "calc(100% - 2em)",
  padding: "1em",
  width: 720,
});
