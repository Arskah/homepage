import * as stylex from "@stylexjs/stylex";

import { colors, fonts } from "../styles/tokens.stylex";

export const styles = stylex.create({
  // Static block cursor after the wordmark.
  cursor: {
    backgroundColor: colors.accent,
    display: "inline-block",
    height: "1em",
    marginLeft: "0.15em",
    verticalAlign: "text-bottom",
    width: "0.55em",
  },
  header: {
    borderBottomColor: colors.border,
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    margin: 0,
    paddingBlock: "0",
    paddingInline: {
      "@media (max-width: 760px)": "1rem",
      default: "1.5rem",
    },
  },
  links: {
    display: "flex",
    flexDirection: "row",
    gap: "0.25rem",
  },
  logoLink: {
    color: colors.text,
    fontWeight: 600,
    textDecoration: "none",
  },
  nav: {
    alignItems: "center",
    display: "flex",
    fontFamily: fonts.mono,
    fontSize: "0.9rem",
    gap: "1.25rem",
  },
  tools: {
    alignItems: "center",
    display: "flex",
    gap: "1rem",
    marginLeft: "auto",
  },
});
