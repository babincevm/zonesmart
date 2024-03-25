import { IRequestOptions, IResponse } from '@services/api/Base/types'

export interface IAuthAPI {
  login(payload: IAuthData, options?: IRequestOptions): Promise<IResponse<ITokenResponse>>;

  refresh(token: string): Promise<IResponse<IRefreshTokenResponse>>;
}

export interface IAuthData {
  email: string;
  password: string;
}

export interface ITokenResponse {
  access: string;
  refresh: string;
}

export interface IRefreshTokenResponse {
  access: string;
}
