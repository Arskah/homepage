interface Props {
  date: Date;
}

// The Swedish locale formats dates as ISO 8601 (`2026-10-13`) in local time,
// unlike `toISOString()`, which converts to UTC and can shift the day.
export const FormattedDate = ({ date }: Props) => (
  <time dateTime={date.toISOString()}>{date.toLocaleDateString("sv-SE")}</time>
);
