import { ActionContext, createStore } from 'vuex';

import { IState, TGlobalState } from '@store/types';

import auth from './auth/auth';

const store = createStore<TGlobalState>({
  state() {
    return {
      loaders: new Set<string>()
    };
  },
  getters: {
    is_loading: (state: IState) => (loaderId: string) => state.loaders.has(loaderId)
  },
  actions: {
    initStore({ commit }: ActionContext<TGlobalState, IState>) {
      commit('auth/INIT');
    }
  },
  mutations: {
    LOADER_START(state: IState, loader_id: string) {
      state.loaders.add(loader_id);
    },
    LOADER_END(state: IState, loader_id: string) {
      state.loaders.delete(loader_id);
    }
  },
  modules: {
    auth
  }
});

export default store;
