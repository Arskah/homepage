import * as stylex from "@stylexjs/stylex";

import { colors } from "../styles/tokens.stylex";

export const styles = stylex.create({
  main: {
    marginBlock: "0",
    marginInline: "auto",
    padding: {
      "@media screen and (max-width: 760px)": "1rem",
      default: "2rem 1rem",
    },
    width: "100%",
  },
  prose: {
    color: colors.grayDark,
    margin: "auto",
    maxWidth: "100%",
    padding: "1rem",
    width: 760,
  },
});
