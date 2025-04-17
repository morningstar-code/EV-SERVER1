export const formatNumber = (number: string | number) => {
    let formatted = 'n/a';
    try {
        let _0x2d7f9b = number.toString().replace('+1', ''),
            _0xdc8e0e = []
        _0x2d7f9b.length > 0 &&
            _0xdc8e0e.push('('.concat(_0x2d7f9b.substring(0, 3), ')'))
        _0x2d7f9b.length >= 4 &&
            _0xdc8e0e.push(' '.concat(_0x2d7f9b.substring(3, 6)))
        _0x2d7f9b.length >= 7 &&
            _0xdc8e0e.push('-'.concat(_0x2d7f9b.substring(6, 10)))
        formatted = _0xdc8e0e.join('')
    } catch (error) { }

    return formatted
}

export const formatCurrency = (amount: number) => {
    const format = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format;

    let formatted = 'n/a';

    try {
        formatted = format(Number(amount));
    } catch (error) { }

    return formatted;
}