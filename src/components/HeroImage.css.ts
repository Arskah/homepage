import { style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const heroContainer = style({
  width: "100%",
});

export const heroImage = style({
  borderRadius: 12,
  boxShadow: vars.boxShadow,
  display: "block",
  margin: "1rem auto",
});
