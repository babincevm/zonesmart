<template lang="pug">
v-text.v-sort(
  as="button"
  preset="basic"
  :color="text_color"
  :hover-color="text_color"
  :active-color="text_color"
  :class="{'v-sort--asc': modelValue === 'asc', 'v-sort--desc': modelValue === 'desc'}"
  @click="setState"
)
  slot
  v-icon(name="arrow")
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { TSortOrder } from '@ui/v-sort/types'
import { TColor as TTextColor } from '@ui/v-text/types'

import VFlex from '@ui/v-flex/v-flex.vue'
import VText from '@ui/v-text/v-text.vue'
import VIcon from '@ui/v-icon/v-icon.vue'

export default defineComponent({
    name: 'VSort',
    components: { VIcon, VText, VFlex },
    emits: ['update:modelValue'],
    props: {
        modelValue: String as PropType<TSortOrder | undefined>
    },
    computed: {
        is_sorted() {
            return this.$props.modelValue !== undefined
        },
        text_color(): TTextColor {
            if (this.is_sorted) {
                return 'green'
            }
            return 'gray'
        }

    },
    methods: {
        setState() {
            let newState: TSortOrder | undefined = undefined
            if (this.$props.modelValue === undefined) {
                newState = 'desc'
            } else if (this.$props.modelValue === 'desc') {
                newState = 'asc'
            }

            this.$emit('update:modelValue', newState)
        }
    }
})
</script>

<style lang="sass" scoped src="./v-sort.sass"></style>
