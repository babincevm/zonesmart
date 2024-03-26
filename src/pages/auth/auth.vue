<template lang="pug">
auth-layout
  v-flex.auth__form(is="form" column width="430" height="min-content" paper gap="20" align="flex-start" @submit.prevent="authenticate")
    v-text(preset="h1" align="left") Вход
    v-flex(row gap="5" width="100%" justify="flex-start")
      v-text(preset="basic" ) Нет аккаунта?
      v-text(preset="link" as="a" href="#") Зарегистрироваться

    v-flex(column gap="20" width="100%" )
      v-input(v-model="email" label="Email" placeholder="yourmail@mail.ru" type="email" :loading="is_loading" @submit="$refs.passwordRef?.focus()" :error="Boolean(v$.email.$error)" :error-text="v$.email.$errors[0]?.$message")
      v-flex(column gap="10")
        v-input.auth__form-password(
          v-model="password"
          label="Пароль"
          placeholder="Ваш пароль"
          :type="is_password_visible ? 'text' : 'password'"
          :append="is_password_visible ? 'eye-crossed' : 'eye'"
          append-action
          @append-click="is_password_visible = !is_password_visible"
          :loading="is_loading"
          @submit="authenticate"
          ref="passwordRef"
        )
        v-text(as="router-link" preset="link" :to="{name: 'products'}") Забыли пароль?

    v-button.auth__form-submit(type="submit" :disabled="v$.$silentErrors.length > 0" :loading="is_loading") Войти

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthLayout from '@/layouts/auth-layout/auth-layout.vue'
import MainLayout from '@/layouts/main-layout/main-layout.vue'
import { useSignal } from '@/hooks/useSignal'
import { mapActions, mapState } from 'vuex'
import { RouterLink } from 'vue-router'
import useVuelidate from '@vuelidate/core'
import { email, required } from '@vuelidate/validators'
import { router } from '@/routes'

import { IActionPayload } from '@store/types'
import { IAuthData } from '@services/api/Auth/types'
import { EAuthLoaders } from '@store/auth/types'

import VFlex from '@ui/v-flex/v-flex.vue'
import VText from '@ui/v-text/v-text.vue'
import VInput from '@ui/v-input/v-input.vue'
import VIcon from '@ui/v-icon/v-icon.vue'
import VButton from '@ui/v-button/v-button.vue'

export default defineComponent({
    name: 'Auth',
    components: { VButton, VIcon, VInput, VText, MainLayout, VFlex, AuthLayout, RouterLink },
    mixins: [useSignal],
    setup: () => ({ v$: useVuelidate() }),
    data() {
        return {
            email: 'candid8@zonesmart.ru',
            password: '4815162342',
            is_password_visible: false,
            is_loading: false
        }
    },
    validations() {
        return {
            email: {
                required,
                email
            },
            password: {
                required
            }
        }
    },
    computed: {
        ...mapState('auth', ['access'])
    },
    methods: {
        ...mapActions('auth', ['login']),
        async authenticate() {
            if (!await this.v$.$validate()) {
                return
            }
            this.is_loading = true
            const login_result = await this.login({
                data: {
                    email: this.email,
                    password: this.password
                },
                options: {
                    signal: this.requestStart(EAuthLoaders.LOGIN)
                }
            } as IActionPayload<IAuthData>)
            this.requestEnd(EAuthLoaders.LOGIN)

            if (!login_result) {
                this.is_loading = false
                return
            }

            await router.push({
                name: 'products'
            })
        }
    }
})
</script>

<style lang="sass" scoped src="./auth.sass"></style>
