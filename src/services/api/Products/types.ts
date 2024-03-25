import { IPaginated, IRequestOptions, IResponse, TWithPagination } from '@services/api/Base/types'

export interface IProductsAPI {
  fetchProducts: (options?: IRequestOptions<TWithPagination>) => Promise<IResponse<IPaginated<IProduct[]>>>;
}

export interface IProduct {
  id: string;
  images?: string[] | null;
  remote_id?: string | null;
  brand_name?: string | null;
  title?: string | null;
  quantity?: number | null;
  price?: number | null;
  min_price?: number | null;
  max_price?: number | null;
}
