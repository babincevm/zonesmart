<template lang="pug">
v-flex(
  column
  :class="['v-input', {\
    'v-input--with-prepend': prepend,\
    'v-input--with-append': append\
  }]"
  gap="8"
  align="flex-start"
)
  v-text(
    v-if="label"
    is="label"
    :preset="labelPreset"
    :for="$.uid.toString()"
    :color="disabled ? 'gray' : undefined"
  ) {{ label }}
    span(v-if="required" aria-label="required") *
  .v-input__container
    component(v-if="prepend" :is="prependAction ? 'button' : 'v-fragment'" @click="$emit('prepend-click')" :type="prependAction ? 'button' : undefined")
      v-icon.v-input__icon.v-input__prepend(
        :name="prepend"
        :size="25"
      )
    input(
      v-model="model_proxy"
      v-mask:[mask_options]="masked_proxy"
      ref="inputEl"
      :id="$.uid.toString()"
      :name="name"
      :disabled="disabled"
      :aria-invalid="error"
      :type="type"
      :inputmode="computed_inputmode"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      :required="required"
      :readonly="is_readonly"
      @focus="is_focused = true"
      @focusin="is_focused = true"
      @focusout="is_focused = false"
      @blur="is_focused = false"
      v-bind="inputAttrs"
      @keydown.enter.exact.prevent.stop="$emit('submit')"
      @submit="$emit('submit')")

    component(v-if="append" :is="appendAction ? 'button' : 'v-fragment'" @click="$emit('append-click')" :type="appendAction ? 'button' : undefined" )
      v-icon.v-input__icon.v-input__append(
        :name="append"
        :size="25"
      )

  v-text.v-input__error(
    v-if="error && errorText"
    size="16"
    line-height="21"
    ellipsis
    nowrap
  ) {{ errorText }}

</template>

<script lang="ts">
import { defineComponent, InputHTMLAttributes, PropType } from 'vue'
import { Mask, MaskType, vMaska } from 'maska'

import { IMask, isIMask, TColor, TInputmode, TModifiers, TType } from '@ui/v-input/types'

import { TPresets } from '@ui/v-text/presets'
import VIcon from '@ui/v-icon/v-icon.vue'
import VText from '@ui/v-text/v-text.vue'
import VFlex from '@ui/v-flex/v-flex.vue'
import VFragment from '@ui/v-fragment/v-fragment.vue'

export default defineComponent({
    name: 'VInput',
    components: { VFlex, VText, VIcon, VFragment },
    emits: ['update:modelValue', 'submit', 'append-click', 'prepend-click'],
    directives: { mask: vMaska },
    props: {
        modelValue: String,
        type: {
            type: String as PropType<TType>,
            default: 'text'
        },
        inputmode: String as PropType<TInputmode>,
        errorText: String,
        name: String,
        prepend: String,
        prependAction: Boolean,
        append: String,
        appendAction: Boolean,
        color: String as PropType<TColor>,
        placeholder: String,
        label: String,
        labelPreset: {
            type: String as PropType<TPresets>,
            default: 'caption'
        },
        autocomplete: String as PropType<AutoFillBase | 'one-time-code'>,
        inputAttrs: Object as PropType<InputHTMLAttributes>,
        mask: String as PropType<string | IMask>,
        disabled: Boolean,
        readonly: Boolean,
        loading: Boolean,
        error: Boolean,
        required: Boolean,
        noInputmode: Boolean,
        autofocus: Boolean,
        disableInitialSuggestions: Boolean,
        modelModifiers: {
            type: Object as PropType<TModifiers>,
            default: (otherProps: any) => {
                if (!otherProps.mask) {
                    return undefined
                }

                return {
                    unmasked: true
                }
            }
        }
    },
    watch: {
        modelValue(v) {
            if (!this.$props.mask || this.$props.modelModifiers?.masked) {
                return
            }

            const maskInst = new Mask(this.mask_options)
            this.masked_proxy.masked = maskInst.masked(v ?? '')
            this.masked_proxy.unmasked = maskInst.unmasked(v ?? '')
            this.masked_proxy.completed = maskInst.completed(v ?? '')
        }
    },
    data() {
        return {
            is_focused: false,
            is_readonly: false,
            masked_proxy: {
                masked: '',
                unmasked: '',
                completed: false
            }
        }
    },
    computed: {
        computed_inputmode(): TInputmode | undefined {
            if (this.$props.inputmode) {
                return this.$props.inputmode
            }
            if (this.$props.noInputmode) {
                return undefined
            }
            return ({
                number: 'numeric',
                email: 'email',
                search: 'search',
                tel: 'tel',
                url: 'url',
                text: 'text',
                password: 'text'
            } as Record<TType, TInputmode>)[this.$props.type] ?? 'text'
        },
        mask_options(): IMask | undefined {
            if (!this.$props.mask) {
                return undefined
            }

            if (isIMask(this.$props.mask)) {
                return this.$props.mask
            }
            return {
                mask: this.$props.mask as MaskType
            }
        },
        model_proxy: {
            get() {
                if (!this.$props.mask || this.$props.modelModifiers?.masked) {
                    return this.$props.modelValue ?? ''
                }

                return this.masked_proxy.masked
            },
            set(v: string) {
                if (!this.$props.mask || this.$props.modelModifiers?.masked) {
                    return this.$emit('update:modelValue', v)
                }
                this.$emit('update:modelValue', this.masked_proxy.unmasked)
            }
        }
    },
    methods: {
        focus() {
            (this.$refs.inputEl as HTMLInputElement).focus()
        }
    },
    beforeMount() {
        if (!this.$props.disableInitialSuggestions) {
            return
        }
        this.is_readonly = true
        setTimeout(() => {
            this.is_readonly = false
        }, 200)
    },
    expose: ['focus']
})
</script>

<style lang="sass" scoped src="./v-input.sass"></style>
