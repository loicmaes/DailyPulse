import { registerUser } from "~/server/services/users";

export default defineEventHandler(async event => await registerUser(event));
