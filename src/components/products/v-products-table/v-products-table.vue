<template lang="pug">
v-flex.v-products-table(column width="100%" gap="0")
  v-products-table-header
  v-products-table-row(v-for="productId in products.keys()" :key="productId" :product-id="productId")
  v-pagination.v-products-table__pagination(:total="pages_amount" v-model="pagination_proxy" )

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex'

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
    computed: {
        ...mapState('products', ['products', 'total_amount']),
        pagination_proxy: {
            get(): number {
                return this.$props.pagination
            },
            set(v: number) {
                this.$emit('update:pagination', v)
            }
        },
        pages_amount() {
            return Math.ceil((this.total_amount as number) / this.$props.per_page)
        }
    }
})
</script>

<style lang="sass" scoped src="./v-products-table.sass"></style>
