import { IRequestOptions, IResponse } from '@services/api/Base/types';

export interface IAuth {
  login(payload: IAuthData, options?: IRequestOptions): Promise<IResponse<ITokenResponse>>;
  refresh(token: string): Promise<IResponse<unknown>>;
}

export interface IAuthData {
  email: string;
  password: string;
}

export interface ITokenResponse {
  access: string;
  refresh: string;
}
