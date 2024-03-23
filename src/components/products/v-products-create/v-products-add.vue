<template lang="pug">
v-flex.v-products-add(column gap="4" )
  v-flex(
    is="form"
    row
    align="flex-end"
    justify="flex-start"
    gap="20"
    @submit.prevent="addProduct"
  )
    v-input.v-products-add__input(label="Добавление товаров" placeholder="Введите артикул продавца, артикул WB или ссылку на товар" )
    v-button(type="submit" ) Добавить

  v-flex(row gap="2" align="flex-start" justify="flex-start" wrap width="100%" )
    v-text(preset="caption" nowrap) Например ваши товары:
    v-flex(row gap="2" wrap width="max-content" )
      v-text.v-products-add__fast-input(is="button" preset="caption" decoration="dashed underline" ) 119203059,
      v-text.v-products-add__fast-input(is="button" preset="caption" decoration="dashed underline" ) 124366343,
      v-text.v-products-add__fast-input(is="button" preset="caption" decoration="dashed underline" ) 59801844
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import VFlex from '@ui/v-flex/v-flex.vue'
import VInput from '@ui/v-input/v-input.vue'
import VButton from '@ui/v-button/v-button.vue'
import VText from '@ui/v-text/v-text.vue'

export default defineComponent({
    name: 'VProductsAdd',
    components: { VText, VButton, VInput, VFlex },
    methods: {
        addProduct() {
        }
    }
})
</script>

<style lang="sass" scoped src="./v-products-add.sass"></style>

