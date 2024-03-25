declare module 'vuex' {
  export {
      createStore,
      mapActions,
      mapGetters,
      mapMutations,
      mapState,
      Module,
      ActionContext,
      MutationPayload,
  } from 'vuex/types/index.d'
  export * from 'vuex/types/helpers.d'
  export * from 'vuex/types/logger.d'
  export * from 'vuex/types/vue.d'
}
