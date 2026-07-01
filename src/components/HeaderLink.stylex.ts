import * as stylex from "@stylexjs/stylex";

import { colors } from "../styles/tokens.stylex";

export const styles = stylex.create({
  active: {
    borderBottomColor: colors.accent,
    fontWeight: "bolder",
  },
  link: {
    borderBottomColor: "transparent",
    borderBottomStyle: "solid",
    borderBottomWidth: "4px",
    color: {
      ":hover": colors.black,
      default: colors.black,
    },
    paddingBlock: "1rem",
    paddingInline: "0.5rem",
    textDecoration: "none",
  },
});
