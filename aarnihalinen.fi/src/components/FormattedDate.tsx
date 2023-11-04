export const FormattedDate = ({ date }: { date: Date }) => (
  <time dateTime={date.toISOString()}>
    {date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}
  </time>
);
