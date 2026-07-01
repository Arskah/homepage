import * as stylex from "@stylexjs/stylex";

import { colors } from "../styles/tokens.stylex";

const MOBILE = "@media screen and (max-width: 760px)";

export const styles = stylex.create({
  anchor: {
    display: "block",
    textDecoration: "none",
  },
  date: {
    color: colors.gray,
    margin: 0,
  },
  img: {
    borderRadius: "12px",
    marginBottom: "0.4rem",
  },
  imgFeatured: {
    marginTop: "1rem",
    width: "100%",
  },
  // On mobile every item spans full width and centers. On desktop only the
  // featured (first) item does — see `itemFeatured`.
  item: {
    gridColumn: { default: null, [MOBILE]: "1 / -1" },
    textAlign: { default: null, [MOBILE]: "center" },
  },
  itemFeatured: {
    gridColumnEnd: "-1",
    gridColumnStart: "1",
    marginBottom: { default: "0.8rem", [MOBILE]: 0 },
    textAlign: "center",
  },
  list: {
    display: "grid",
    gap: { default: "1.6rem", [MOBILE]: "0.5rem" },
    gridTemplateColumns: "1fr 1fr",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  title: {
    color: colors.black,
    lineHeight: 1,
    margin: 0,
  },
  titleFeatured: {
    fontSize: { default: "1.895rem", [MOBILE]: "1.563em" },
  },
});
