import { TSortOrder } from '@ui/v-sort/types'

export type TSortable = 'quantity' | 'price' | 'min_price' | 'max_price'

export type TFieldSort = `${TSortable}.${TSortOrder}`
