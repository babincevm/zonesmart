import { IProduct } from '@services/api/Products/types'
import { IActionPayload, TStoreWithPagination } from '@store/types'

export enum EProductLoaders {
  LIST = 'products_list'
}

export interface IProductState {
  products: Map<IProduct['id'], IProduct>;
  changed_data: Map<IProduct['id'], TChangedProductData>;
  selected_products: Set<IProduct['id']>;
  total_amount: number;
  selected_products_max_price: number | undefined;
  selected_products_min_price: number | undefined;
}

export type TChangedProductData = Partial<Pick<IProduct, 'min_price' | 'max_price'>>
export type TFetchProductsPayload = IActionPayload<never, TStoreWithPagination>;

export interface ICommitProductChangesPayload {
  id: IProduct['id'];
  field: keyof TChangedProductData,
  value: TChangedProductData[keyof TChangedProductData],
}
