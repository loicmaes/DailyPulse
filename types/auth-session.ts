import type { TNull } from "~/types/utils/globals";

export interface IAuthSession {
  token: string;
  userId: string;
  agent: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: TNull<Date>;
}

export type IAuthSessionCreate = Pick<IAuthSession, "userId" | "agent">;
export type IAuthSessionUpdate = Partial<Pick<IAuthSession, "revokedAt">>;
