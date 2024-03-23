<template lang="pug">
auth-layout
  v-flex.auth__form(is="form" column width="430" height="min-content" paper gap="20" align="flex-start" @submit.prevent)
    v-text(preset="h1" align="left") Вход
    v-flex(row gap="5" width="100%" justify="flex-start")
      v-text(preset="basic" ) Нет аккаунта?
      v-text(preset="link" is="a" href="#") Зарегистрироваться

    v-flex(column gap="20" width="100%" )
      v-input(v-model="email" label="Email" placeholder="yourmail@mail.ru" type="email")
      v-flex(column gap="10")
        v-input.auth__form-password(
          v-model="password"
          label="Пароль"
          placeholder="Ваш пароль"
          :type="isPasswordVisible ? 'text' : 'password'"
          append="eye"
          append-action
          @append-click="isPasswordVisible = !isPasswordVisible"
        )
        v-text(is="a" preset="link" href="#") Забыли пароль?

    v-button.auth__form-submit(type="submit" ) Войти

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthLayout from '@/layouts/auth-layout/auth-layout.vue'
import MainLayout from '@/layouts/main-layout/main-layout.vue'

import VFlex from '@ui/v-flex/v-flex.vue'
import VText from '@ui/v-text/v-text.vue'
import VInput from '@ui/v-input/v-input.vue'
import VIcon from '@ui/v-icon/v-icon.vue'
import VButton from '@ui/v-button/v-button.vue'

export default defineComponent({
    name: 'Auth',
    components: { VButton, VIcon, VInput, VText, MainLayout, VFlex, AuthLayout },
    data() {
        return {
            email: '',
            password: '',
            isPasswordVisible: false
        }
    }
})
</script>

<style lang="sass" scoped src="./auth.sass"></style>
