export const validation = {
    text: {
        fn: function (arr) {
            return !!arr && arr.length > 0
        },
        message: 'must be at least 1 character',
    },
    number: {
        fn: function (value) {
            return Number(value) > 0
        },
        message: 'must be a valid number',
    },
    phone: {
        fn: function (_0x5d4ff0) {
            return (
                !!_0x5d4ff0 &&
                10 ===
                _0x5d4ff0
                    .toString()
                    .replace(/[^0-9]+/g, '')
                    .substring(0, 10).length
            )
        },
        message: 'must be 10 numbers',
    }
}