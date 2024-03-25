import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IErrorHandler {
  HandleUnauthenticated(axios_config: AxiosRequestConfig): Promise<false | AxiosResponse<any, any>>;
}
