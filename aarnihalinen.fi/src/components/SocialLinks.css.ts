import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const container = style({
  display: "flex",
  justifyContent: "center",
  gap: "1em",
  marginTop: "1em",
});

export const anchorStyles = style({
  textDecoration: "none",
  color: `rgb(${vars.color.gray})`,
  ":hover": {
    color: `rgb(${vars.color.grayDark})`,
  },
});

// Copied from consts
export const srOnly = style({
  border: 0,
  padding: 0,
  margin: 0,
  position: "absolute",
  height: 1,
  width: 1,
  overflow: "hidden",
  // IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
  clip: "rect(1px 1px 1px 1px)",
  // maybe deprecated but we need to support legacy browsers */
  // clip: "rect(1px, 1px, 1px, 1px)",
  // modern browsers, clip-path works inwards from each corner */
  clipPath: "inset(50%)",
  // added line to stop words getting smushed together (as they go onto seperate lines and some screen readers do not understand line feeds as a space */
  whiteSpace: "nowrap",
});
