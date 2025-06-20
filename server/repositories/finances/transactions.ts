import type { ListQuery, ListResult } from "~/types/utils/globals";
import type { ITransaction, ITransactionCreate } from "~/types/finances/transactions";
import prisma from "~/prisma";
import { EntityNotFoundException } from "~/types/utils/exceptions";

export async function create(userId: string, data: ITransactionCreate): Promise<ITransaction> {
  return prisma.transaction.create({
    data: {
      userId,
      ...data,
    },
  });
}

// TODO: update transaction

export async function destroy(id: string, userId: string): Promise<ITransaction> {
  if (!await find(id, userId)) throw new EntityNotFoundException(`Transaction (${id}) not found!`);

  return prisma.transaction.delete({
    where: {
      id,
      userId,
    },
  });
}

export async function find(id: string, userId: string): Promise<boolean> {
  return !!(await prisma.transaction.findUnique({
    where: {
      id,
      userId,
    },
    select: {
      id: true,
    },
  }));
}

export async function countAll(userId: string, period?: ListQuery["period"]): Promise<number> {
  return prisma.transaction.count({
    where: {
      userId,
      date: {
        gte: period?.start ?? new Date("1970-01-01T00:00:00.000Z"),
        lte: period?.end ?? new Date(),
      },
    },
  });
}
export async function getAll(userId: string, query?: ListQuery): Promise<ListResult<ITransaction>> {
  const page = query?.page ?? 1;
  const limit = query?.perPage ?? 25;
  const offset = (page - 1) * limit;

  const count = await countAll(userId, query?.period);
  const list = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: query?.period?.start ?? new Date("1970-01-01T00:00:00.000Z"),
        lte: query?.period?.end ?? new Date(),
      },
    },
    take: limit,
    skip: offset,
  });

  return {
    data: list,
    meta: {
      total: count,
      count: list.length,
      page,
      perPage: limit,
    },
  };
}
