import { DateTime } from "luxon";

export function getTodayRangeForTimezone(timeZone: string) {
  const now = DateTime.now().setZone(timeZone);

  const start = now.startOf("day").toUTC().toJSDate();
  const end = now.endOf("day").plus({ seconds: 1 }).toUTC().toJSDate();

  return { start, end };
}
