export type TNull<T> = T | null;

export interface ListResult<T> {
  data: T[];
  meta: {
    total: number;
    count: number;
    page: number;
    perPage: number;
  };
}
export interface ListQuery {
  page?: number;
  perPage?: number;
  search?: string;
  period?: IPeriod;
}

export interface IPeriod {
  start: Date;
  end: Date;
}
