<template lang="pug">
v-text.v-button(is="button" :preset="textPreset" :color="text_color" :class="[`v-button--${color}`]" no-hover :disabled="disabled")
  v-flex(width="100%" height="min-content" gap="10" )
    v-icon.v-button__icon.v-button__icon-prepend(v-if="prepend" name="prepend")
    slot
    v-icon.v-button__icon.v-button__icon-append(v-if="append" name="append")
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { TColor } from '@ui/v-button/types'
import { TColor as TTextColor } from '@ui/v-text/types'

import VFlex from '@ui/v-flex/v-flex.vue'
import VIcon from '@ui/v-icon/v-icon.vue'
import VText from '@ui/v-text/v-text.vue'
import { TPresets } from '@ui/v-text/presets'

export default defineComponent({
    name: 'VButton',
    components: { VText, VIcon, VFlex },
    props: {
        prepend: String,
        append: String,
        disabled: Boolean,
        loading: Boolean,
        color: {
            type: String as PropType<TColor>,
            default: 'green' as TColor
        },
        type: {
            type: String as PropType<HTMLButtonElement['type']>,
            default: 'button'
        },
        textPreset: {
            type: String as PropType<TPresets>,
            default: 'button'
        }
    },
    computed: {
        text_color(): TTextColor {
            if (this.$props.disabled) {
                return 'gray'
            }
            if (this.$props.color === 'gray' || this.$props.color === 'transparent') {
                return 'dark-blue'
            }

            return 'white'
        }
    }
})
</script>

<style lang="sass" scoped src="./v-button.sass"></style>