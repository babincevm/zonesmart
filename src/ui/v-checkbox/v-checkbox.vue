<template lang="pug">
.v-checkbox(:class="{'v-checkbox--labeled': $slots.default}")
  input( type="checkbox" :name="name" :id="String($.uid)" v-model="proxy" :disabled="disabled")
  label( :for="String($.uid)" v-if="$slots.default")
    slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'VCheckbox',
    emits: ['update:modelValue'],
    props: {
        name: String,
        modelValue: Boolean,
        disabled: Boolean
    },
    computed: {
        proxy: {
            get() {
                return this.$props.modelValue
            },
            set(v: boolean) {
                this.$emit('update:modelValue', v)
            }
        }
    }
})
</script>

<style lang="sass" scoped src="./v-checkbox.sass"></style>
