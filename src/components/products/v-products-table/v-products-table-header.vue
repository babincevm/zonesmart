<template lang="pug">
v-flex.v-products-table__header(column align="center" justify="flex-start" )
  .v-products-table__row
    v-checkbox(v-model="checkbox_proxy" )
    v-text(preset="basic" color="gray" align="left" ) Фото
    v-text(preset="basic" color="gray" align="left" ) Артикул продавца
    v-text(preset="basic" color="gray" align="left" ) Бренд
    v-text(preset="basic" color="gray" align="left" ) Название
    v-sort(v-model="quantity_sort_proxy" ) Остаток, шт.
    v-sort(v-model="price_sort_proxy" ) Текущая цена
    v-sort(v-model="min_price_sort_proxy" ) Минимальная цена
    v-sort(v-model="max_price_sort_proxy" ) Максимальная цена
    v-text(preset="basic" color="gray" width="67px") Удалить

  .v-products-table__row.v-products-table__header-actions(:class="{'v-products-table__header-actions--hidden': selected_products.size === 0}")
    v-flex.v-products-table__header-actions-buttons(row gap="10" align="center" justify="flex-start" )
      v-text(nowrap) Выбрано {{selected_products.size}} из {{items_on_page}}
      v-button(prepend="delete-bold" color="gray" icon-size="15" thin @click="deleteSelected") Удалить выделенные

    v-text.v-products-table__header-text(preset="basic" align="right" nowrap) Для всех выделенных
    v-flex.v-products-table__header-input(width="100%" height="100%" justify="center" align="center" )
      v-input.v-products-table__header-min-price(placeholder="₽" :mask="money_mask" thin @blur="commitMinPrice" ref="minPriceRef" v-model="min_price_model" @submit="commitMinPrice")
    v-flex.v-products-table__header-input(width="100%" height="100%" justify="center" align="center" )
      v-input.v-products-table__header-max-price(placeholder="₽" :mask="money_mask" thin @blur="commitMaxPrice" ref="maxPriceRef" v-model="max_price_model" @submit="commitMaxPrice")
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapActions, mapState } from 'vuex'

import { IProduct } from '@services/api/Products/types'
import { ECheckboxState } from '@ui/v-checkbox/types'
import { TFieldSort, TSortable } from '@components/products/v-products-table/types'
import { TSortOrder } from '@ui/v-sort/types'

import { money_mask } from '@helpers/masks'

import VSort from '@ui/v-sort/v-sort.vue'
import VText from '@ui/v-text/v-text.vue'
import VFlex from '@ui/v-flex/v-flex.vue'
import VButton from '@ui/v-button/v-button.vue'
import VInput from '@ui/v-input/v-input.vue'
import VCheckbox from '@ui/v-checkbox/v-checkbox.vue'

export default defineComponent({
    name: 'VProductsTableHeader',
    components: { VCheckbox, VInput, VButton, VFlex, VText, VSort },
    props: {
        sort: String as PropType<TFieldSort | undefined>
    },
    data() {
        return {
            money_mask,
            min_price_model: '',
            max_price_model: ''
        }
    },
    computed: {
        ...mapState('products', ['changed_data', 'products', 'selected_products']),
        items_on_page() {
            return (this.products as Map<IProduct['id'], IProduct>).size
        },
        checkbox_proxy: {
            get(): ECheckboxState {
                const checked_products_amount = ((this as any).selected_products as Set<IProduct['id']>).size
                if (checked_products_amount === 0) {
                    return ECheckboxState.STATE_UNCHECKED
                }
                if (checked_products_amount === ((this as any).products as Map<IProduct['id'], IProduct>).size) {
                    return ECheckboxState.STATE_CHECKED
                }

                return ECheckboxState.STATE_INDETERMINATE
            },
            set(v: ECheckboxState) {
                if (v === ECheckboxState.STATE_UNCHECKED) {
                    ((this as any).selected_products as Set<IProduct['id']>).clear()
                    return
                }
                for (const productId of ((this as any).products as Map<IProduct['id'], IProduct>).keys()) {
                    ((this as any).selected_products as Set<IProduct['id']>).add(productId)
                }
            }
        },
        quantity_sort_proxy: {
            get(): TSortOrder | undefined {
                return (this as any).getSortProxyValue('quantity')
            },
            set(v: TSortOrder | undefined) {
                (this as any).setSortProxyValue('quantity', v)
            }
        },
        price_sort_proxy: {
            get(): TSortOrder | undefined {
                return (this as any).getSortProxyValue('price')
            },
            set(v: TSortOrder | undefined) {
                (this as any).setSortProxyValue('price', v)
            }
        },
        min_price_sort_proxy: {
            get(): TSortOrder | undefined {
                return (this as any).getSortProxyValue('min_price')
            },
            set(v: TSortOrder | undefined) {
                (this as any).setSortProxyValue('min_price', v)
            }
        },
        max_price_sort_proxy: {
            get(): TSortOrder | undefined {
                return (this as any).getSortProxyValue('max_price')
            },
            set(v: TSortOrder | undefined) {
                (this as any).setSortProxyValue('max_price', v)
            }
        }
    },
    methods: {
        ...mapActions('products', ['setSelectedProductsMaxPrice', 'setSelectedProductsMinPrice']),
        deleteSelected() {
            // eslint-disable-next-line no-console
            console.log('Удалены элементы: ', [...this.selected_products as Set<string>])
        },
        commitMinPrice() {
            if (!this.$refs.minPriceRef) {
                return
            }

            this.setSelectedProductsMinPrice(Number(this.$refs.minPriceRef.masked_value.unmasked) || undefined)
        },
        commitMaxPrice() {
            if (!this.$refs.maxPriceRef) {
                return
            }

            this.setSelectedProductsMaxPrice(Number(this.$refs.maxPriceRef.masked_value.unmasked) || undefined)
        },
        getSortProxyValue(field: TSortable) {
            if (this.$props.sort === undefined) {
                return undefined
            }
            const [sort_field, sort_order]: [TSortable, TSortOrder] = this.$props.sort.split('.')
            if (sort_field !== field) {
                return undefined
            }
            return sort_order
        },
        setSortProxyValue(field: TSortable, v: TSortOrder | undefined) {
            if (v === undefined) {
                this.$emit('update:sort', undefined)
                return
            }
            this.$emit('update:sort', `${field}.${v}` as TFieldSort)
        }
    }
})
</script>

<style lang="sass" scoped src="./v-products-table.sass"></style>
