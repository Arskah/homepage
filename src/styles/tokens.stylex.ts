import * as stylex from "@stylexjs/stylex";

/**
 * Typed StyleX aliases for the palette. The actual values live as CSS custom
 * properties in `global.css` (single source of truth), because the global
 * element selectors there — which StyleX cannot express — must reference them
 * too. StyleX has no global-selector API, so the raw `:root` vars stay in CSS
 * and these tokens simply point at them.
 */
export const colors = stylex.defineVars({
  accent: "var(--color-accent)",
  accentDark: "var(--color-accent-dark)",
  black: "var(--color-black)",
  gray: "var(--color-gray)",
  grayDark: "var(--color-gray-dark)",
  grayLight: "var(--color-gray-light)",
  white: "var(--color-white)",
});

export const theme = stylex.defineVars({
  boxShadow: "var(--box-shadow)",
  pageBg: "var(--page-bg)",
});
