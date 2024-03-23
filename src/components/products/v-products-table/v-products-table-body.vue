<template lang="pug">
tbody
  v-products-table-row
  v-products-table-row
  v-products-table-row
  v-products-table-row
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VProductsTableRow from '@components/products/v-products-table/v-products-table-row.vue'

export default defineComponent({
    name: 'VProductsTableBody',
    components: { VProductsTableRow }
})
</script>

<style lang="sass" scoped src="./v-products-table.sass"></style>
