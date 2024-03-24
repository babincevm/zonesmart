<template lang="pug">
.v-image(:class="{'v-image--loading': is_loading}")
  img(:src="src" :alt="alt" :title="title" loading="lazy")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: String,
    title: String
  },
  data() {
    return {
      is_loading: true
    };
  }
});
</script>

<style lang="sass" scoped src="./v-image.sass"></style>
