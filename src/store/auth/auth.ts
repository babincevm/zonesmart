import { DIContainer } from '@/utils/DI/DIContainer';
import { DISymbols } from '@/utils/DI/symbols';
import { ActionContext, Module } from 'vuex';
import { router } from '@/routes';

import { IServiceApi } from '@services/api/types';
import { IAuthData, ITokenResponse } from '@services/api/Auth/types';
import { IActionPayload, IState } from '@store/types';
import { EAuthLoaders, IAuthState } from '@store/auth/types';

const auth: Module<IAuthState, IState> = {
  namespaced: true,
  state() {
    return {
      access: null,
      refresh: null
    };
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
        throw new Error('Auth data is not provided');
      }
      commit('LOADER_START', payload.options?.loader_id ?? EAuthLoaders.LOGIN, { root: true });
      const { error, data } = await DIContainer.GetService<IServiceApi>(DISymbols.API).Auth.login(
        payload.data,
        { signal: payload.options?.signal }
      );
      commit('LOADER_END', payload.options?.loader_id ?? EAuthLoaders.LOGIN, { root: true });
      if (error) {
        return false;
      }

      commit('SET_TOKEN', data);
      return true;
    },
    async logout({ commit }: ActionContext<IAuthState, IState>) {
      commit('LOGOUT');
      await router.push({
        name: 'auth'
      });
    }
  },
  mutations: {
    INIT(state: IAuthState) {
      state.access = localStorage.getItem('access') ?? null;
      state.refresh = localStorage.getItem('refresh') ?? null;
    },
    SET_TOKEN(state: IAuthState, payload: ITokenResponse) {
      state.access = payload.access;
      state.refresh = payload.refresh;

      localStorage.setItem('access', payload.access);
      localStorage.setItem('refresh', payload.refresh);
    },
    LOGOUT(state: IAuthState) {
      state.access = null;
      state.refresh = null;

      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }
  }
};

export default auth;
