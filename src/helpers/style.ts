/**
 * Если передано число или <code>number</code>-like строка, то будет возвращено это число с пикселями <br>
 * Если передана не <code>number</code>-like строка, будет возвращена эта строка. <br>
 * Если передан <code>undefined</code>, будет возвращено defaultValue (по дефолту <code>undefined</code>)
 */

export const pixelify = (
    maybe_string_or_number: string | number | undefined,
    default_value: string | undefined = undefined
): string | undefined => {
    if (maybe_string_or_number === undefined) {
        return default_value
    }
    if (typeof maybe_string_or_number === 'number') {
        return `${maybe_string_or_number}px`
    }
    if (isNaN(Number(maybe_string_or_number))) {
        return maybe_string_or_number
    }
    return `${maybe_string_or_number}px`
}

