import { protect } from "~/server/services/utils/protect";
import { recoverMoodBoard } from "~/server/services/moods";

export default defineEventHandler(async event =>
  await protect(event, async req =>
    await recoverMoodBoard(req)));
