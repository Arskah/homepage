import { style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const footer = style({
  background: vars.pageBg,
  color: vars.color.gray,
  padding: "2em 1em 6em 1em",
  textAlign: "center",
});
