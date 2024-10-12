import {
  dateContainer,
  h1,
  hr,
  lastUpdatedOn,
  titleContainer,
} from "./BlogTitle.css";
import { FormattedDate } from "./FormattedDate";

interface BlogTitleProps {
  pubDate: Date;
  title: string;
  updatedDate?: Date | undefined;
}

export const BlogTitle = ({ pubDate, title, updatedDate }: BlogTitleProps) => (
  <div className={titleContainer}>
    <div className={dateContainer}>
      <FormattedDate date={pubDate} />
      {updatedDate && (
        <div className={lastUpdatedOn}>
          Last updated on <FormattedDate date={updatedDate} />
        </div>
      )}
    </div>
    <h1 className={h1}>{title}</h1>
    <hr className={hr} />
  </div>
);
