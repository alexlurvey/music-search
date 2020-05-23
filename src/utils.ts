export function formatNumber (num: string | number): string {
    const parts = partition<string>(num.toString().split(''), 3, true);
    return parts.reduceRight((acc: string, x: string[]) => acc.length ? `${acc},${x.join('')}` : x.join(''), '');
}

function partition<T>(arr: T[], partitionVal = 1, reverse = false) {
    if (arguments.length === 2 && typeof(arguments[1]) === 'boolean') {
        reverse = arguments[1];
        partitionVal = 1;
    }

    let result: T[][] = [];

    if (reverse) {
        for (let i = arr.length; i > 0; i -= partitionVal) {
            const val = i - partitionVal < 0
                ? arr.slice(0, i)
                : arr.slice(i - partitionVal, i);
            result.push(val);
        }
        return result;
    }

    for (let i = 0; i < arr.length; i += partitionVal) {
        const val = i + partitionVal > arr.length
            ? arr.slice(i, arr.length)
            : arr.slice(i, i + partitionVal);
        result.push(val);
    }
    return result;
}