<template lang="pug">
v-flex.v-products(column paper width="100%" height="min-content" gap="30" align="flex-start" justify="flex-start" )
  v-flex(row width="100%" gap="20" align="flex-end" justify="flex-start" )
    v-text.v-products__title(preset="h2" as="h1") Мои товары
      v-icon(name="question" )

    v-skeleton(width="55" height="20" :loading="is_products_loading")
      v-text(preset="basic" color="gray" line-height="20" ) {{products.size}} из {{total_amount}}

  v-flex(column gap="20")
    v-text(align="left" preset="basic" ) Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
    v-text(align="left" preset="basic" ) Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter

  v-products-add

  v-skeleton(:loading="is_products_loading")
    v-products-table(:pagination="pagination" @update:pagination="changePaginationPage")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import { useSignal } from '@/hooks/useSignal'

import { EProductLoaders, TFetchProductsPayload } from '@store/products/types'

import VFlex from '@ui/v-flex/v-flex.vue'
import VText from '@ui/v-text/v-text.vue'
import VIcon from '@ui/v-icon/v-icon.vue'
import VSkeleton from '@ui/v-skeleton/v-skeleton.vue'

import VProductsAdd from '@components/products/v-products-add/v-products-add.vue'
import VProductsTable from '@components/products/v-products-table/v-products-table.vue'
import VPagination from '@components/v-pagination/v-pagination.vue'

export default defineComponent({
    name: 'VProducts',
    components: { VPagination, VSkeleton, VProductsTable, VProductsAdd, VIcon, VText, VFlex },
    mixins: [useSignal],
    data() {
        return {
            pagination: 1
        }
    },
    computed: {
        ...mapGetters(['is_loading']),
        ...mapState('products', ['total_amount', 'products']),
        is_products_loading(): boolean {
            return (this.is_loading as (loaderId: string) => boolean)(EProductLoaders.LIST)
        }
    },
    methods: {
        ...mapActions('products', ['fetchProducts']),
        changePaginationPage(page: number) {
            this.pagination = page
            this.fetchItems()
        },
        async fetchItems() {
            await this.fetchProducts({
                options: {
                    signal: this.requestStart(EProductLoaders.LIST),
                    per_page: 10,
                    page: this.pagination
                }
            } as TFetchProductsPayload)
            this.requestEnd(EProductLoaders.LIST)
        }
    },
    beforeMount() {
    // TODO: Возможно не всегда нужно получать первую страницу, пока сделал без проверки
    // if (this.products.size > 0) {
    //     return
    // }
        this.fetchItems()
    }
})
</script>

<style lang="sass" scoped src="./v-products.sass"></style>

