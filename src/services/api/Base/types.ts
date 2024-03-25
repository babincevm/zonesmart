export type IResponse<TData> = {
  status: number;
} & (
  | {
  data: TData;
  error: null | never;
}
  | {
  data: null | never;
  error: Error;
}
  );

export interface IPaginated<TData = unknown> {
  count: number;
  next: string | null;
  previous: string | null;
  results: TData;
}

export type IRequestOptions<T = unknown> = T & {
  signal?: AbortSignal;
}

export type TWithPagination = {
  limit?: number;
  offset?: number;
}
