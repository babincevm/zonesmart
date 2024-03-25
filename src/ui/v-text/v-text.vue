<template lang="pug">
component(
  :is="props_proxy.as"
  :style="css_vars"
  :class="[\
    'v-text',\
      {\
      'v-text--nowrap': props_proxy.nowrap,\
      'v-text--inline': props_proxy.inline,\
      'v-text--ellipsis': props_proxy.ellipsis,\
      [`v-text--${props_proxy.color}`]: props_proxy.color,\
      [`v-text--${props_proxy.hoverColor}-hover`]: props_proxy.hoverColor,\
      [`v-text--${props_proxy.activeColor}-active`]: props_proxy.activeColor\
      }]"
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
        as: {
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
        hoverColor: String as PropType<Omit<TColor, 'white' | 'black'>>,
        activeColor: String as PropType<Omit<TColor, 'white' | 'black'>>,
        nowrap: Boolean,
        ellipsis: Boolean,
        inline: Boolean,
        preset: String as PropType<TPresets>
    },
    data() {
        const { active_breakpoint } = useResolution()
        return {
            active_breakpoint
        }
    },
    computed: {
        props_proxy(): Omit<typeof this.$props, 'preset'> {
            if (!this.$props.preset) {
                return this.$props
            }

            const current_preset_styles = presets.get(this.$props.preset)
            if (!current_preset_styles) {
                return this.$props
            }

            return {
                ...current_preset_styles.shared,
                ...(current_preset_styles?.[this.active_breakpoint] ?? {}),
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
