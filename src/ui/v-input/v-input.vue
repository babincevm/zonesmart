<template lang="pug">
v-flex(
  column
  :class="classes"
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

  v-skeleton.v-input__skeleton(:loading="loading" inherit-slot-class)
    .v-input__container
      v-icon.v-input__icon.v-input__prepend(
        v-if="prepend"
        :name="prepend"
        :button="prependAction"
        @click="$emit('prepend-click')"
        color="gray"
        :hover-color="prependAction ? gray_color : undefined"
        :active-color="prependAction ? gray_color : undefined"
      )
      input(
        v-model="model_proxy"
        v-mask:[mask_options]="masked_value"
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
        @submit="$emit('submit')"
      )

      v-icon.v-input__icon.v-input__append(
        v-if="append"
        :name="append"
        :button="appendAction"
        @click="$emit('append-click')"
        color="gray"
        :hover-color="appendAction ? gray_color : undefined"
        :active-color="appendAction ? gray_color : undefined"
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
import { defineComponent, InputHTMLAttributes, PropType } from 'vue';
import { MaskType, vMaska } from 'maska';

import { IMask, isIMask, TColor, TInputmode, TType } from '@ui/v-input/types';

import { TPresets } from '@ui/v-text/presets';
import VIcon from '@ui/v-icon/v-icon.vue';
import VText from '@ui/v-text/v-text.vue';
import VFlex from '@ui/v-flex/v-flex.vue';
import VFragment from '@ui/v-fragment/v-fragment.vue';
import VSkeleton from '@ui/v-skeleton/v-skeleton.vue';

export default defineComponent({
  name: 'VInput',
  components: { VSkeleton, VFlex, VText, VIcon, VFragment },
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
    thin: Boolean,
    disableInitialSuggestions: Boolean
  },
  data() {
    return {
      is_focused: false,
      is_readonly: false,
      masked_value: {
        masked: '',
        unmasked: '',
        completed: false
      },
      gray_color: 'gray' as const
    };
  },
  computed: {
    computed_inputmode(): TInputmode | undefined {
      if (this.$props.inputmode) {
        return this.$props.inputmode;
      }
      if (this.$props.noInputmode) {
        return undefined;
      }
      return (
        (
          {
            number: 'numeric',
            email: 'email',
            search: 'search',
            tel: 'tel',
            url: 'url',
            text: 'text',
            password: 'text'
          } as Record<TType, TInputmode>
        )[this.$props.type] ?? 'text'
      );
    },
    mask_options(): IMask | undefined {
      if (!this.$props.mask) {
        return undefined;
      }

      if (isIMask(this.$props.mask)) {
        return this.$props.mask;
      }
      return {
        mask: this.$props.mask as MaskType
      };
    },
    model_proxy: {
      get() {
        return this.$props.modelValue ?? '';
      },
      set(v: string) {
        this.$emit('update:modelValue', v);
      }
    },
    classes() {
      return [
        'v-input',
        {
          'v-input--with-prepend': this.$props.prepend,
          'v-input--with-append': this.$props.append,
          'v-input--thin': this.$props.thin
        }
      ];
    }
  },
  methods: {
    focus() {
      (this.$refs.inputEl as HTMLInputElement).focus();
    }
  },
  beforeMount() {
    if (!this.$props.disableInitialSuggestions) {
      return;
    }
    this.is_readonly = true;
    setTimeout(() => {
      this.is_readonly = false;
    }, 200);
  },
  expose: ['focus', 'masked_value']
});
</script>

<style lang="sass" scoped src="./v-input.sass"></style>
