import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IErrorHandler {
  handleUnauthenticated(axios_config: AxiosRequestConfig): Promise<false | AxiosResponse<any, any>>;
}
