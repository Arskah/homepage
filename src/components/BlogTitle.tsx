import * as stylex from "@stylexjs/stylex";

import { colors, fonts } from "../styles/tokens.stylex";
import { FormattedDate } from "./FormattedDate";

const styles = stylex.create({
  container: {
    paddingBottom: "1rem",
  },
  divider: {
    borderBottomStyle: "none",
    borderLeftStyle: "none",
    borderRightStyle: "none",
    borderTopColor: colors.border,
    borderTopStyle: "solid",
    borderTopWidth: "1px",
  },
  heading: {
    marginBottom: "0.5em",
    marginLeft: "0",
    marginRight: "0",
    marginTop: "0",
  },
  meta: {
    color: colors.muted,
    fontFamily: fonts.mono,
    fontSize: "0.8rem",
    marginBottom: "0.5rem",
  },
});

interface BlogTitleProps {
  pubDate: Date;
  title: string;
  updatedDate?: Date | undefined;
}

export const BlogTitle = ({ pubDate, title, updatedDate }: BlogTitleProps) => (
  <div {...stylex.props(styles.container)}>
    <div {...stylex.props(styles.meta)}>
      <FormattedDate date={pubDate} />
      {updatedDate && (
        <>
          , updated <FormattedDate date={updatedDate} />
        </>
      )}
    </div>
    <h1 {...stylex.props(styles.heading)}>{title}</h1>
    <hr {...stylex.props(styles.divider)} />
  </div>
);
