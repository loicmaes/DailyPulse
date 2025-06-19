import type { TNull } from "~/types/utils/globals";

export interface IMoodEntry {
  id: string;
  userId: string;
  mood: number;
  note?: TNull<string>;
  createdAt: Date;
}

export type IMoodEntryCreate = Omit<IMoodEntry, "id" | "createdAt">;
