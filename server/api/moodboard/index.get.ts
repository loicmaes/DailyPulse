import { protect } from "~/server/services/utils/protect";
import { recoverTodayMoodBoard } from "~/server/services/moods";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await recoverTodayMoodBoard(req)));
