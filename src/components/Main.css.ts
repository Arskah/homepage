import { globalStyle, style } from "@vanilla-extract/css";

import { vars } from "../styles/theme.css";

export const main = style({
  "@media": {
    "screen and (max-width: 760px)": {
      padding: "1em",
    },
  },
  margin: "0 auto",
  padding: "3em 1em",
  width: "100%",
});

export const prose = style({
  color: vars.color.grayDark,
  margin: "auto",
  maxWidth: "100%",
  padding: "1em",
  width: 760,
});

globalStyle(`${prose} p`, {
  marginBottom: "2em",
});
