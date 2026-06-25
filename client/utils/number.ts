

export const numberFormater = (value: number | null) => {
    if (!value) return;
    const formater = Intl.NumberFormat("en", {
        notation: 'compact',
        compactDisplay: 'short'
    })
    return formater.format(value)

}