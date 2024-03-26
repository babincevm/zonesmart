export const clamp = (min: number, max: number, val: number): number => {
    if (val < min) {
        return min
    }
    if (val > max) {
        return max
    }

    return val
}

export const clamp01 = (val: number) => clamp(0, 1, val)

export const inverseLerp = (a: number, b: number, v: number): number => {
    if (a === b) {
        return 0
    }
    return clamp01((v - a) / (b - a))
}
