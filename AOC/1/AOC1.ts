import { readInput } from '../../utils/IO';
const path = require('path');

const numbers: number[] = readInput(path.resolve(__dirname, 'input'))
    .map(Number);

type TfrequencyCache = { [number: number]: boolean };
const findDuplicateFrequency = (
    numbers: number[],
    index = 0,
    cache: TfrequencyCache = {},
    frequency = 0
): number => {
    if (cache[frequency]) {
        return frequency;
    }

    return findDuplicateFrequency(
        numbers,
        index < numbers.length - 1 ? index + 1 : 0,
        { ...cache, [frequency]: true },
        frequency + numbers[index]
    );
}

const findDuplicate = (numbers: number[]) => {
    const cache: TfrequencyCache = {};
    let i = 0;
    let frequency = 0;

    while (!cache[frequency]) {
        cache[frequency] = true;
        frequency += numbers[i];
        i = i < numbers.length - 1 ? i + 1 : 0;
    }

    return frequency;
}
