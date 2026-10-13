import * as stylex from "@stylexjs/stylex";

import { colors } from "../styles/tokens.stylex";

const MOBILE = "@media (max-width: 760px)";

export const styles = stylex.create({
  // The photo comes first in the markup so it sits above the text on mobile;
  // on desktop the row is reversed to put it on the right.
  intro: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: { default: "row-reverse", [MOBILE]: "column" },
    gap: { default: "1.5rem", [MOBILE]: "1rem" },
  },
  photo: {
    borderColor: colors.border,
    borderStyle: "solid",
    borderWidth: "1px",
    flexShrink: 0,
    height: "160px",
    width: "160px",
  },
});
