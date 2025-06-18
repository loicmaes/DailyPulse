export interface IBackUser {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
export type IUser = Omit<IBackUser, "password">;

export type IUserCreate = Omit<IBackUser, "id" | "createdAt" | "updatedAt">;
export type IUserUpdate = Partial<IUserCreate>;

export type IUserLogging = Pick<IBackUser, "email" | "password">;
