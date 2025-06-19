import { protect } from "~/server/services/utils/protect";
import { logoutUser } from "~/server/services/users";

export default defineEventHandler(async event =>
  await protect(event, async req => await logoutUser(req)));
