<template lang="pug">
transition(name="fade" mode="out-in" :duration="100")
  template(v-if="loading")
    div(:class="['v-skeleton',skeletonClass,inherited_class]" :style="styles")
  slot(v-else)
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType } from 'vue';

import { TSize } from '@ui/v-skeleton/types';

import { pixelify } from '@helpers/style';

export default defineComponent({
  name: 'VSkeleton',
  props: {
    loading: Boolean,
    size: [String, Number] as PropType<TSize | CSSProperties['width']>,
    width: [String, Number] as PropType<TSize | CSSProperties['width']>,
    height: [String, Number] as PropType<TSize | CSSProperties['width']>,
    inheritSlotClass: Boolean,
    skeletonClass: String
  },
  computed: {
    inherited_class() {
      return this.$props.inheritSlotClass ? this.$slots.default?.()?.[0]?.props?.class : undefined;
    },
    styles() {
      return {
        '--v-skeleton-width': pixelify(this.$props.width || this.$props.size),
        '--v-skeleton-height': pixelify(this.$props.height || this.$props.size)
      };
    }
  }
});
</script>

<style lang="sass" scoped src="./v-skeleton.sass"></style>
