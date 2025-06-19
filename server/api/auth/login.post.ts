import { loginUser } from "~/server/services/users";

export default defineEventHandler(async event => await loginUser(event));
