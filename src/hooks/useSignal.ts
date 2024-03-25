import { ComponentOptionsMixin } from 'vue'

type TRequestID = string | number | null;

export const useSignal: ComponentOptionsMixin = {
    data() {
        return {
            controllers: new Map<TRequestID, AbortController>()
        }
    },
    methods: {
        requestStart(request_id: TRequestID = null): AbortSignal {
            this.controllers.set(request_id, new AbortController())
            const signal = this.controllers.get(request_id)?.signal
            if (!signal) {
                throw new Error('???')
            }
            return signal
        },
        requestEnd(request_id: TRequestID = null) {
            this.controllers.delete(request_id)
        },
        abort(request_id: TRequestID = null) {
            this.controllers.get(request_id)?.abort()
        },
        abortAll() {
            this.controllers.forEach((controller: AbortController) => {
                controller.abort()
            })
        }
    },
    unmounted() {
        this.abortAll()
    }
}
