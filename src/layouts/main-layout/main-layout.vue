<template lang="pug">
.main-layout
  v-header.main-layout__header
  .main-layout__content
    slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VFlex from '@ui/v-flex/v-flex.vue'

import VHeader from '@components/v-header/v-header.vue'

export default defineComponent({
    name: 'MainLayout',
    components: { VFlex, VHeader }
})
</script>

<style lang="sass" scoped src="./main-layout.sass"></style>
