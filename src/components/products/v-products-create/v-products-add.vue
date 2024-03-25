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
    v-input.v-products-add__input(label="Добавление товаров" v-model="addModel" placeholder="Введите артикул продавца, артикул WB или ссылку на товар" :loading="is_products_loading")
    v-button.v-products-add__button(type="submit" :loading="is_products_loading" :disabled="addModel.length === 0") Добавить

  v-flex(row gap="2" align="flex-start" justify="flex-start" wrap width="100%" )
    v-text(preset="caption" nowrap) Например ваши товары:
    v-skeleton(width="60" height="16" :loading="is_products_loading")
      v-flex(row gap="2" wrap width="max-content" )
        v-text.v-products-add__fast-input(is="button" preset="caption" decoration="dashed underline" @click="addModel = '119203059'" ) 119203059,
        v-text.v-products-add__fast-input(is="button" preset="caption" decoration="dashed underline" @click="addModel = '124366343'") 124366343,
        v-text.v-products-add__fast-input(is="button" preset="caption" decoration="dashed underline" @click="addModel = '59801844'") 59801844
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

import { EProductLoaders } from '@store/products/types'

import VFlex from '@ui/v-flex/v-flex.vue'
import VInput from '@ui/v-input/v-input.vue'
import VButton from '@ui/v-button/v-button.vue'
import VText from '@ui/v-text/v-text.vue'
import VSkeleton from '@ui/v-skeleton/v-skeleton.vue'

export default defineComponent({
    name: 'VProductsAdd',
    components: { VSkeleton, VText, VButton, VInput, VFlex },
    methods: {
        addProduct() {
        }
    },
    data() {
        return {
            addModel: ''
        }
    },
    computed: {
        ...mapGetters(['is_loading']),
        is_products_loading(): boolean {
            return (this.is_loading as (loaderId: string) => boolean)(EProductLoaders.LIST)
        }
    }
})
</script>

<style lang="sass" scoped src="./v-products-add.sass"></style>

