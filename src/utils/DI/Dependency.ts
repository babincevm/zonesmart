import { Constructable } from '@/utils/DI/types'

export class Dependency {
  private transientConstructor: Constructable<any> | null = null
  private singleInstance: object | null = null

  constructor() {
  }

  public asTransient<T>(constructable: Constructable<T>): this {
    this.transientConstructor = constructable
    return this
  }

  public asSingle<T extends object>(instance: T): this {
    this.singleInstance = instance
    return this
  }

  public Resolve<T>(): T {
    if (this.transientConstructor) {
      return new this.transientConstructor() as T
    }
    if (this.singleInstance) {
      return this.singleInstance as T
    }

    throw new Error('Тип сервиса не установлен')
  }

  public TryResolve<T>(): T | null {
    if (this.transientConstructor) {
      return new this.transientConstructor() as T
    }
    if (this.singleInstance) {
      return this.singleInstance as T
    }

    return null
  }
}
