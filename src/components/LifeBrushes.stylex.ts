import * as stylex from "@stylexjs/stylex";

import { colors, fonts } from "../styles/tokens.stylex";

const SHUT = "translateX(calc(-100% + 1.5rem))";

// Marks the drawer as the ancestor that the `when.ancestor` conditions in the
// slider and the tab refer to.
export const marker = stylex.defaultMarker();

export const styles = stylex.create({
  brush: {
    alignItems: "center",
    backgroundColor: {
      ":hover": colors.bg,
      default: "transparent",
    },
    borderColor: {
      ":is([aria-pressed=true])": colors.accent,
      default: "transparent",
    },
    borderRadius: "4px",
    borderStyle: "solid",
    borderWidth: "1px",
    color: {
      ":is([aria-pressed=true])": colors.text,
      default: colors.muted,
    },
    cursor: "pointer",
    display: "flex",
    fontFamily: fonts.mono,
    fontSize: "0.75rem",
    height: "2.25rem",
    justifyContent: "center",
    padding: "0.3rem",
  },
  // No `display` here: the drawer starts with the `hidden` attribute, which a
  // class-level `display` would override. Its box keeps the width of the open
  // slider, so only the slider, which moves with the transform, takes the
  // pointer.
  drawer: {
    left: 0,
    pointerEvents: "none",
    position: "fixed",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
  },
  panel: {
    backgroundColor: colors.surface,
    borderBottomRightRadius: "6px",
    borderColor: colors.border,
    borderLeftWidth: 0,
    borderStyle: "solid",
    borderTopRightRadius: "6px",
    borderWidth: "1px",
    display: "grid",
    gap: "0.25rem",
    gridTemplateColumns: "repeat(2, 2.75rem)",
    padding: "0.4rem",
  },
  // The drawer slides out while hovered with a mouse, while a brush has keyboard
  // focus, or while pinned open by the tab (`data-open`). Focus on the tab
  // itself does not count, so that it can close the drawer again.
  slider: {
    alignItems: "center",
    display: "flex",
    pointerEvents: "auto",
    transform: {
      "@media (hover: hover)": {
        default: null,
        [stylex.when.ancestor(":hover")]: "none",
      },
      default: SHUT,
      [stylex.when.ancestor(":has(#life-brushes :focus-visible)")]: "none",
      [stylex.when.ancestor("[data-open]")]: "none",
    },
    transitionDuration: {
      "@media (prefers-reduced-motion: reduce)": "0s",
      default: "150ms",
    },
    transitionProperty: "transform",
  },
  tab: {
    backgroundColor: colors.surface,
    borderBottomRightRadius: "6px",
    borderColor: colors.border,
    borderLeftWidth: 0,
    borderStyle: "solid",
    borderTopRightRadius: "6px",
    borderWidth: "1px",
    color: colors.muted,
    cursor: "pointer",
    fontFamily: fonts.mono,
    fontSize: "1rem",
    height: "3rem",
    padding: 0,
    // The arrow points the way the drawer will move.
    transform: {
      "@media (hover: hover)": {
        default: null,
        [stylex.when.ancestor(":hover")]: "rotate(180deg)",
      },
      default: "none",
      [stylex.when.ancestor(":has(#life-brushes :focus-visible)")]:
        "rotate(180deg)",
      [stylex.when.ancestor("[data-open]")]: "rotate(180deg)",
    },
    width: "1.5rem",
  },
  thumbnail: {
    display: "block",
    fill: "currentColor",
    height: "100%",
    width: "100%",
  },
  wide: {
    gridColumn: "span 2",
  },
});
