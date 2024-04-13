import axios, { AxiosError } from 'axios'
import { DIContainer } from '@/utils/DI/DIContainer'
import { DISymbols } from '@/utils/DI/symbols'
import store from '@/store'

import { IErrorHandler } from '@services/ErrorHandler/types'

const axios_instance = axios.create({
    // baseURL: 'https://dev-ar.zonesmart.com/api',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
        common: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    }
})

axios_instance.interceptors.response.use((response) => response, (error) => {
    const axios_error = error as AxiosError
    if (axios_error.response?.status !== 401) {
        return Promise.reject(error)
    }
    if (!axios_error.config) {
        return store.dispatch('auth/logout')
    }
    if (axios_error.config.url === '/user/jwt/create/') {
        return Promise.reject(error)
    }
    if (axios_error.config.url === '/user/jwt/refresh/') {
        return store.dispatch('auth/logout')
    }

    return DIContainer.GetService<IErrorHandler>(DISymbols.ErrorHandler).handleUnauthenticated(axios_error.config)
})

export default axios_instance
