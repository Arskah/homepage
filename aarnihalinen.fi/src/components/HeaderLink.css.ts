import { style } from "@vanilla-extract/css";

export const styles = style({
  display: "inline-block",
  textDecoration: "none",

  selectors: {
    "&.active": {
      fontWeight: "bolder",
      textDecoration: "underline",
    },
  },
});
