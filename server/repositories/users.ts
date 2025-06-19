import argon2 from "argon2";
import type { Prisma } from "@prisma/client";
import prisma from "~/prisma";
import type { IBackUser, IUser, IUserCreate, IUserUpdate } from "~/types/user";
import { ConflictException, EntityNotFoundException } from "~/types/utils/exceptions";

/**
 * Remove password from json data
 * @param {IBackUser} user - Full user data
 * @returns {IUser} Reduced user data
 */
export function reduceUser(user: IBackUser): IUser {
  const _user = { ...user } as Partial<IBackUser>;
  delete _user.password;
  return _user as IUser;
}

/**
 * Create a user
 * @param {IUserCreate} data - New user data
 * @returns {IBackUser} Created user data
 * @throws {ConflictException} If the user's email is already used
 */
export async function create(data: IUserCreate): Promise<IBackUser> {
  try {
    return await prisma.user.create({
      data: {
        ...data,
        password: await argon2.hash(data.password),
      },
    });
  }
  catch (e) {
    switch ((e as Prisma.PrismaClientKnownRequestError).code) {
      case "P2002":
        throw new ConflictException();
      default:
        throw e;
    }
  }
}

/**
 * Update user data
 * @param {string} id - Unique id of the user to update
 * @param {IUserUpdate} data - New user data to update
 * @returns {IBackUser} Updated user data
 * @throws {EntityNotFoundException} Throws when the given id doesn't belong to any user
 */
export async function update(id: string, data: IUserUpdate): Promise<IBackUser> {
  if (!await find(id)) throw new EntityNotFoundException(`User (${id}) was not found!`);

  if (data.password) data.password = await argon2.hash(data.password);

  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
}

/**
 * Get the id targeted user
 * @param {string} id - Target user id
 * @returns {IBackUser} Retrieved user
 * @throws {EntityNotFoundException} Throws when the given id doesn't belong to any user
 */
export async function get(id: string): Promise<IBackUser> {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) throw new EntityNotFoundException(`User (${id}) was not found!`);
  return user;
}

/**
 * Get the email targeted user
 * @param {string} email - Target user email
 * @returns {IBackUser} Retrieved user
 * @throws {EntityNotFoundException} Throws when the given id doesn't belong to any user
 */
export async function getByEmail(email: string): Promise<IBackUser> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) throw new EntityNotFoundException(`User (${email}) was not found!`);
  return user;
}

/**
 * Verify if a user exists
 * @param {string} id - Target user id
 * @returns {boolean} true if user was found false otherwise
 */
export async function find(id: string): Promise<boolean> {
  return !!(await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  }));
}
