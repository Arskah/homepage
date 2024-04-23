import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const headerStyles = style({
  margin: 0,
  padding: "0 1em",
  background: "white",
  boxShadow: "0 2px 8px rgba(var(--black), 5%)",
});

export const h2Styles = style({
  margin: 0,
  fontSize: "1em",
});

export const anchorStyles = style({
  color: vars.color.black,
  padding: "1em 0.5em",
  borderBottom: "4px solid transparent",

  textDecoration: "none",
  selectors: {
    "&.active": {
      textDecoration: "none",
      borderBottomColor: vars.color.accent,
    },
  },
});

export const navStyles = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});
