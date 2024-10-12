interface Props {
  date: Date;
}

export const FormattedDate = ({ date }: Props) => (
  <time dateTime={date.toISOString()}>
    {date.toLocaleDateString("en-us", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })}
  </time>
);
