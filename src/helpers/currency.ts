export const formatRub = (price: string | number): string => {
    const numPrice = Number(price)
    if (isNaN(numPrice)) {
        return ''
    }

    return Intl.NumberFormat('ru', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
    }).format(Number(numPrice))
}
