<template lang="pug">
router-view(v-slot="{Component}")
  transition(name="slide-right" :duration="duration" :style="{'--component-transition-duration': `${duration}ms`}")
    component(:is="Component")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import VFragment from './ui/v-fragment/v-fragment.vue';

export default defineComponent({
  name: 'App',
  components: { VFragment },
  data() {
    return {
      duration: 0
    };
  },
  mounted() {
    // Убираю анимацию при появлении компонента после загрузки страницы
    setTimeout(() => {
      this.duration = 450;
    }, 500);
  }
});
</script>
