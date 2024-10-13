import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const titleContainer = style({
  lineHeight: "100%",
  paddingBottom: "1rem",
  textAlign: "center",
});

globalStyle(`${titleContainer} > div`, {
  color: vars.color.gray,
  marginBottom: "0.5rem",
});

globalStyle(`${titleContainer} > h1`, {
  margin: "0 0 0.5em 0",
});

globalStyle(`${titleContainer} > hr`, {
  border: "none",
  borderTop: `1px solid ${vars.color.grayLight}`,
});
