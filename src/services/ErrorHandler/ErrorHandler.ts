import store from '@/store'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { IErrorHandler } from '@services/ErrorHandler/types'

import axios_instance from '@services/axios'

export class ErrorHandler implements IErrorHandler {
    static refresh_promise: Promise<boolean> | null = null

    private RefreshToken(): Promise<boolean> {
        if (ErrorHandler.refresh_promise !== null) {
            return ErrorHandler.refresh_promise
        }

        ErrorHandler.refresh_promise = store.dispatch('auth/refresh')
            .then((refresh_result: boolean) => {
                return Promise.resolve(refresh_result)
            })
            .finally(() => {
                ErrorHandler.refresh_promise = null
            })
        return ErrorHandler.refresh_promise as Promise<boolean>
    }

    public async HandleUnauthenticated(axios_config: AxiosRequestConfig): Promise<false | AxiosResponse<any, any>> {
        const refresh_result = await this.RefreshToken()
        if (!refresh_result) {
            return Promise.reject()
        }

        if (!axios_config.headers) {
            axios_config.headers = {}
        }

        axios_config.headers.authorization = `JWT ${store.state.auth.access}`
        axios_config.baseURL = undefined
        return axios_instance.request(axios_config)
    }

}
