function extractNumbers(string) {
    const numberRegex = /\d+/g;

    if (string.includes(',')) {
        const numbers = string.match(numberRegex);
        return numbers ? numbers.join('') : '';
    } else {
        return string;
    }
}

export function formatPrice(price, format = false) {
    let formatted = String(price);
    const peso = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',
        notation: format ? 'standard' : 'compact'
    });
    return peso.format(formatted.replace(/,/g, ''));
}
