<template lang="pug">
main-layout
  v-products
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainLayout from '@/layouts/main-layout/main-layout.vue'

import VProducts from '@components/products/v-products/v-products.vue'

export default defineComponent({
    name: 'Products',
    components: { VProducts, MainLayout }
})
</script>
