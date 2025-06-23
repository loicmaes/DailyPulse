import type { TNull } from "~/types/utils/globals";
import type { IRecurringTransaction } from "~/types/finances/recurring-transactions";

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
  recurringId?: TNull<string>;
  createdAt: Date;
  updatedAt: Date;

  recurringTransaction?: TNull<IRecurringTransaction>;
}

export type ITransactionCreate = Omit<ITransaction, "id" | "userId" | "createdAt" | "updatedAt">;
