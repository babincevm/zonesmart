import { IAuthAPI, IAuthData, IRefreshTokenResponse, ITokenResponse } from '@services/api/Auth/types'
import { IRequestOptions, IResponse } from '@services/api/Base/types'

import { Base } from '@services/api/Base/Base'

export class Auth extends Base implements IAuthAPI {
    constructor() {
        super()
    }

    async login(payload: IAuthData, options: IRequestOptions = {}) {
        return this.handle<ITokenResponse>(
            this.axios_instance.post('/user/jwt/create/', payload, {
                signal: options.signal
            })
        )
    }

    refresh(token: string, options: IRequestOptions = {}): Promise<IResponse<IRefreshTokenResponse>> {
        return this.handle<IRefreshTokenResponse>(
            this.axios_instance.post(
                '/user/jwt/refresh/',
                {
                    refresh: token
                },
                {
                    signal: options.signal
                }
            )
        )
    }
}
