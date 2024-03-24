<template lang="pug">
v-text(:is="button ? 'button' : undefined" :type="button ? 'button' : undefined" @click="$emit('click')" :color="color" :hover-color="hoverColor" :active-color="activeColor" )
  svg.icon(
    :height="height ?? size"
    :style="styles"
    :width="width ?? size"
    aria-hidden="true"
  )
    use(:xlink:href="`#${name}`")
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType } from 'vue';

import { TColor } from '@ui/v-text/types';

import { pixelify } from '@helpers/style';

import VFragment from '@ui/v-fragment/v-fragment.vue';
import VText from '@ui/v-text/v-text.vue';

export default defineComponent({
  name: 'VIcon',
  components: { VText, VFragment },
  emits: ['click'],
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
    height: [String, Number],
    button: Boolean,
    color: String as PropType<TColor>,
    hoverColor: String as PropType<InstanceType<typeof VText>['$props']['hoverColor']>,
    activeColor: String as PropType<InstanceType<typeof VText>['$props']['activeColor']>
  },
  computed: {
    styles(): CSSProperties {
      return {
        minWidth: pixelify(this.$props.width ?? this.$props.size),
        minHeight: pixelify(this.$props.height ?? this.$props.size)
      };
    }
  }
});
</script>

<style lang="sass" scoped src="./v-icon.sass" />
