import { IProduct, IProductsAPI } from '@services/api/Products/types'
import { IRequestOptions, IResponse, TWithPagination } from '@services/api/Base/types'

import { Base } from '@services/api/Base/Base'

export class Products extends Base implements IProductsAPI {
    constructor() {
        super()
    }

    async fetchProducts(options: IRequestOptions<TWithPagination> = {}): Promise<IResponse<IProduct[]>> {
    // const token = store.state.auth.access

        return this.handle<IProduct[]>(
            this.axios_instance.get(
                'https://fakestoreapi.com/products',
                {
                    signal: options.signal,
                    // headers: {
                    //     'authorization': `JWT ${token}`
                    // },
                    params: {
                        limit: options.limit,
                        offset: options.offset
                    }
                }
            )
        )
    }

}
