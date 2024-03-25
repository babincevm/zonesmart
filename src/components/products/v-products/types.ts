import { IProduct } from '@services/api/Products/types'
import { IChangedProductData } from '@components/products/v-products-table/types'

export type TChangedDataRecord = Record<IProduct['id'], IChangedProductData>
