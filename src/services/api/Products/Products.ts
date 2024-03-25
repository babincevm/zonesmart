import store from '@/store'

import { IProduct, IProductsAPI } from '@services/api/Products/types'
import { IPaginated, IRequestOptions, IResponse, TWithPagination } from '@services/api/Base/types'

import { Base } from '@services/api/Base/Base'

export class Products extends Base implements IProductsAPI {
    constructor() {
        super()
    }

    async fetchProducts(options: IRequestOptions<TWithPagination> = {}): Promise<IResponse<IPaginated<IProduct[]>>> {
        const token = store.state.auth.access

        return this.handle<IPaginated<IProduct[]>>(
            this.axios_instance.get(
                '/product/',
                {
                    signal: options.signal,
                    headers: {
                        'authorization': `JWT ${token}`
                    },
                    params: {
                        limit: options.limit,
                        offset: options.offset
                    }
                }
            )
        )
    }

}
