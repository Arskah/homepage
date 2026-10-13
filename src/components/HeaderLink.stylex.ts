import * as stylex from "@stylexjs/stylex";

import { colors } from "../styles/tokens.stylex";

export const styles = stylex.create({
  active: {
    borderBottomColor: colors.accent,
    color: colors.text,
  },
  link: {
    borderBottomColor: "transparent",
    borderBottomStyle: "solid",
    borderBottomWidth: "2px",
    color: {
      ":hover": colors.text,
      default: colors.muted,
    },
    paddingBlock: "0.9rem",
    paddingInline: "0.5rem",
    textDecoration: "none",
  },
});
