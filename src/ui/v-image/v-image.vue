<template lang="pug">
.v-image(:class="{'v-image--loading': isLoading}")
  img(:src="src" :alt="alt" :title="title" loading="lazy")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
            isLoading: true
        }
    }
})
</script>

<style lang="sass" scoped src="./v-image.sass"></style>
