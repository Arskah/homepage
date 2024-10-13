import { style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const footer = style({
  background: vars.pageBg,
  color: vars.color.gray,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem 1rem 6rem 1rem",
  textAlign: "center",
});
