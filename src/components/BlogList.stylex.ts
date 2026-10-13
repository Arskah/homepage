import * as stylex from "@stylexjs/stylex";

import { colors } from "../styles/tokens.stylex";

export const styles = stylex.create({
  date: {
    color: colors.gray,
    fontSize: "0.8rem",
  },
  description: {
    color: colors.gray,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.5rem",
  },
  list: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: 700,
  },
});
