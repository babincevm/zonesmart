import { ActionContext, Module } from 'vuex'
import { DIContainer } from '@/utils/DI/DIContainer'
import { DISymbols } from '@/utils/DI/symbols'

import { IState } from '@store/types'
import {
    EProductLoaders,
    ICommitProductChangesPayload,
    IProductState,
    TChangedProductData,
    TFetchProductsPayload
} from '@store/products/types'
import { IServiceApi } from '@services/api/types'
import { IProduct } from '@services/api/Products/types'

const products: Module<IProductState, IState> = {
    namespaced: true,
    state: {
        products: new Map<IProduct['id'], IProduct>(),
        changed_data: new Map<IProduct['id'], TChangedProductData>(),
        selected_products: new Set<IProduct['id']>(),
        total_amount: 0,
        selected_products_max_price: undefined,
        selected_products_min_price: undefined
    },
    actions: {
        async fetchProducts({ commit }: ActionContext<IProductState, IState>, payload: TFetchProductsPayload) {
            const { signal = undefined, page = 1, per_page = 10, loader_id = EProductLoaders.LIST } = payload.options ?? {}

            const { Products } = DIContainer.GetService<IServiceApi>(DISymbols.API)

            commit('LOADER_START', loader_id, { root: true })
            const { error, data } = await Products.fetchProducts({
                signal,
                limit: per_page,
                offset: per_page * (page - 1)
            })
            commit('LOADER_END', loader_id, { root: true })

            if (error) {
                return
            }
            commit('REPLACE_PRODUCTS', data.results)
            commit('SET_TOTAL_AMOUNT', data.count)
        },

        setSelectedProductsMaxPrice({ commit, state }: ActionContext<IProductState, IState>, price: number | undefined) {
            commit('SET_SELECTED_MAX_PRICE', price)
            for (const selectedProductId of state.selected_products) {
                commit('SET_CHANGED_DATA_FOR_PRODUCT', {
                    id: selectedProductId,
                    field: 'max_price',
                    value: price
                } as ICommitProductChangesPayload)
            }
        },
        setSelectedProductsMinPrice({ commit, state }: ActionContext<IProductState, IState>, price: number | undefined) {
            commit('SET_SELECTED_MIN_PRICE', price)
            for (const selectedProductId of state.selected_products) {
                commit('SET_CHANGED_DATA_FOR_PRODUCT', {
                    id: selectedProductId,
                    field: 'min_price',
                    value: price
                } as ICommitProductChangesPayload)
            }
        },
        setProductsMinMaxPrice({ commit, state }: ActionContext<IProductState, IState>, productId: IProduct['id']) {
            commit('SET_CHANGED_DATA_FOR_PRODUCT', {
                id: productId,
                value: state.selected_products_max_price,
                field: 'max_price'
            } as ICommitProductChangesPayload)
            commit('SET_CHANGED_DATA_FOR_PRODUCT', {
                id: productId,
                value: state.selected_products_min_price,
                field: 'min_price'
            } as ICommitProductChangesPayload)
        },
    },
    mutations: {
        REPLACE_PRODUCTS(state: IProductState, payload: IProduct[]) {
            state.products.clear()
            state.changed_data.clear()
            state.selected_products.clear()
            for (const product of payload) {
                state.products.set(product.id, product)
            }
        },
        SET_TOTAL_AMOUNT(state: IProductState, payload: number) {
            state.total_amount = payload
        },
        SET_SELECTED_MAX_PRICE(state: IProductState, payload: number | undefined) {
            state.selected_products_max_price = payload
        },
        SET_SELECTED_MIN_PRICE(state: IProductState, payload: number | undefined) {
            state.selected_products_min_price = payload
        },
        SET_CHANGED_DATA_FOR_PRODUCT(state: IProductState, payload: ICommitProductChangesPayload) {
            let changedProductValues = state.changed_data.get(payload.id)
            if (!changedProductValues) {
                changedProductValues = state.changed_data.set(payload.id, {}).get(payload.id)
                if (!changedProductValues) {
                    throw new Error()
                }
            }

            if (payload.value !== null) {
                changedProductValues[payload.field] = payload.value
                return
            }

            delete changedProductValues[payload.field]

            if (Object.keys(changedProductValues).length === 0) {
                state.changed_data.delete(payload.id)
            }
        }
    }
}

export default products
