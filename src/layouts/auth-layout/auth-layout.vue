<template lang="pug">
.auth-layout
  v-auth-header.auth-layout__header
  v-flex.auth-layout__content(justify="center" align="flex-start")
    slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VFlex from '@ui/v-flex/v-flex.vue'

import VAuthHeader from '@components/v-auth-header/v-auth-header.vue'

export default defineComponent({
    name: 'AuthLayout',
    components: {
        VFlex,
        VAuthHeader
    }
})
</script>

<style lang="sass" scoped src="./auth-layout.sass"></style>
