import type { IMoodEntry, IBackMoodEntryCreate } from "~/types/moods";
import prisma from "~/prisma";
import { EntityNotFoundException } from "~/types/utils/exceptions";
import type { ListQuery, ListResult } from "~/types/utils/globals";

/**
 * Create an entry to your personal mood board
 * @param {IBackMoodEntryCreate} data - Entry data
 * @returns {IMoodEntry} the created entry
 */
export async function create(data: IBackMoodEntryCreate): Promise<IMoodEntry> {
  return prisma.moodEntry.create({
    data,
  });
}

/**
 * Delete an entry from your personal mood board
 * @param {string} id - Entry unique id
 * @param {string} userId - User unique id
 * @returns {IMoodEntry} the delete entry (useful to rollback)
 * @throws {EntityNotFoundException} if the given identifiers don't belong to any entry
 */
export async function destroy(id: string, userId: string): Promise<IMoodEntry> {
  await find(id, userId);
  return prisma.moodEntry.delete({
    where: {
      id,
      userId,
    },
  });
}

/**
 * Recover an entry details
 * @param {string} id - Entry unique id
 * @param {string} userId - User unique id
 * @returns {IMoodEntry} the recovered entry data
 * @throws {EntityNotFoundException} if the given identifiers don't belong to any entry
 */
export async function find(id: string, userId: string): Promise<IMoodEntry> {
  const entry = await prisma.moodEntry.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!entry) throw new EntityNotFoundException(`Mood entry (${id}) was not found!`);
  return entry;
}

/**
 * Count all user's entries
 * @param {string} userId - User unique id
 * @returns {number} the total number of registered entries
 */
export async function getTotalUserEntries(userId: string, period?: ListQuery["period"]): Promise<number> {
  return prisma.moodEntry.count({
    where: {
      userId,
      createdAt: {
        gte: period?.start ?? new Date(1970, 0, 1, 0, 0, 0),
        lt: period?.end ?? new Date(),
      },
    },
  });
}

/**
 * Get user's mood board (with query limitations)
 * @param {string} userId - User's unique id
 * @param {ListQuery | undefined} query - Database query options (optional)
 * @returns {ListResult<IMoodEntry>} data and meta info about the current query
 */
export async function getUserEntries(userId: string, query?: ListQuery): Promise<ListResult<IMoodEntry>> {
  const totalCount = await getTotalUserEntries(userId, query?.period);
  const list = await prisma.moodEntry.findMany({
    where: {
      userId,
      createdAt: {
        gte: query?.period?.start ?? new Date(1970, 0, 1, 0, 0, 0),
        lt: query?.period?.end ?? new Date(),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: query?.perPage ?? 25,
    skip: ((query?.page ?? 1) - 1) * (query?.perPage ?? 25),
  });

  return {
    data: list,
    meta: {
      total: totalCount,
      count: list.length,
      page: query?.page ?? 1,
      perPage: query?.perPage ?? 25,
    },
  };
}
