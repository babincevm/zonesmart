import { onUnmounted, ref } from 'vue'

type TRequestID = string | number | null;

interface IUseAbortSignal {
  requestStart: (requestId?: TRequestID) => AbortSignal;
  requestEnd: (requestId?: TRequestID) => void;
  abort: (requestId?: TRequestID) => void;
}

export const useSignal = (): IUseAbortSignal => {
    const controllers = ref(new Map<TRequestID, AbortController>())

    const requestStart = (requestId: TRequestID = null): AbortSignal => {
        controllers.value.set(requestId, new AbortController())
        const signal = controllers.value.get(requestId)?.signal
        if (!signal) {
            throw new Error('???')
        }
        return signal
    }

    const requestEnd = (requestId: TRequestID = null) => {
        controllers.value.delete(requestId)
    }

    const abort = (requestId: TRequestID = null) => {
        controllers.value.get(requestId)?.abort()
    }

    const abortAll = () => {
        controllers.value.forEach((controller: AbortController) => {
            controller.abort()
        })
    }

    onUnmounted(abortAll)

    return {
        requestStart,
        requestEnd,
        abort
    }
}
