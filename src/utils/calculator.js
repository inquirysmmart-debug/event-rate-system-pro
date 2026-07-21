export function calculateLess(rate, percent) {

    const original = Number(rate);

    const lessAmount = (original * Number(percent)) / 100;

    const finalRate = Math.round(original - lessAmount);

    return {

        lessAmount: lessAmount.toFixed(2),

        finalRate

    };

}

export function calculateAdd(rate, percent) {

    const original = Number(rate);

    const addAmount = (original * Number(percent)) / 100;

    const finalRate = Math.round(original + addAmount);

    return {

        addAmount: addAmount.toFixed(2),

        finalRate

    };

}