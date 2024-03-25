import { IAuthState } from '@store/auth/types'
import { IProductState } from '@store/products/types'

type TOptionsExtensions = TStoreWithPagination;

export type IStoreOptions<T extends TOptionsExtensions | unknown = unknown> = T & {
  signal?: AbortSignal;
  loader_id?: string;
}

export interface IActionPayload<TData = unknown, TOptionsExtension extends TOptionsExtensions | unknown = unknown> {
  data?: TData;
  options?: IStoreOptions<TOptionsExtension>;
}

export interface IState {
  loaders: Set<string>;
}

export type TGlobalState = IState & {
  auth: IAuthState;
  products: IProductState;
};

export type TStoreWithPagination = {
  page: number;
  per_page: number;
}
