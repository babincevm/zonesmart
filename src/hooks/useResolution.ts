import { useBreakpoints } from '@vueuse/core'
import { computed, ComputedRef } from 'vue'

export type TResolutions = 'mobile' | 'tablet' | 'desktop';
const breakpoints: Record<TResolutions, number> = {
    mobile: 0,
    tablet: 480,
    desktop: 768
}

export const useResolution = () => {
    const screenSize = useBreakpoints<TResolutions>(breakpoints)

    const activeBreakpoint = screenSize.active() as ComputedRef<TResolutions>

    const isMobile = computed(() => activeBreakpoint.value === 'mobile')

    return {
        activeBreakpoint,
        isMobile
    }
}
