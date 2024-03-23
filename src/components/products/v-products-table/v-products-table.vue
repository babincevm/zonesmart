<template lang="pug">
table.v-products-table(frame="void" rules="rows" bordercolor="rgba(0, 0, 0, .2)")
  v-products-table-header
  v-products-table-body
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VProductsTableHeader from '@components/products/v-products-table/v-products-table-header.vue'
import VProductsTableBody from '@components/products/v-products-table/v-products-table-body.vue'

export default defineComponent({
    name: 'VProductsTable',
    components: { VProductsTableBody, VProductsTableHeader }
})
</script>

<style lang="sass" scoped src="./v-products-table.sass"></style>
