<template lang="pug">
v-flex.v-products(column paper width="100%" height="min-content" gap="30" align="flex-start" justify="flex-start" )
  v-flex(row width="100%" gap="20" align="flex-end" justify="flex-start" )
    v-text.v-products__title(preset="h2" is="h1") Мои товары
      v-icon(name="question" )
    v-text(preset="basic" color="gray" line-height="20" ) 4 из 30

  v-flex(column gap="20")
    v-text(align="left" preset="basic" ) Добавьте товары вашего магазина из одной товарной и ценовой категории (разница цены не больше 15%)
    v-text(align="left" preset="basic" ) Для добавления нескольких товаров введите несколько артикулов через запятую или используя клавишу Enter

  v-products-add

  v-products-table
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VFlex from '@ui/v-flex/v-flex.vue'
import VText from '@ui/v-text/v-text.vue'
import VIcon from '@ui/v-icon/v-icon.vue'

import VProductsAdd from '@components/products/v-products-create/v-products-add.vue'
import VProductsTable from '@components/products/v-products-table/v-products-table.vue'

export default defineComponent({
    name: 'VProducts',
    components: { VProductsTable, VProductsAdd, VIcon, VText, VFlex }
})
</script>

<style lang="sass" scoped src="./v-products.sass"></style>

