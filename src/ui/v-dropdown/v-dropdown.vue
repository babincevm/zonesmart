<template lang="pug">
v-text.v-dropdown(is="button" color="dark-blue" no-hover)
  v-text(preset="basic") {{selectedValue}}
  v-icon(name="arrow" )
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IOption } from '@ui/v-dropdown/types'

import VFlex from '@ui/v-flex/v-flex.vue'
import VText from '@ui/v-text/v-text.vue'
import VIcon from '@ui/v-icon/v-icon.vue'

export default defineComponent({
    name: 'VDropdown',
    components: { VIcon, VText, VFlex },
    emits: ['update:modelValue'],
    props: {
        modelValue: String as PropType<IOption['id']>,
        options: {
            type: Array as PropType<Array<IOption>>,
            required: true
        }
    },
    computed: {
        selectedValue(): string {
            if (!this.modelValue) {
                return 'Не выбрано'
            }

            const selectedOption = this.options.find(({ id }: IOption) => id === this.modelValue)
            if (!selectedOption) {
                return 'Не выбрано'
            }

            return selectedOption.value
        }
    }
})
</script>

<style lang="sass" scoped src="./v-dropdown.sass"></style>
