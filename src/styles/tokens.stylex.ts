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
  bg: "var(--color-bg)",
  border: "var(--color-border)",
  muted: "var(--color-muted)",
  surface: "var(--color-surface)",
  text: "var(--color-text)",
});

export const fonts = stylex.defineVars({
  body: "var(--font-body)",
  mono: "var(--font-mono)",
});
