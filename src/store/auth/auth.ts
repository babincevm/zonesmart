import { DIContainer } from '@/utils/DI/DIContainer'
import { DISymbols } from '@/utils/DI/symbols'
import { ActionContext, Module } from 'vuex'
import { router } from '@/routes'

import { IServiceApi } from '@services/api/types'
import { IAuthData } from '@services/api/Auth/types'
import { IActionPayload, IState } from '@store/types'
import { EAuthLoaders, IAuthState } from '@store/auth/types'

const auth: Module<IAuthState, IState> = {
    namespaced: true,
    state() {
        return {
            access: null,
            refresh: null
        }
    },
    getters: {
        is_logged_in: (state: IAuthState) => Boolean(state.access)
    },
    actions: {
        login: async (
            { commit }: ActionContext<IAuthState, IState>,
            payload: IActionPayload<IAuthData>
        ): Promise<boolean> => {
            if (!payload.data) {
                throw new Error('Auth data is not provided')
            }
            commit('LOADER_START', payload.options?.loader_id ?? EAuthLoaders.LOGIN, { root: true })
            const { Auth } = DIContainer.GetService<IServiceApi>(DISymbols.API)
            const { error, data } = await Auth.login(
                payload.data,
                { signal: payload.options?.signal }
            )
            commit('LOADER_END', payload.options?.loader_id ?? EAuthLoaders.LOGIN, { root: true })
            if (error) {
                return false
            }

            commit('SET_ACCESS_TOKEN', data.access)
            commit('SET_REFRESH_TOKEN', data.refresh)
            return true
        },
        async logout({ commit }: ActionContext<IAuthState, IState>) {
            commit('LOGOUT')
            await router.push({
                name: 'auth'
            })
        },
        async refresh({ commit, state }: ActionContext<IAuthState, IState>): Promise<boolean> {
            if (!state.refresh) {
                return false
            }
            const { Auth } = DIContainer.GetService<IServiceApi>(DISymbols.API)
            commit('LOADER_START', EAuthLoaders.TOKEN_REFRESH, { root: true })
            const { error, data } = await Auth.refresh(state.refresh)
            commit('LOADER_END', EAuthLoaders.TOKEN_REFRESH, { root: true })
            if (error) {
                return false
            }
            commit('SET_ACCESS_TOKEN', data.access)
            return true

        }
    },
    mutations: {
        INIT(state: IAuthState) {
            state.access = localStorage.getItem('access') ?? null
            state.refresh = localStorage.getItem('refresh') ?? null
        },
        SET_ACCESS_TOKEN(state: IAuthState, payload: string) {
            state.access = payload
            localStorage.setItem('access', payload)
        },
        SET_REFRESH_TOKEN(state: IAuthState, payload: string) {
            state.refresh = payload

            localStorage.setItem('refresh', payload)
        },

        LOGOUT(state: IAuthState) {
            state.access = null
            state.refresh = null

            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
        }
    }
}

export default auth
