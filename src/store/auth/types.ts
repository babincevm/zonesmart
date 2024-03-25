export enum EAuthLoaders {
  LOGIN = 'login',
  TOKEN_REFRESH = 'token_refresh'
}

export interface IAuthState {
  access: string | null;
  refresh: string | null;
}
