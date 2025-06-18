import argon2 from "argon2";
import type { HttpEvent } from "~/types/utils/http";
import { StatusCode } from "~/types/utils/http";
import type { IUserCreate, IUserLogging } from "~/types/user";
import * as userRepo from "~/server/repositories/users";
import * as authRepo from "~/server/repositories/auth-sessions";
import { handleException, setOutput } from "~/server/services/utils/errors";
import { DailyException, EntityNotFoundException } from "~/types/utils/exceptions";
import { clearAuthCookies, getAuthCookies, setAuthCookies } from "~/server/services/utils/cookies";

export async function registerUser(event: HttpEvent) {
  const body = await readBody<IUserCreate>(event);
  const agent = getHeader(event, "User-Agent");

  try {
    const user = await userRepo.create(body);
    const session = await authRepo.create({
      userId: user.id,
      agent: agent ?? "unnammed-agent",
    });

    setAuthCookies(event, session.token, session.userId);

    setOutput(event, StatusCode.CREATED, `User (${user.id}) created!`);
    return userRepo.reduceUser(user);
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}

export async function loginUser(event: HttpEvent) {
  const body = await readBody<IUserLogging>(event);
  const agent = getHeader(event, "User-Agent");

  try {
    const user = await userRepo.getByEmail(body.email);
    if (!await argon2.verify(user.password, body.password))
      return handleException(event, new EntityNotFoundException("Passwords doesn't match!"));

    const session = await authRepo.create({
      userId: user.id,
      agent: agent ?? "unnammed-agent",
    });
    setAuthCookies(event, session.token, session.userId);

    setOutput(event, StatusCode.ACCEPTED, `User (${body.email}) logged in`);
    return userRepo.reduceUser(user);
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}

export async function logoutUser(event: HttpEvent) {
  const { token, userId } = getAuthCookies(event);
  if (!token || !userId) return new DailyException(StatusCode.UNAUTHORIZED, "You're not logged in!");

  try {
    await authRepo.revoke(token, userId);
    clearAuthCookies(event);

    setOutput(event, StatusCode.ACCEPTED, "User session revoked!");
    return;
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}
