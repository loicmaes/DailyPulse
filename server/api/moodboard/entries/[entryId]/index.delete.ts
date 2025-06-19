import { protect } from "~/server/services/utils/protect";
import { removeEntry } from "~/server/services/moods";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await removeEntry(req)));
