import * as stylex from "@stylexjs/stylex";

export const styles = stylex.create({
  main: {
    marginBlock: "0",
    marginInline: "auto",
    padding: {
      "@media (max-width: 760px)": "1.5rem 1rem",
      default: "3rem 1.5rem",
    },
    width: "100%",
  },
  prose: {
    marginInline: "auto",
    maxWidth: "100%",
    width: "38rem",
  },
});
