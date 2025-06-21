import type { HttpEvent } from "~/types/utils/http";
import { StatusCode } from "~/types/utils/http";
import type { ITransactionCreate } from "~/types/finances/transactions";
import { handleException, setOutput } from "~/server/services/utils/errors";
import type { DailyException } from "~/types/utils/exceptions";
import { BadRequestException } from "~/types/utils/exceptions";
import * as transactions from "~/server/repositories/finances/transactions";
import { getRequestQuery } from "~/server/services/utils/request";

export async function addTransaction(event: HttpEvent) {
  const body = await readBody<ITransactionCreate>(event);
  const user = event.context.user;

  try {
    const transaction = await transactions.create(user.id, body);

    setOutput(event, StatusCode.CREATED, `Transaction (${transaction.id}) created!`);
    return transaction;
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}

export async function removeTransaction(event: HttpEvent) {
  const id = getRouterParam(event, "transactionId");
  const user = event.context.user;

  if (!id) return handleException(event, new BadRequestException("Transaction id is missing!"));

  try {
    const transaction = await transactions.destroy(id, user.id);

    setOutput(event, StatusCode.ACCEPTED, `Transaction (${transaction.id}) deleted!`);
    return transaction;
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}

export async function getTransactionsHistory(event: HttpEvent) {
  const user = event.context.user;
  const query = getRequestQuery(event);

  try {
    const result = await transactions.getAll(user.id, query);

    if (result.meta.total === 0) setOutput(event, StatusCode.NO_CONTENT, "No transactions registered yet!");
    else setOutput(event, result.meta.total > result.meta.count ? StatusCode.PARTIAL_CONTENT : StatusCode.OK, "There is your transactions history.");
    return result;
  }
  catch (e) {
    return handleException(event, e as DailyException);
  }
}
