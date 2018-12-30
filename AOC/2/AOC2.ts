import { countBy, compose } from '../../functional';
const fs = require('fs');
const path = require('path');
/*
Rules:
 1. Count repeating letters in ID.
 2. Count how many ids have 2 and 3 repeating letters.
    sum(x) = number of ids that have x repeating letters.
 3. Get checksum = sum2 * sum3.
*/

const ids: string[] = fs
    .readFileSync(path.resolve(__dirname, 'input.ts'), 'utf8')
    .split('\n');

export const getBoxIdsLetterFrequencies = (ids: string[]) => {
    const lettersCount = ids.map((id) => countBy(id));
    return lettersCount.filter((o = {}) => Object.values(o).filter(x => x === 2).length).length *
        lettersCount.filter((o = {}) => Object.values(o).filter(x => x === 3).length).length
}

type TfilterObjectValues = <T>(o: T, predicate: (x: keyof T) => boolean) => any[];
export const filterObjectValues: TfilterObjectValues = (o, predicate) =>
    Object.values(o).filter(predicate);
