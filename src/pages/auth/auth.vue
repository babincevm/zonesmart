<template lang="pug">
auth-layout
  v-flex.auth__form(is="form" column width="430" height="2000px" paper)
    | form
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthLayout from '@/layouts/auth-layout/auth-layout.vue'
import MainLayout from '@/layouts/main-layout/main-layout.vue'

import VFlex from '@ui/v-flex/v-flex.vue'

export default defineComponent({
    name: 'Auth',
    components: { MainLayout, VFlex, AuthLayout }
})
</script>

<style lang="sass" scoped src="./auth.sass"></style>
