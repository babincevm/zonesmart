import { IMask } from '@ui/v-input/types'

import { formatRub } from '@helpers/currency'

export const money_mask: IMask = {
    mask: '#',
    tokens: {
        '#': {
            pattern: /\d/,
            multiple: true
        }
    },
    preProcess: (val: string) => val.replace(/\D/g, ''),
    postProcess: (val: string | undefined) => {
        if (!val) {
            return ''
        }

        const sub = 2 - (val.includes(',') ? val.length - val.indexOf(',') : 0)

        return `${formatRub(val).slice(0, sub ? -sub : undefined)} ₽`
    }
}
