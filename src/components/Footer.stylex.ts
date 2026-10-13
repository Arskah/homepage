import * as stylex from "@stylexjs/stylex";

import { colors, fonts } from "../styles/tokens.stylex";

export const styles = stylex.create({
  footer: {
    alignItems: "center",
    borderTopColor: colors.border,
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    color: colors.muted,
    display: "flex",
    flexWrap: "wrap",
    fontFamily: fonts.mono,
    fontSize: "0.75rem",
    gap: "1rem",
    justifyContent: "space-between",
    marginTop: "3rem",
    paddingBlock: "1.25rem",
    paddingInline: {
      "@media (max-width: 760px)": "1rem",
      default: "1.5rem",
    },
  },
});
