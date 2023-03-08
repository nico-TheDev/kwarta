export function formatPrice(price) {
    const peso = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
        notation: 'compact'
    });

    return peso.format(price);
}
