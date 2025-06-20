import { DateTime } from "luxon";
import type { IPeriod } from "~/types/utils/globals";

export function getTodayRangeForTimezone(timeZone: string): IPeriod {
  const now = DateTime.now().setZone(timeZone);

  const start = now.startOf("day").toUTC().toJSDate();
  const end = now.endOf("day").plus({ seconds: 1 }).toUTC().toJSDate();

  return { start, end };
}

export function getZonedPeriodFromDates(_start: Date | string | number, _end: Date | string | number, zone: string): IPeriod {
  const start = DateTime.fromJSDate(new Date(_start)).setZone(zone).toJSDate();
  const end = DateTime.fromJSDate(new Date(_end)).setZone(zone).toJSDate();

  return {
    start,
    end,
  };
}
