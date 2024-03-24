import { useBreakpoints } from '@vueuse/core';
import { computed, ComputedRef } from 'vue';

export type TResolutions = 'mobile' | 'tablet' | 'desktop';
const breakpoints: Record<TResolutions, number> = {
  mobile: 0,
  tablet: 480,
  desktop: 768
};

export const useResolution = () => {
  const screen_size = useBreakpoints<TResolutions>(breakpoints);

  const active_breakpoint = screen_size.active() as ComputedRef<TResolutions>;

  const is_mobile = computed(() => active_breakpoint.value === 'mobile');

  return {
    active_breakpoint,
    is_mobile
  };
};
