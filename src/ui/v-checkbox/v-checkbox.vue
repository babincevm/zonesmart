<template lang="pug">
.v-checkbox(:class="{'v-checkbox--labeled': $slots.default, 'v-checkbox--disabled': disabled, 'v-checkbox--checked': is_checked}")
  v-flex.v-checkbox__input-container
    input( type="checkbox" :name="name" :id="String($.uid)" v-model="checked_proxy" :disabled="disabled" v-indeterminate="is_indeterminate" :aria-checked="aria_checked")
    transition(name="checkbox-scale" duration="300")
      v-icon.v-checkbox__icon(v-if="state_icon" :name="state_icon" width="9" height="8" color="white" )
  label( :for="String($.uid)" v-if="$slots.default")
    slot
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'


import { ECheckboxState } from '@ui/v-checkbox/types'

import VIcon from '@ui/v-icon/v-icon.vue'
import VFlex from '@ui/v-flex/v-flex.vue'

export default defineComponent({
    name: 'VIndeterminateCheckbox',
    components: { VFlex, VIcon },
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: Number as PropType<ECheckboxState>,
            default: ECheckboxState.STATE_UNCHECKED
        },
        name: String,
        disabled: Boolean
    },
    directives: {
        indeterminate(el, { value }) {
            el.indeterminate = value
        }
    },
    computed: {
        model_value_adapter() {
            if (this.$props.modelValue === ECheckboxState.STATE_INDETERMINATE) {
                return ECheckboxState.STATE_INDETERMINATE
            }

            return Number(this.$props.modelValue) as ECheckboxState
        },
        is_checked() {
            return this.model_value_adapter !== ECheckboxState.STATE_UNCHECKED
        },
        is_indeterminate() {
            return this.model_value_adapter === ECheckboxState.STATE_INDETERMINATE
        },
        checked_proxy: {
            get() {
                return this.model_value_adapter === ECheckboxState.STATE_CHECKED
            },
            set(v: Boolean) {
                this.$emit('update:modelValue', Number(v) as ECheckboxState)
            }
        },
        aria_checked() {
            return this.model_value_adapter === ECheckboxState.STATE_INDETERMINATE ? 'mixed' : String(Boolean(this.model_value_adapter))
        },
        state_icon(): string | null {
            return ({
                [ECheckboxState.STATE_INDETERMINATE]: 'indeterminate-line',
                [ECheckboxState.STATE_UNCHECKED]: null,
                [ECheckboxState.STATE_CHECKED]: 'check'
            }[this.model_value_adapter])
        }
    }
})
</script>

<style lang="sass" scoped src="./v-checkbox.sass"></style>
<style lang="sass">
.checkbox-scale-enter-active,
.checkbox-scale-leave-active
  --v-text-transition-prop: transform


.checkbox-scale-enter
  &-from
    transform: scale(0)

  &-to
    transform: scale(1)

.checkbox-scale-leave
  &-from
    transform: scale(1)

  &-to
    transform: scale(0)
</style>
