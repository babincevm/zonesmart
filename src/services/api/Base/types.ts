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

export interface IRequestOptions {
  signal?: AbortSignal;
}
