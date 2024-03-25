<template lang="pug">
v-flex.v-header(is="header" justify="space-end" align="center" width="100%" )
  v-flex(gap="30" justify="flex-end" align="center" row)
    v-text(as="button" @click="logout") Logout
    v-icon(name="notifications" size="25" button color="gray" hover-color="gray" active-color="gray" )
    v-dropdown(:options="user_options" v-model="selected_user")

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

import { IOption } from '@ui/v-dropdown/types'

import VFlex from '@ui/v-flex/v-flex.vue'
import VIcon from '@ui/v-icon/v-icon.vue'
import VText from '@ui/v-text/v-text.vue'
import VDropdown from '@ui/v-dropdown/v-dropdown.vue'

export default defineComponent({
    name: 'VHeader',
    components: { VDropdown, VText, VIcon, VFlex },
    data() {
        return {
            user_options: [{ id: 'user1', value: 'user@zonesmart.ru' }] as IOption[],
            selected_user: 'user1'
        }
    },
    methods: {
        ...mapActions('auth', ['logout'])
    }
})
</script>

<style lang="sass" scoped src="./v-header.sass"></style>
