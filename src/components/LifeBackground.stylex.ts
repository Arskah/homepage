import * as stylex from "@stylexjs/stylex";

import { colors } from "../styles/tokens.stylex";

export const styles = stylex.create({
  // `color` carries the cell color to the script: a computed `color` is a
  // resolved value, whereas reading the custom property itself would return
  // the unresolved `light-dark()` expression.
  canvas: {
    color: colors.cell,
    display: "block",
    height: "100%",
    left: 0,
    pointerEvents: "none",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: -1,
  },
});
