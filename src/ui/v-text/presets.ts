import { TResolutions } from '@/hooks/useResolution'

import VText from '@ui/v-text/v-text.vue'


export type TPresets =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'basic'
  | 'gray'
  | 'link'
  | 'caption'
  | 'link-gray'
  ;

type TTextProps = Omit<InstanceType<typeof VText>['$props'], 'preset'>

const presets = new Map<TPresets, Partial<Record<TResolutions | 'shared', TTextProps | undefined>>>()

presets.set('h1', {
    shared: {
        is: 'h1',
        size: 42,
        weight: 600,
        lineHeight: 42,
        color: 'black'
    }
})
presets.set('h2', {
    shared: {
        is: 'h2',
        size: 28,
        weight: 600,
        lineHeight: 28,
        color: 'black'
    }
})
presets.set('h3', {
    shared: {
        is: 'h2',
        size: 20,
        weight: 600,
        lineHeight: 26,
        color: 'black'
    }
})
presets.set('basic', {
    shared: {
        size: 15,
        weight: 400,
        lineHeight: 25,
        color: 'black'
    }
})
presets.set('gray', {
    shared: {
        size: 16,
        weight: 400,
        lineHeight: 25,
        color: 'gray'
    }
})
presets.set('link', {
    shared: {
        size: 15,
        weight: 400,
        lineHeight: 25,
        color: 'green'
    }
})
presets.set('caption', {
    shared: {
        size: 12,
        weight: 400,
        lineHeight: 16,
        color: 'gray'
    }
})
presets.set('link-gray', {
    shared: {
        size: 15,
        weight: 400,
        lineHeight: 25,
        color: 'dark-blue'
    }
})
export default presets
