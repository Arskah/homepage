import { style } from "@vanilla-extract/css";

export const styles = style({
  width: 960,

  selectors: {
    ["ul &"]: {
      display: "flex",
      flexWrap: "wrap",
      gap: "2rem",
      listStyleType: "none",
      margin: 0,
      padding: 0,

      "@media": {
        "screen and (max-width: 720px)": {
          gap: "0.5em",
        },
      },
    },
    "ul li &": {
      width: "calc(50% - 1rem)",
      "@media": {
        "screen and (max-width: 720px)": {
          width: "100%",
          textAlign: "center",
        },
      },
    },
    "ul li * &": {
      textDecoration: "none",
      transition: "0.2s ease",
    },
    "ul li:first-child &": {
      width: "100%",
      marginBottom: "1rem",
      textAlign: "center",
      "@media": {
        "screen and (max-width: 720px)": {
          marginBottom: 0,
        },
      },
    },
    "ul li:first-child img &": {
      width: "100%",
    },
    "ul li:first-child .title &": {
      fontSize: "2.369rem",
      "@media": {
        "screen and (max-width: 720px)": {
          fontSize: "1.563em",
        },
      },
    },
    "ul li img &": {
      marginBottom: "0.5rem",
      borderRadius: "12px",
    },
    "ul li a &": {
      display: "block",
    },
    ".title &": {
      margin: 0,
      color: "rgb(var(--black))",
      lineHeight: 1,
    },
    ".date &": {
      margin: 0,
      color: "rgb(var(--gray))",
    },
    "ul li a:hover h4, ul li a:hover .date &": {
      color: "rgb(var(--accent))",
    },
    "ul a:hover img &": {
      boxShadow: "var(--box-shadow)",
    },
  },
});
