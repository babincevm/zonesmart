<template lang="pug">
svg.icon(
  :height="height ?? size"
  :style="styles"
  :width="width ?? size"
  aria-hidden="true"
)
  use(:xlink:href="`#${name}`")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { pixelify } from '@helpers/style'

export default defineComponent({
    name: 'VIcon',
    props: {
        name: {
            type: String,
            required: true
        },
        size: {
            type: [String, Number],
            default: 25
        },
        width: [String, Number],
        height: [String, Number]
    },
    computed: {
        styles() {
            return {
                minWidth: pixelify(this.$props.width ?? this.$props.size),
                minHeight: pixelify(this.$props.height ?? this.$props.size)
            }
        }
    }
})
</script>

<style lang="sass" scoped src="./v-icon.sass" />
