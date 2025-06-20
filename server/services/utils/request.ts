import type { ListQuery, IPeriod } from "~/types/utils/globals";
import type { HttpEvent } from "~/types/utils/http";
import { getZonedPeriodFromDates } from "~/server/services/utils/period";
import { getUserTimezone } from "~/server/services/utils/cookies";

export function getRequestQuery(event: HttpEvent): ListQuery {
  const zone = getUserTimezone(event);
  const query = getQuery<Omit<ListQuery, "period"> & { period: string }>(event);

  let result = {} as ListQuery;
  if (query.page) result = { ...result, page: Number(query.page) };
  if (query.page) result = { ...result, perPage: Number(query.perPage) };
  if (query.period) {
    const periodObject = JSON.parse(query.period) as IPeriod;

    result = {
      ...result,
      period: getZonedPeriodFromDates(periodObject.start, periodObject.end, zone),
    };
  }

  return result;
}
