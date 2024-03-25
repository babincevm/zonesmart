<template lang="pug">
.v-products-table__row.v-products-table__row-item
  v-checkbox(v-model="checked_proxy" )
  v-image(:src="current_product.images[0]")

  v-flex(v-if="current_product.remote_id" is="button" align="center" justify="flex-start" row)
    v-icon(name="link" color="gray" )
    v-text(preset="basic") {{current_product.remote_id}}
  v-text(v-else preset="basic")

  v-text(ellipsis nowrap align="left" ) {{current_product.brand_name}}
  v-text.v-products-table__row-item-text(ellipsis nowrap align="left" ) {{current_product.title}}
  v-text(ellipsis nowrap align="left" ) {{current_product.quantity}}
  v-text(ellipsis nowrap align="left" ) {{formatRub(current_product.price)}}
  v-flex.v-products-table__row-item-input(width="100%" height="100%" justify="center" align="center" )
    v-input(v-model="min_price_proxy" :mask="money_mask" thin placeholder="₽")
  v-flex.v-products-table__row-item-input(width="100%" height="100%" justify="center" align="center" )
    v-input(v-model="max_price_proxy" :mask="money_mask" thin placeholder="₽")
  v-flex(justify="flex-start" align="center" width="100%" height="100%" row)
    v-icon(name="delete" color="gray" active-color="gray" hover-color="gray" button)
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapActions, mapState } from 'vuex'

import { IProduct } from '@services/api/Products/types'
import { TChangedProductData } from '@store/products/types'

import { money_mask } from '@helpers/masks'
import { formatRub } from '@helpers/currency'

import VCheckbox from '@ui/v-checkbox/v-checkbox.vue'
import VFlex from '@ui/v-flex/v-flex.vue'
import VIcon from '@ui/v-icon/v-icon.vue'
import VText from '@ui/v-text/v-text.vue'
import VInput from '@ui/v-input/v-input.vue'
import VImage from '@ui/v-image/v-image.vue'

export default defineComponent({
    name: 'VProductsTableRow',
    components: { VImage, VInput, VText, VIcon, VFlex, VCheckbox },
    props: {
        productId: {
            type: String as PropType<IProduct['id']>,
            required: true
        }
    },
    data() {
        return {
            min_price: '',
            max_price: '',
            money_mask
        }
    },
    computed: {
        ...mapState('products', ['products', 'changed_data', 'selected_products']),
        current_product(): IProduct | undefined {
            return (this.products as Map<IProduct['id'], IProduct>).get(this.$props.productId)
        },
        changed_values(): TChangedProductData | undefined {
            return (this.changed_data as Map<IProduct['id'], TChangedProductData>).get(this.$props.productId)
        },
        checked_proxy: {
            get(): boolean {
                return this.selected_products.has(this.$props.productId)
            },
            set(v: boolean) {
                if (!v) {
                    this.selected_products.delete(this.$props.productId)
                    return
                }
                this.selected_products.add(this.$props.productId)
                this.setProductsMinMaxPrice(this.$props.productId)
            }
        },
        min_price_proxy: {
            get(): boolean {
                return this.changed_values?.min_price ?? this.current_product.min_price
            },
            set(v: boolean) {
                if (this.changed_values === undefined) {
                    (this.changed_data as Map<IProduct['id'], TChangedProductData>).set(this.$props.productId, { min_price: this.current_product.min_price })
                }
                this.changed_values.min_price = v
            }
        },
        max_price_proxy: {
            get(): boolean {
                return this.changed_values?.max_price ?? this.current_product.max_price
            },
            set(v: boolean) {
                if (this.changed_values === undefined) {
                    (this.changed_data as Map<IProduct['id'], TChangedProductData>).set(this.$props.productId, { max_price: this.current_product.max_price })
                }
                this.changed_values.max_price = v
            }
        }
    },
    methods: {
        ...mapActions('products', ['setProductsMinMaxPrice']),
        formatRub
    }
})
</script>

<style lang="sass" scoped src="./v-products-table.sass"></style>
