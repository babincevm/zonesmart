<template lang="pug">
v-skeleton(:loading="loading" width="480" height="40" v-if="total > 1")
  v-flex.v-pagination(width="max-content" row height="40" :justify="justify" is="ul" gap="4")
    li(v-if="+page !== 1")
      v-button.v-pagination__button.v-pagination__arrow-left(prepend="arrow" color="transparent" no-border text-preset="basic" @click="setPage(+page - 1)" :disabled="disabled")


    // Если не нужно скрывать элементы слева и справа, выводим в цикле страницы
    template(v-if="!should_collapse")
      li(v-for="number in Number(total)" :key="number")
        v-button.v-pagination__button(:color="+page === number ? 'gray' : 'transparent'" no-border text-preset="basic" @click="setPageNotCollapsed(number)" :disabled="disabled") {{number}}


    template(v-else)
      // Выводим 1 если это не 1 страница
      li(v-if="+page !== 1")
        v-button.v-pagination__button(color="transparent" no-border text-preset="basic" @click="setPage(1)" :disabled="disabled") 1

      //// Выводим 2 если страница пагинации 5 (т.к. расчитываю только по 2 страницы слева/справа, а если не выводить 3 точки, то нужно 3 странциы)
      //li(v-if="+page === 5")
      //  v-button.v-pagination__button(color="transparent" no-border text-preset="basic" @click="setPage(2)" :disabled="disabled") 2

      li(v-if="should_collapse_left")
        v-button.v-pagination__button(color="transparent" no-border text-preset="basic" @click="setLeftHalf" :disabled="disabled") ...

      // Страницы ДО текущей
      li(v-for="number in Number(visible_buttons_amount_left)" :key="+page - visible_buttons_amount_left + number - 1")
        v-button.v-pagination__button(color="transparent" no-border text-preset="basic" @click="setPage(+page - visible_buttons_amount_left + number - 1)" :disabled="disabled") {{+page - visible_buttons_amount_left + number - 1}}

      // Текущая страница
      li
        v-button.v-pagination__button(color="gray" no-border text-preset="basic" :disabled="disabled") {{page}}

      // Страницы ПОСЛЕ текущей
      li(v-for="number in Number(visible_buttons_amount_right)" :key="+page + number" @click="setPage(+page + number)")
        v-button.v-pagination__button(color="transparent" no-border text-preset="basic" :disabled="disabled") {{+page + number}}

      li(v-if="should_collapse_right")
        v-button.v-pagination__button(color="transparent" no-border text-preset="basic" @click="setRightHalf" :disabled="disabled") ...


      // Если текущая страница не последняя
      template(v-if="+total !== +page")
        // Выводим предпоследнюю страницу (т.к. расчитываю только по 2 страницы слева/справа, а если не выводить 3 точки, то нужно 3 странциы)
        li(v-if="should_collapse && +page === total - 4" @click="setPage(total)")
          v-button.v-pagination__button(color="transparent" no-border text-preset="basic" :disabled="disabled") {{total - 1}}
        li(@click="setPage(total)")
          v-button.v-pagination__button(color="transparent" no-border text-preset="basic" :disabled="disabled") {{total}}





    li(v-if="+page !== +total")
      v-button.v-pagination__button.v-pagination__arrow-right(prepend="arrow" color="transparent" no-border text-preset="basic" @click="setPage(+page + 1)" :disabled="disabled")

</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType } from 'vue'

import { clamp } from '@helpers/math'

import VFlex from '@ui/v-flex/v-flex.vue'
import VButton from '@ui/v-button/v-button.vue'
import VSkeleton from '@ui/v-skeleton/v-skeleton.vue'

export default defineComponent({
    components: { VSkeleton, VButton, VFlex },
    emits: ['update:modelValue'],
    props: {
        modelValue: {
            type: Number,
            default: 0,
            validator: (value: number, props: any) => Number(props.total) >= value
        },
        total: {
            type: Number,
            default: 0
        },
        justify: {
            type: String as PropType<string | CSSProperties['justifyContent']>,
            default: 'flex-end'
        },
        disabled: Boolean,
        loading: Boolean
    },
    computed: {
        page(): number {
            return clamp(1, this.$props.total, this.$props.modelValue)
        },
        should_collapse() {
            return this.total > 7
        },
        should_collapse_left() {
            return this.should_collapse && this.page > 5
        },
        should_collapse_right() {
            return this.should_collapse && this.page < this.$props.total - 4
        },
        visible_buttons_amount_left(): number {
            return clamp(0, 2, this.page - 2)
        },
        visible_buttons_amount_right(): number {
            return clamp(0, 2, this.$props.total - this.page - 1)
        }
    },
    methods: {
        setPage(page: number) {
            this.$emit('update:modelValue', page)
        },
        setLeftHalf() {
            this.setPage(Math.ceil((this.page - 1) / 2))
        },
        setPageNotCollapsed(page: number) {
            if (page === this.page) {
                return
            }
            this.setPage(page)
        },
        setRightHalf() {
            this.setPage(this.page + Math.ceil((this.$props.total - this.page) / 2))
        }
    }
})
</script>

<style lang="sass" scoped src="./v-pagination.sass"></style>
