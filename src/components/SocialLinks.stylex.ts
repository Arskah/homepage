import * as stylex from "@stylexjs/stylex";

import { colors } from "../styles/tokens.stylex";

export const styles = stylex.create({
  container: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
  },
  // TODO: more like a utility class, move somewhere
  mobileHidden: {
    display: {
      "@media (max-width: 760px)": "none",
      // Preserve the flex layout it's layered over; `null` here would unset
      // the container's `display: flex` (StyleX is last-write-wins per prop).
      default: "flex",
    },
  },
});

export const link = stylex.create({
  muted: {
    color: {
      ":hover": colors.accent,
      default: colors.muted,
    },
    display: "flex",
    textDecoration: "none",
  },
  text: {
    color: {
      ":hover": colors.accent,
      default: colors.text,
    },
    display: "flex",
    textDecoration: "none",
  },
});

export type LinkVariant = keyof typeof link;
