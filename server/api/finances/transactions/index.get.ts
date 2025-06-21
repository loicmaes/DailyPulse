import { protect } from "~/server/services/utils/protect";
import { getTransactionsHistory } from "~/server/services/finances/finances";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await getTransactionsHistory(req)));
