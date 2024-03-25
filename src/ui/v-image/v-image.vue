<template lang="pug">
.v-image(:class="{'v-image--loading': is_loading}")
  img(:src="is_error ? fallback : src" :alt="alt" :title="title" loading="lazy" ref="image")
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import fallbackImage from '@assets/images/fallback.png'

export default defineComponent({
    name: 'VImage',
    props: {
        src: {
            type: String,
            required: true
        },
        alt: String,
        title: String,
        fallback: {
            type: String,
            default: fallbackImage
        }
    },
    data() {
        return {
            is_loading: true,
            is_error: false
        }
    },
    methods: {
        onLoad() {
            this.is_loading = false
        },
        onError() {
            this.is_loading = false
            this.is_error = true
        }
    },
    mounted() {
        const img = this.$refs.image as HTMLImageElement
        img.addEventListener('load', this.onLoad, { once: true })
        img.addEventListener('error', this.onError, { once: true })
    },
    beforeUnmount() {
        const img = this.$refs.image as HTMLImageElement
        img.removeEventListener('load', this.onLoad)
        img.removeEventListener('error', this.onError)
    }
})
</script>

<style lang="sass" scoped src="./v-image.sass"></style>
