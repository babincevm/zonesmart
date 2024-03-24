<template lang="pug">
thead
  tr.v-products-table__header-titles
    th(width="35px" scope="col")
      v-flex.v-products-table__checkbox-cell(justify="center" align="center" width="25" height="25" )
        v-checkbox
    v-text(is="th" preset="basic" color="gray" width="70px" scope="col" align="left" ) Фото
    v-text(is="th" preset="basic" color="gray" width="152px" scope="col" align="left" ) Артикул продавца
    v-text.v-products-table__header-titles--double-left(is="th" preset="basic" color="gray" width="155px" scope="col" align="left" ) Бренд
    v-text(is="th" preset="basic" color="gray" width="380px" scope="col" align="left" ) Название
    th(width="136px" scope="col")
      v-sort Остаток, шт.
    th(width="145px" scope="col")
      v-sort Текущая цена
    th(scope="col")
      v-sort Минимальная цена
    th(scope="col")
      v-sort Максимальная цена
    v-text(is="th" preset="basic" color="gray" width="67px") Удалить

  tr.v-products-table__header-actions
    td.v-products-table__header-actions-cell(colspan="5")
      v-flex(row gap="10" justify="flex-start" align="center" )
        v-text(nowrap) Выбрано 2 из 4
        v-button.v-products-table__header-actions-button(prepend="delete-bold" color="gray" icon-size="15" ) Удалить выделенные

    v-text.v-products-table__header-actions-cell(is="td" colspan="2" preset="basic" align="right" nowrap) Для всех выделенных

    td.v-products-table__header-actions-cell--small-padding
      v-flex.v-products-table__input-cell(justify="center" align="center" )
        v-input(placeholder="₽" v-model="min_price" :mask="money_mask" thin)

    td.v-products-table__header-actions-cell--small-padding
      v-flex.v-products-table__input-cell(justify="center" align="center" )
        v-input(placeholder="₽" v-model="max_price" :mask="money_mask" thin)

    td.v-products-table__header-actions-cell

</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { money_mask } from '@helpers/masks';

import VSort from '@ui/v-sort/v-sort.vue';
import VText from '@ui/v-text/v-text.vue';
import VFlex from '@ui/v-flex/v-flex.vue';
import VButton from '@ui/v-button/v-button.vue';
import VInput from '@ui/v-input/v-input.vue';
import VCheckbox from '@ui/v-checkbox/v-checkbox.vue';

export default defineComponent({
  name: 'VProductsTableHeader',
  components: { VCheckbox, VInput, VButton, VFlex, VText, VSort },
  data() {
    return {
      money_mask,
      min_price: '',
      max_price: ''
    };
  }
});
</script>

<style lang="sass" scoped src="./v-products-table.sass"></style>
