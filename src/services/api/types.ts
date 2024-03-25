import { IAuthAPI } from '@services/api/Auth/types'
import { IProductsAPI } from '@services/api/Products/types'

export interface IServiceApi {
  Auth: IAuthAPI;
  Products: IProductsAPI;
}
