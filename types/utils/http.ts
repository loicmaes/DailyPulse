import type { H3Event } from "h3";

export type HttpEvent = H3Event<Request>;

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  PARTIAL_CONTENT = 206,

  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  GONE = 410,
  IM_A_TEA_POT = 418,

  INTERNAL_SERVER_ERROR = 500,
}
