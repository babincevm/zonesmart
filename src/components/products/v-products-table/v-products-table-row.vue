<template lang="pug">
tr.v-products-table__item
  td
    v-flex.v-products-table__checkbox-cell(justify="center" align="center" width="25" height="25" )
      v-checkbox

  td
    v-image.v-products-table__item-image(src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg")

  td
    button.v-products-table__item-art-number
      v-icon(name="link" color="gray" )
      v-text(preset="basic") 119203059

  v-text.v-products-table--double-left(is="td" ellipsis nowrap align="left" ) Long brand SmLong brand SmLong brand Sm
  v-text(is="td" ellipsis nowrap align="left" ) Смарт часы Smart Watch 8 женские мужские дСмарт часы Smart Watch 8 женские мужские д
  v-text(is="td" ellipsis nowrap align="left" ) 10
  v-text(is="td" ellipsis nowrap align="left" ) 1 464 ₽
  td
    v-flex.v-products-table__input-cell(justify="center" align="center" )
      v-input.v-products-table__item-input(v-model="min_price" :mask="money_mask" thin)

  td
    v-flex.v-products-table__input-cell(justify="center" align="center" )
      v-input.v-products-table__item-input(v-model="max_price" :mask="money_mask" thin)

  td
    v-icon(name="delete" color="gray" active-color="gray" hover-color="gray" button)
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { money_mask } from '@helpers/masks';

import VCheckbox from '@ui/v-checkbox/v-checkbox.vue';
import VFlex from '@ui/v-flex/v-flex.vue';
import VIcon from '@ui/v-icon/v-icon.vue';
import VText from '@ui/v-text/v-text.vue';
import VInput from '@ui/v-input/v-input.vue';
import VImage from '@ui/v-image/v-image.vue';

export default defineComponent({
  name: 'VProductsTableRow',
  components: { VImage, VInput, VText, VIcon, VFlex, VCheckbox },
  data() {
    return {
      min_price: '',
      max_price: '',
      money_mask
    };
  }
});
</script>

<style lang="sass" scoped src="./v-products-table.sass"></style>