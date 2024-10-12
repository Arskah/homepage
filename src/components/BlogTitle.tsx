import { titleContainer } from "./BlogTitle.css";
import { FormattedDate } from "./FormattedDate";

interface BlogTitleProps {
  pubDate: Date;
  title: string;
  updatedDate?: Date | undefined;
}

export const BlogTitle = ({ pubDate, title, updatedDate }: BlogTitleProps) => (
  <div className={titleContainer}>
    <div>
      <FormattedDate date={pubDate} />
      {updatedDate && (
        <i>
          Last updated on <FormattedDate date={updatedDate} />
        </i>
      )}
    </div>
    <h1>{title}</h1>
    <hr />
  </div>
);
