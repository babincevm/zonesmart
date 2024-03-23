<template lang="pug">
component(
  :is="props_proxy.is"
  :style="css_vars"
  :class="[\
    'v-text',\
      {\
      'v-text--nowrap': props_proxy.nowrap,\
      'v-text--inline': props_proxy.inline,\
      'v-text--no-hover': props_proxy.noHover,\
      'v-text--ellipsis': props_proxy.ellipsis,\
      [`v-text--${props_proxy.color}`]: props_proxy.color\
      }\
      ]"
)
  slot
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType } from 'vue'
import { useResolution } from '@/hooks/useResolution'

import type { TColor } from '@ui/v-text/types'

import { pixelify } from '@helpers/style'

import presets, { TPresets } from '@ui/v-text/presets'

export default defineComponent({
    name: 'VText',
    props: {
        is: {
            type: String as PropType<keyof HTMLElementTagNameMap | string>,
            required: false,
            default: 'p'
        },
        weight: String as PropType<CSSProperties['fontWeight']>,
        size: String as PropType<CSSProperties['fontSize']>,
        fontStyle: String as PropType<CSSProperties['fontStyle']>,
        lineHeight: String as PropType<CSSProperties['lineHeight']>,
        letterSpacing: String as PropType<CSSProperties['letterSpacing']>,
        align: String as PropType<CSSProperties['textAlign']>,
        decoration: String as PropType<CSSProperties['textDecoration']>,
        color: String as PropType<TColor>,
        nowrap: Boolean,
        noHover: Boolean,
        ellipsis: Boolean,
        inline: Boolean,
        preset: String as PropType<TPresets>
    },
    data() {
        const { activeBreakpoint } = useResolution()
        return {
            activeBreakpoint
        }
    },
    computed: {
        props_proxy(): Omit<typeof this.$props, 'preset'> {
            if (!this.$props.preset) {
                return this.$props
            }

            const currentPresetStyles = presets.get(this.$props.preset)
            if (!currentPresetStyles) {
                return this.$props
            }


            return {
                ...currentPresetStyles.shared,
                ...(currentPresetStyles?.[this.activeBreakpoint] ?? {}),
                // Чистим пустые поля из пропсов (чтобы undefined не перезаписывало данные из пресета)
                ...Object.fromEntries(Object.entries(this.$props).filter(([, v]) => v))
            } as Omit<typeof this.$props, 'preset'>
        },
        css_vars() {
            return {
                '--v-text-size': pixelify(this.props_proxy.size),
                '--v-text-weight': this.props_proxy.weight,
                '--v-text-font-style': this.props_proxy.fontStyle,
                '--v-text-line-height': pixelify(this.props_proxy.lineHeight),
                '--v-text-letter-spacing': pixelify(this.props_proxy.letterSpacing),
                '--v-text-align': this.props_proxy.align,
                '--v-text-text-decoration': this.props_proxy.decoration
            }
        }
    }
})
</script>

<style lang="sass" scoped src="./v-text.sass"></style>
