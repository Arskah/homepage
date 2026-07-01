import * as stylex from "@stylexjs/stylex";

import { colors, theme } from "../styles/tokens.stylex";

export const styles = stylex.create({
  footer: {
    backgroundImage: theme.pageBg,
    backgroundRepeat: "no-repeat",
    color: colors.gray,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingBottom: "6rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "2rem",
    textAlign: "center",
  },
});
