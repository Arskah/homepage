import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const header = style({
  backgroundColor: vars.color.white,
  boxShadow: `0 2px 8px color-mix(in srgb, ${vars.color.black}, transparent 95%)`,
  margin: 0,
  padding: "0 1.5rem",
});

export const nav = style({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
});

globalStyle(`${nav} > a`, {
  color: "inherit",
  textDecoration: "none",
});

// Needed for centering because of HeaderLink bottom border...
globalStyle(`${nav} > div:last-child`, {
  borderBottom: "4px solid transparent",
});

export const h2 = style({
  fontSize: "1rem",
  margin: 0,
});

export const links = style({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "0.3rem",
});
