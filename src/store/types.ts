import { IAuthState } from '@store/auth/types';

export interface IStoreOptions {
  signal?: AbortSignal;
  loader_id?: string;
}

export interface IActionPayload<TData = unknown> {
  data?: TData;
  options?: IStoreOptions;
}

export interface IState {
  loaders: Set<string>;
}

export type TGlobalState = IState & {
  auth: IAuthState;
};
