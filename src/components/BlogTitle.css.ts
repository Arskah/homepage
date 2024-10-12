import { style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const titleContainer = style({
  lineHeight: "100%",
  marginBottom: "1em",
  padding: "1em 0",
  textAlign: "center",
});

export const dateContainer = style({
  color: vars.color.gray,
  marginBottom: "0.5em",
});

export const lastUpdatedOn = style({
  fontStyle: "italic",
});

export const hr = style({
  border: "none",
  borderTop: `1px solid ${vars.color.grayLight}`,
});

export const h1 = style({
  margin: "0 0 0.5em 0",
});
