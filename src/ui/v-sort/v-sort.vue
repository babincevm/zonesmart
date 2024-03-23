<template lang="pug">
v-text.v-sort(is="button" preset="basic" color="gray" @click="$emit('click')")
  slot
  v-icon(name="arrow")
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { TState } from '@ui/v-sort/types'

import VFlex from '@ui/v-flex/v-flex.vue'
import VText from '@ui/v-text/v-text.vue'
import VIcon from '@ui/v-icon/v-icon.vue'

export default defineComponent({
    name: 'VSort',
    components: { VIcon, VText, VFlex },
    emits: ['click'],
    props: {
        state: String as PropType<TState>
    }
})
</script>

<style lang="sass" scoped src="./v-sort.sass"></style>
