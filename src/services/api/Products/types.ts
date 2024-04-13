import { IRequestOptions, IResponse, TWithPagination } from '@services/api/Base/types'

export interface IProductsAPI {
  fetchProducts: (options?: IRequestOptions<TWithPagination>) => Promise<IResponse<IProduct[]>>;
}

// export interface IProduct {
//   id: string;
//   images?: string[] | null;
//   remote_id?: string | null;
//   brand_name?: string | null;
//   title?: string | null;
//   quantity?: number | null;
//   price?: number | null;
//   min_price?: number | null;
//   max_price?: number | null;
// }

export interface IRating {
  rate?: number | null;
  count?: number | null;
}

export interface IProduct {
  id: number;
  title?: string | null;
  price?: number | null;
  description?: string | null;
  category?: string | null;
  image?: string | null;
  rating?: IRating | null;
}
