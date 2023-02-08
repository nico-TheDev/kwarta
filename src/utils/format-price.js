export function formatPrice(price) {
    const peso = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP'
    })

    return peso.format(price)
}
