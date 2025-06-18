import { protect } from "~/server/services/utils/protect";

export default defineEventHandler(async event =>
  await protect(event, async req => req.context.user));
