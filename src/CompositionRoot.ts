import { DIContainer } from '@/utils/DI/DIContainer'
import { DISymbols } from '@/utils/DI/symbols'

import { IServiceApi } from '@services/api/types'

export class CompositionRoot {
  public static Init() {
    this.InitAPI()
  }

  private static InitAPI() {
    DIContainer.Bind(DISymbols.API).asSingle<IServiceApi>({})
  }
}
