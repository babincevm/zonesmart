import { IAuth, IAuthData, ITokenResponse } from '@services/api/Auth/types';
import { IRequestOptions, IResponse } from '@services/api/Base/types';

import { Base } from '@services/api/Base/Base';

export class Auth extends Base implements IAuth {
  constructor() {
    super();
  }

  async login(payload: IAuthData, options: IRequestOptions = {}) {
    return this.handle<ITokenResponse>(
      this.axios_instance.post('/user/jwt/create/', payload, {
        signal: options.signal
      })
    );
  }

  async refresh(token: string, options: IRequestOptions = {}): Promise<IResponse<unknown>> {
    return this.handle<unknown>(
      this.axios_instance.post(
        '/user/jwt/create/',
        {
          refresh: token
        },
        {
          signal: options.signal
        }
      )
    );
  }
}
