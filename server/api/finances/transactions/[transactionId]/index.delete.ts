import { protect } from "~/server/services/utils/protect";
import { removeTransaction } from "~/server/services/finances";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await removeTransaction(req)));
