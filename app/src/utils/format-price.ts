export function formatPrice(price: number | string, format = false): string {
    const formatted = String(price).replace(/,/g, '');
    const peso = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
        notation: format ? 'standard' : 'compact',
    });
    return peso.format(Number(formatted));
}
