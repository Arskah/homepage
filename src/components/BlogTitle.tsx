import * as stylex from "@stylexjs/stylex";

import { colors } from "../styles/tokens.stylex";
import { FormattedDate } from "./FormattedDate";

const styles = stylex.create({
  container: {
    lineHeight: "100%",
    paddingBottom: "1rem",
    textAlign: "center",
  },
  divider: {
    borderBottomStyle: "none",
    borderLeftStyle: "none",
    borderRightStyle: "none",
    borderTopColor: colors.grayLight,
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
    color: colors.gray,
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
        <i>
          Last updated on <FormattedDate date={updatedDate} />
        </i>
      )}
    </div>
    <h1 {...stylex.props(styles.heading)}>{title}</h1>
    <hr {...stylex.props(styles.divider)} />
  </div>
);
