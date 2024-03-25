<template lang="pug">
v-flex.v-products-table__header(column align="center" justify="flex-start" )
  .v-products-table__row
    v-checkbox(v-model="checkbox_proxy" )
    v-text(preset="basic" color="gray" align="left" ) Фото
    v-text(preset="basic" color="gray" align="left" ) Артикул продавца
    v-text(preset="basic" color="gray" align="left" ) Бренд
    v-text(preset="basic" color="gray" align="left" ) Название
    v-sort Остаток, шт.
    v-sort Текущая цена
    v-sort Минимальная цена
    v-sort Максимальная цена
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
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'vuex'

import { IProduct } from '@services/api/Products/types'
import { ECheckboxState } from '@ui/v-checkbox/types'

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
                const checked_amount = (this.selected_products as Set<IProduct['id']>).size
                if (checked_amount === 0) {
                    return ECheckboxState.STATE_UNCHECKED
                }
                if (checked_amount === (this.products as Map<IProduct['id'], IProduct>).size) {
                    return ECheckboxState.STATE_CHECKED
                }

                return ECheckboxState.STATE_INDETERMINATE
            },
            set(v: ECheckboxState) {
                if (v === ECheckboxState.STATE_UNCHECKED) {
                    (this.selected_products as Set<IProduct['id']>).clear()
                    return
                }
                for (const productId of (this.products as Map<IProduct['id'], IProduct>).keys()) {
                    (this.selected_products as Set<IProduct['id']>).add(productId)
                }
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
        }

    }
})
</script>

<style lang="sass" scoped src="./v-products-table.sass"></style>
