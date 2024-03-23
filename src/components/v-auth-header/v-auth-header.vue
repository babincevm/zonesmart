<template lang="pug">
v-flex.v-auth-header(is="header" justify="space-between" row)
  v-icon(name="logo" width="243" height="30" )
  v-flex(width="min-content" gap="10" align="center" justify="flex-end" row)
    v-text(preset="basic" color="gray" ) Поддержка
    v-text(is="button" color="dark-blue" )
      v-icon(name="telegram" size="30")
    v-text(is="button" color="dark-blue" )
      v-icon(name="whatsapp" size="30" )
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VIcon from '@ui/v-icon/v-icon.vue'
import VFlex from '@ui/v-flex/v-flex.vue'
import VText from '@ui/v-text/v-text.vue'

export default defineComponent({
    name: 'VAuthHeader',
    components: { VText, VFlex, VIcon }
})
</script>

<style lang="sass" scoped src="./v-auth-header.sass"></style>
