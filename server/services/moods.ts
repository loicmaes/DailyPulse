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
  const user = event.context.user;

  try {
    const entry = await moodEntries.create({ ...body, userId: user.id });

    setOutput(event, StatusCode.CREATED, "Mood entry saved to your mood board.");
    return entry;
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}

export async function removeEntry(event: HttpEvent) {
  const user = event.context.user;
  const id = getRouterParam(event, "entryId");

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

export async function recoverTodayMoodBoard(event: HttpEvent) {
  const user = event.context.user;
  const query = getQuery<Omit<ListQuery, "period"> & { period: string }>(event);

  if (!query?.period) return handleException(event, new BadRequestException("Period query info isn't provided!"));

  const period = JSON.parse(query.period as string);
  period.start = new Date(period.start);
  period.end = new Date(period.end);

  try {
    const moodBoard = await moodEntries.getUserEntries(user.id, {
      ...query,
      period,
    });

    if (moodBoard.meta.count === 0) setOutput(event, StatusCode.NO_CONTENT, "Your mood board is actually empty!");
    else setOutput(event, moodBoard.meta.total > moodBoard.meta.count ? StatusCode.PARTIAL_CONTENT : StatusCode.OK, `There is you mood board (${user.id}).`);

    return moodBoard;
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}

export async function recoverHistoryMoodBoard(event: HttpEvent) {
  const user = event.context.user;
  const query = getQuery<ListQuery>(event);

  try {
    const moodBoard = await moodEntries.getUserEntries(user.id, query);

    if (moodBoard.meta.count === 0) setOutput(event, StatusCode.NO_CONTENT, "Your mood board is actually empty!");
    else setOutput(event, moodBoard.meta.total > moodBoard.meta.count ? StatusCode.PARTIAL_CONTENT : StatusCode.OK, `There is you mood board (${user.id}).`);

    return moodBoard;
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}
