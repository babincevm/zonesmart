<template lang="pug">
v-flex.v-header(is="header" justify="space-end" align="center" width="100%" )
  v-flex(gap="30" justify="flex-end" align="center" row)
    v-text(is="button" color="gray")
      v-icon(name="notifications" size="25" )
    v-dropdown(:options="userOptions" v-model="selectedUser")

</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
            userOptions: [{ id: 'user1', value: 'user@zonesmart.ru' }] as IOption[],
            selectedUser: 'user1'
        }
    }
})
</script>

<style lang="sass" scoped src="./v-header.sass"></style>
