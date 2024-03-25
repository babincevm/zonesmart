import { DIContainer } from '@/utils/DI/DIContainer'
import { DISymbols } from '@/utils/DI/symbols'
import { AxiosInstance } from 'axios'

import { IServiceApi } from '@services/api/types'
import { IErrorHandler } from '@services/ErrorHandler/types'

import { Auth } from '@services/api/Auth/Auth'
import axiosInstance from '@services/axios'
import { Products } from '@services/api/Products/Products'
import { ErrorHandler } from '@services/ErrorHandler/ErrorHandler'

export class CompositionRoot {
    public static Init() {
        this.InitAPI()
        this.InitHelpers()
    }

    private static InitAPI() {
        DIContainer.Bind(DISymbols.Request).asSingle<AxiosInstance>(axiosInstance)
        DIContainer.Bind(DISymbols.API).asSingle<IServiceApi>({
            Auth: new Auth(),
            Products: new Products()
        })
    }

    private static InitHelpers() {
        DIContainer.Bind(DISymbols.ErrorHandler).asSingle<IErrorHandler>(new ErrorHandler())
    }
}
