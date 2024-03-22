import { Dependency } from '@/utils/DI/Dependency'

export class DIContainer {
  static instance: DIContainer = new this()

  private static dependenciesMap = new Map<Symbol, Dependency>()

  constructor() {
    return (<typeof DIContainer>this.constructor).instance
  }

  public static Bind(key: Symbol): Dependency {
    const dependency = new Dependency()
    this.dependenciesMap.set(key, dependency)
    return dependency
  }

  public static GetService<T = any>(key: Symbol): T {
    const dependency: Dependency | undefined = this.dependenciesMap.get(key)
    if (!dependency) {
      throw new Error('Сервис не зарегестрирован')
    }

    return dependency.Resolve<T>()
  }

  public static TryGetService<T = any>(key: Symbol): T | null {
    const dependency: Dependency | undefined = this.dependenciesMap.get(key)
    if (!dependency) {
      return null
    }

    return dependency.TryResolve<T>()
  }
}
