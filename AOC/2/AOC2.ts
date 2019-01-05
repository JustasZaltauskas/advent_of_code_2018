import { countBy, compose, groupBy, eq, remove } from '../../utils/functional';
import { readInput } from '../../utils/IO';
const path = require('path');
/*
Rules:
 1. Count repeating letters in ID.
 2. Count how many ids have 2 and 3 repeating letters.
    sum(x) = number of ids that have x repeating letters.
 3. Get checksum = sum2 * sum3.
*/

const ids: string[] = readInput(path.resolve(__dirname, 'input.ts'));

export const getBoxIdsLetterFrequencies = (ids: string[]) => {
    const lettersCount = ids.map((id) => countBy(id)) as Array<object>;
    const lettersFilter = filterObjectsByValue(lettersCount);
    return lettersFilter(eq(2)).length * lettersFilter(eq(3)).length;
}

export const commonLettersBetweenBoxes = (ids: string[]) => {
    for (let i = 0; i < ids.length; i++) {
        const id = ids[i];

        for (let j = i + 1; j < ids.length; j++) {
            const id2 = ids[j];
            const commonLetters = stringDifference(id, id2);
            const isFound = stringDifference(id, id2) !== '';

            if (isFound) {
                return commonLetters;
            }
        }
    }

    return '';
}

export const commonLettersBetweenBoxes2 = (ids: string[]) => {
    for (let i = 0; i < ids.length; i++) {
        const groupedStrings = groupBy(ids.map((id) => remove(id, i)))!;
        const commonLetters = Object
            .entries(groupedStrings)
            .find(([_, v]) => v.length > 1);

        if (commonLetters && commonLetters.length) {
            return commonLetters[0];
        }
    }

    return null;
}

export const stringDifference = (
    s: string, s2: string, diff: number = 1
): string => {
    if (Math.abs(s.length - s2.length) <= diff) {
        let x = '';
        let i = 0;

        while (i < s.length && diff >= 0) {
            if (s[i] === s2[i]) {
                x += s[i];
            } else {
                diff--;
            }

            i++;
        }

        return diff >= 0 ? x : '';
    }

    return '';
}

type TfilterObjectsByValue = (o: object[]) =>
    (predicate: (x: any) => boolean) =>
        any[];

export const filterObjectsByValue: TfilterObjectsByValue = (arr) =>
    (predicate) => arr.filter((x) => Object.values(x).filter(predicate).length);
