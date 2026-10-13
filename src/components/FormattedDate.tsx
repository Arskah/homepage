// Node 24 does not ship `Temporal` yet; drop this import for the global once
// the Node version in `.nvmrc` and the Dockerfile does.
import { Temporal } from "temporal-polyfill";

import { SITE_TIME_ZONE } from "../consts";

interface Props {
  date: Date;
}

/**
 * Renders a date as an ISO 8601 calendar date (`2026-10-13`).
 *
 * The calendar day is read in the site's time zone rather than the build
 * machine's, so a laptop in Helsinki and CI in UTC print the same day.
 * @param props - Component props.
 * @param props.date - The instant to format.
 * @returns A `<time>` element.
 */
export const FormattedDate = ({ date }: Props) => {
  const day = Temporal.Instant.fromEpochMilliseconds(date.getTime())
    .toZonedDateTimeISO(SITE_TIME_ZONE)
    .toPlainDate()
    .toString();

  return <time dateTime={day}>{day}</time>;
};
