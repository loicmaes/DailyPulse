import type { HttpEvent } from "~/types/utils/http";
import { StatusCode } from "~/types/utils/http";
import type { IMoodEntryCreate } from "~/types/moods";
import * as moodEntries from "~/server/repositories/moods/mood-entries";
import { handleException, setOutput } from "~/server/services/utils/errors";
import type { DailyException } from "~/types/utils/exceptions";
import { BadRequestException } from "~/types/utils/exceptions";
import type { ListQuery } from "~/types/utils/globals";

export async function addEntry(event: HttpEvent) {
  const body = await readBody<IMoodEntryCreate>(event);

  try {
    const entry = await moodEntries.create(body);

    setOutput(event, StatusCode.CREATED, "Mood entry saved to your mood board.");
    return entry;
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}

export async function removeEntry(event: HttpEvent) {
  const user = event.context.user;
  const id = getRouterParam(event, "moodEntryId");

  if (!id) return handleException(event, new BadRequestException("Mood entry id is missing!"));

  try {
    const entry = await moodEntries.destroy(id, user.id);

    setOutput(event, StatusCode.ACCEPTED, "Mood entry removed from your mood board.");
    return entry;
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}

export async function recoverMoodBoard(event: HttpEvent) {
  const user = event.context.user;
  const query = getQuery<ListQuery>(event);

  try {
    const moodBoard = await moodEntries.getUserEntries(user.id, query);

    setOutput(event, moodBoard.meta.total > moodBoard.meta.count ? StatusCode.PARTIAL_CONTENT : StatusCode.OK, `There is you mood board (${user.id}).`);
    return moodBoard;
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}
