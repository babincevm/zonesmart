/**
 * Если передано число или <code>number</code>-like строка, то будет возвращено это число с пикселями <br>
 * Если передана не <code>number</code>-like строка, будет возвращена эта строка. <br>
 * Если передан <code>undefined</code>, будет возвращено defaultValue (по дефолту <code>undefined</code>)
 */

export const pixelify = (
    maybeStringOrNumber: string | number | undefined,
    defaultValue: string | undefined = undefined
): string | undefined => {
    if (maybeStringOrNumber === undefined) {
        return defaultValue
    }
    if (typeof maybeStringOrNumber === 'number') {
        return `${maybeStringOrNumber}px`
    }
    if (isNaN(Number(maybeStringOrNumber))) {
        return maybeStringOrNumber
    }
    return `${maybeStringOrNumber}px`
}
