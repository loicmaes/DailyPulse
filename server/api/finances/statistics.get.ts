import { protect } from "~/server/services/utils/protect";
import { getTransactionStatistics } from "~/server/services/finances/finances";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await getTransactionStatistics(req)));
