import type { CookieSerializeOptions } from "cookie-es";
import type { HttpEvent } from "~/types/utils/http";

export const TOKEN_COOKIE = "auth-token";
export const USER_COOKIE = "user-id";
export const COOKIES_OPTIONS = (): CookieSerializeOptions => ({
  path: "/",
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV !== "development",
});

export function getAuthCookies(event: HttpEvent): {
  token?: string;
  userId?: string;
} {
  const token = getCookie(event, TOKEN_COOKIE);
  const userId = getCookie(event, USER_COOKIE);

  return {
    token,
    userId,
  };
}

export function setAuthCookies(event: HttpEvent, token: string, userId: string) {
  setCookie(event, TOKEN_COOKIE, token, COOKIES_OPTIONS());
  setCookie(event, USER_COOKIE, userId, COOKIES_OPTIONS());
}

export function clearAuthCookies(event: HttpEvent) {
  deleteCookie(event, TOKEN_COOKIE);
  deleteCookie(event, USER_COOKIE);
}

export function getUserTimezone(event: HttpEvent): string {
  return getCookie(event, "timezone") ?? "UTC";
}
