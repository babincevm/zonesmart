<template lang="pug">
component(
  :is="is"
  ref="flex"
  :class="['v-flex', {'v-flex--column': column,'v-flex--row': row,'v-flex--wrap': wrap,'v-flex--inline': inline, 'v-flex--paper': paper}]"
  :style="css_vars"
)
  slot
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType } from 'vue'

import { pixelify } from '@helpers/style'

export default defineComponent({
    name: 'VFlex',
    props: {
        is: {
            type: String as PropType<keyof HTMLElementTagNameMap | string>,
            required: false,
            default: 'div'
        },
        gap: [String, Number] as PropType<CSSProperties['gap'] | string | number>,
        column: Boolean,
        row: Boolean,
        align: String as PropType<CSSProperties['alignItems']>,
        justify: String as PropType<CSSProperties['justifyContent']>,
        width: [String, Number] as PropType<CSSProperties['width'] | string | number>,
        height: [String, Number] as PropType<CSSProperties['height'] | string | number>,
        wrap: Boolean,
        inline: Boolean,
        shrink: String as PropType<CSSProperties['flexShrink']>,
        grow: String as PropType<CSSProperties['flexGrow']>,
        paper: Boolean
    },
    computed: {
        css_vars() {
            return {
                '--v-flex-align': this.$props.align,
                '--v-flex-justify': this.$props.justify,
                '--v-flex-gap': pixelify(this.$props.gap),
                '--v-flex-width': pixelify(this.$props.width),
                '--v-flex-height': pixelify(this.$props.height),
                '--v-flex-shrink': this.$props.shrink,
                '--v-flex-grow': this.$props.grow
            }
        }
    }
})
</script>
<style lang="sass" scoped src="./v-flex.sass"></style>
