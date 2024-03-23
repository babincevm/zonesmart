import { IMask } from '@ui/v-input/types'

export const moneyMask: IMask = {
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

        const sub = 5 - (val.includes(',') ? val.length - val.indexOf(',') : 0)

        return `${Intl.NumberFormat('ru', {
            style: 'currency',
            currency: 'RUB'
        }).format(Number(val)).slice(0, sub ? -sub : undefined)} ₽`
    }
}
