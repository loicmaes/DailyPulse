import type { ETransactionType, ITransaction } from "~/types/finances/transactions";
import type { TNull } from "~/types/utils/globals";

export const TransactionFrequencies = ["monthly", "yearly"] as const;
export type ETransactionFrequency = typeof TransactionFrequencies[number];

export interface IRecurringTransaction {
  id: string;
  userId: string;
  type: ETransactionType;
  label: string;
  amount: number;
  startDate: Date;
  endDate?: TNull<Date>;
  nextDueDate: Date;
  frequency: ETransactionFrequency;
  note?: TNull<string>;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  transactions?: TNull<ITransaction[]>;
}

export type IRecurringTransactionCreate = Omit<IRecurringTransaction, "id" | "userId" | "nextDueDate" | "createdAt" | "updatedAt">;
export type IRecurringTransactionUpdate = Partial<IRecurringTransactionCreate>;
