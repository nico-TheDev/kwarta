export function formatPrice(price, format = false) {
    const peso = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
        notation: format ? 'standard' : 'compact'
    });

    return peso.format(price);
}
