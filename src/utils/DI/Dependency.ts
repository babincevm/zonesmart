import { Constructable } from '@/utils/DI/types'

export class Dependency {
    private transient_constructor: Constructable<any> | null = null
    private single_instance: object | null = null

    constructor() {
    }

    public asTransient<T>(constructable: Constructable<T>): this {
        this.transient_constructor = constructable
        return this
    }

    public asSingle<T extends object>(instance: T): this {
        this.single_instance = instance
        return this
    }

    public Resolve<T>(): T {
        if (this.transient_constructor) {
            return new this.transient_constructor() as T
        }
        if (this.single_instance) {
            return this.single_instance as T
        }

        throw new Error('Тип сервиса не установлен')
    }

    public TryResolve<T>(): T | null {
        if (this.transient_constructor) {
            return new this.transient_constructor() as T
        }
        if (this.single_instance) {
            return this.single_instance as T
        }

        return null
    }
}
