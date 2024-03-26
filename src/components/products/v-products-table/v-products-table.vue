<template lang="pug">
v-flex.v-products-table(column width="100%" gap="0")
  v-products-table-header(v-model:sort="sort" )
  v-products-table-row(v-for="productId in sorted_product_ids" :key="productId" :product-id="productId")
  v-pagination.v-products-table__pagination(:total="pages_amount" v-model="pagination_proxy" )

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

import { IProduct } from '@services/api/Products/types'
import { TFieldSort, TSortable } from '@components/products/v-products-table/types'
import { TSortOrder } from '@ui/v-sort/types'

import VFlex from '@ui/v-flex/v-flex.vue'
import VText from '@ui/v-text/v-text.vue'

import VProductsTableHeader from '@components/products/v-products-table/v-products-table-header.vue'
import VProductsTableRow from '@components/products/v-products-table/v-products-table-row.vue'
import VPagination from '@components/v-pagination/v-pagination.vue'

export default defineComponent({
    name: 'VProductsTable',
    components: { VText, VPagination, VProductsTableRow, VFlex, VProductsTableHeader },
    emits: ['update:pagination'],
    props: {
        pagination: {
            type: Number,
            default: 1
        },
        per_page: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            sort: undefined as TFieldSort | undefined
        }
    },
    computed: {
        ...mapState('products', ['products', 'total_amount']),
        pagination_proxy: {
            get(): number {
                return (this as any).$props.pagination
            },
            set(v: number) {
                (this as any).$emit('update:pagination', v)
            }
        },
        pages_amount() {
            return Math.ceil((this.total_amount as number) / this.$props.per_page)
        },
        sorted_product_ids() {
            const products_array: IProduct[] = [...(this.products as Map<IProduct['id'], IProduct>).values()]
            if (this.sort === undefined) {
                return products_array.map(({ id }: IProduct) => id)
            }
            const [sort_field, sort_order] = this.sort.split('.') as [TSortable, TSortOrder]
            return products_array.sort((product_a: IProduct, product_b: IProduct) => {
                const field_a = product_a[sort_field] ?? Number.MIN_SAFE_INTEGER
                const field_b = product_b[sort_field] ?? Number.MIN_SAFE_INTEGER


                if (sort_order === 'asc') {
                    return field_b - field_a
                }

                return field_a - field_b
            }).map(({ id }: IProduct) => id)
        }
    }
})
</script>

<style lang="sass" scoped src="./v-products-table.sass"></style>
