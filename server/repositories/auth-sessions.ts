import type { IBackUser } from "~/types/user";
import prisma from "~/prisma";
import { EntityNotFoundException } from "~/types/utils/exceptions";
import type { IAuthSession, IAuthSessionCreate } from "~/types/auth-session";

/**
 * Create an authentication session
 * @param {IAuthSessionCreate} data - Auth session data needed for its creation
 * @returns {IAuthSession} The created session
 */
export async function create(data: IAuthSessionCreate): Promise<IAuthSession> {
  const now = new Date();
  return prisma.authSession.create({
    data: {
      ...data,
      createdAt: now,
      expiresAt: new Date(now.getTime() + 30 * 60 * 60 * 24 * 1000),
    },
  });
}

/**
 * Revoke an active auth session
 * @param {string} token - Session token
 * @param {string} userId - User id that the section belongs to
 * @returns {IAuthSession} Revoked auth session
 * @throws {EntityNotFoundException} If the current token-userId pair doesn't belong to any active auth session
 */
export async function revoke(token: string, userId: string): Promise<IAuthSession> {
  await find(token, userId);

  const now = new Date();
  return prisma.authSession.update({
    where: {
      key: {
        token,
        userId,
      },
      NOT: {
        revokedAt: null,
      },
      expiresAt: {
        lt: now,
      },
    },
    data: {
      revokedAt: now,
    },
  });
}

/**
 * Prune the inactive sessions (revoked or expired ones)
 */
export async function prune(): Promise<number> {
  return (await prisma.authSession.deleteMany({
    where: {
      OR: [
        {
          NOT: {
            revokedAt: null,
          },
        },
        {
          expiresAt: {
            gte: new Date(),
          },
        },
      ],
    },
  })).count;
}

/**
 * Recover an active session's data
 * @param {string} token - Session token
 * @param {string} userId - User id that the section belongs to
 * @returns {IAuthSession} Revoked auth session
 * @throws {EntityNotFoundException} If the current token-userId pair doesn't belong to any active auth session
 */
export async function find(token: string, userId: string): Promise<IAuthSession> {
  const session = await prisma.authSession.findUnique({
    where: {
      key: {
        token,
        userId,
      },
      NOT: {
        revokedAt: null,
      },
      expiresAt: {
        lt: new Date(),
      },
    },
  });
  if (!session) throw new EntityNotFoundException(`Session (${token}-${userId}) was not found!`);
  return session;
}

/**
 * Recover a user from an active auth session
 * @param {string} token - Session token
 * @param {string} userId - User id that the section belongs to
 * @returns {IBackUser} The user that the auth session belongs to
 * @throws {EntityNotFoundException} If the auth session is considered inactive or doesn't exist
 */
export async function validate(token: string, userId: string): Promise<IBackUser> {
  const user = await prisma.authSession.findUnique({
    where: {
      key: {
        token,
        userId,
      },
      NOT: {
        revokedAt: null,
      },
      expiresAt: {
        lt: new Date(),
      },
    },
  }).user();
  if (!user) throw new EntityNotFoundException(`Session (${token}-${userId}) was not found!`);
  return user;
}
