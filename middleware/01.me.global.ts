import { TOKEN_COOKIE, USER_COOKIE } from "~/server/services/utils/cookies";

export default defineNuxtRouteMiddleware(async () => {
  const store = useUserStore();
  if (store.isLoggedIn) return;
  if (!useCookie(TOKEN_COOKIE).value && !useCookie(USER_COOKIE).value) return;

  await store.getMe();
});
