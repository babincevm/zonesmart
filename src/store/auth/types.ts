export enum EAuthLoaders {
  LOGIN = 'login'
}

export interface IAuthState {
  access: string | null;
  refresh: string | null;
}
