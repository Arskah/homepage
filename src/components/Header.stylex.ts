import * as stylex from "@stylexjs/stylex";

import { colors } from "../styles/tokens.stylex";

export const styles = stylex.create({
  h2: {
    fontSize: "1rem",
    margin: 0,
  },
  header: {
    backgroundColor: colors.white,
    boxShadow: `0 2px 8px color-mix(in srgb, ${colors.black}, transparent 95%)`,
    margin: 0,
    paddingBlock: "0",
    paddingInline: "1.5rem",
  },
  links: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "0.3rem",
  },
  logoLink: {
    color: "inherit",
    textDecoration: "none",
  },
  nav: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  socialCentering: {
    borderBottomColor: "transparent",
    borderBottomStyle: "solid",
    borderBottomWidth: "4px",
  },
});
