import * as stylex from "@stylexjs/stylex";

import { colors } from "../styles/tokens.stylex";

export const styles = stylex.create({
  // No `display` here: the button starts with the `hidden` attribute, which a
  // class-level `display` would override.
  button: {
    backgroundColor: {
      ":hover": colors.surface,
      default: "transparent",
    },
    borderColor: colors.border,
    borderRadius: "4px",
    borderStyle: "solid",
    borderWidth: "1px",
    color: colors.text,
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: "0.8rem",
    lineHeight: 1.4,
    paddingBlock: "0.15rem",
    paddingInline: "0.6rem",
  },
});
