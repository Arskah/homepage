import * as stylex from "@stylexjs/stylex";

import { colors, fonts } from "../styles/tokens.stylex";

const MOBILE = "@media (max-width: 760px)";

export const styles = stylex.create({
  date: {
    color: colors.muted,
    fontFamily: fonts.mono,
    fontSize: "0.8rem",
  },
  description: {
    color: colors.muted,
    fontSize: "0.9rem",
    gridColumnStart: { default: "2", [MOBILE]: "1" },
  },
  // Date in a fixed first column, title and description stacked in the second.
  item: {
    alignItems: "baseline",
    columnGap: "1rem",
    display: "grid",
    gridTemplateColumns: { default: "6.5rem 1fr", [MOBILE]: "1fr" },
    marginBottom: "1.25rem",
  },
  list: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  title: {
    fontWeight: 700,
  },
});
