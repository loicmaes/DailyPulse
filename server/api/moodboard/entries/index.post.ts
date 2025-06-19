import { protect } from "~/server/services/utils/protect";
import { addEntry } from "~/server/services/moods";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await addEntry(req)));
