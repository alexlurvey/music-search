export function formatNumber (num: string | number): string {
    const n = num+'';
    const parts = partition(n, 3, true);
    return parts.reduceRight((acc, x) => acc.length ? `${acc},${x}` : x, '');
}

function partition(arr: string, partitionVal = 1, reverse = false) {
    if (arguments.length === 2 && typeof(arguments[1]) === 'boolean') {
        reverse = arguments[1];
        partitionVal = 1;
    }

    let result: string[] = [];

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