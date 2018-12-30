import { countBy, eq } from '../../utils/functional';
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
    const lettersCount = ids.map((id) => countBy(id)) as Array<object>;
    const lettersFilter = filterObjectsByValue(lettersCount);
    return lettersFilter(eq(2)).length * lettersFilter(eq(3)).length;
}

type TfilterObjectsByValue = (o: object[]) =>
    (predicate: (x: any) => boolean) =>
        any[];

export const filterObjectsByValue: TfilterObjectsByValue = (arr) =>
    (predicate) => arr.filter((x) => Object.values(x).filter(predicate).length);

console.log(getBoxIdsLetterFrequencies(ids));
