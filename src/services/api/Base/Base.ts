import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { DIContainer } from '@/utils/DI/DIContainer'
import { DISymbols } from '@/utils/DI/symbols'

import { IResponse } from '@services/api/Base/types'

export class Base {
    protected axios_instance: AxiosInstance

    constructor() {
        this.axios_instance = DIContainer.GetService<AxiosInstance>(DISymbols.Request)
    }

    protected async handle<TData>(request: Promise<AxiosResponse<TData>>): Promise<IResponse<TData>> {
        try {
            const response = await request
            return {
                data: response.data,
                error: null,
                status: response.status
            }
        } catch (err) {
            return {
                data: null,
                status: (err as AxiosError)?.response?.status ?? 500,
                error: err as AxiosError
            }
        }
    }
}
