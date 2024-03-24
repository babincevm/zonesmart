import { DIContainer } from '@/utils/DI/DIContainer';
import { DISymbols } from '@/utils/DI/symbols';
import { AxiosInstance } from 'axios';

import { IServiceApi } from '@services/api/types';

import { Auth } from '@services/api/Auth/Auth';
import axiosInstance from '@services/axios';

export class CompositionRoot {
  public static Init() {
    this.InitAPI();
  }

  private static InitAPI() {
    DIContainer.Bind(DISymbols.Request).asSingle<AxiosInstance>(axiosInstance);
    DIContainer.Bind(DISymbols.API).asSingle<IServiceApi>({
      Auth: new Auth()
    });
  }
}
