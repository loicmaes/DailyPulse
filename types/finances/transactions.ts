import type { TNull } from "~/types/utils/globals";

export const TransactionTypes = ["expense", "income"] as const;
export type ETransactionType = typeof TransactionTypes[number];

export interface ITransaction {
  id: string;
  userId: string;
  type: ETransactionType;
  label: string;
  amount: number;
  date: Date;
  note?: TNull<string>;
  createdAt: Date;
  updatedAt: Date;
}

export type ITransactionCreate = Omit<ITransaction, "id" | "userId" | "createdAt" | "updatedAt">;
