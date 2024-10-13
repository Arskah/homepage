import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const header = style({
  backgroundColor: vars.color.white,
  boxShadow: "0 2px 8px color-mix(in srgb, var(--black), transparent 95%)",
  margin: 0,
  padding: "0 1.5rem",
});

export const nav = style({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
});

export const h2 = style({
  fontSize: "1rem",
  margin: 0,
});

globalStyle(`${h2} a`, {
  color: "inherit",
  textDecoration: "none",
});

export const links = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "0.3rem",
});
