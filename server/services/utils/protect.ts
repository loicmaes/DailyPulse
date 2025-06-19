import type { HttpEvent } from "~/types/utils/http";
import { StatusCode } from "~/types/utils/http";
import { getAuthCookies } from "~/server/services/utils/cookies";
import { handleException } from "~/server/services/utils/errors";
import { DailyException } from "~/types/utils/exceptions";
import * as authRepo from "~/server/repositories/auth-sessions";
import * as userRepo from "~/server/repositories/users";

// eslint-disable-next-line
export async function protect(event: HttpEvent, callback: (req: HttpEvent) => Promise<any>) {
  const { token, userId } = getAuthCookies(event);
  if (!token || !userId) return handleException(event, new DailyException(StatusCode.UNAUTHORIZED, "You are not logged in!"));

  try {
    const user = await authRepo.validate(token, userId);
    const session = await authRepo.find(token, userId);

    event.context.user = userRepo.reduceUser(user);
    event.context.session = session;
    return callback(event);
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}
