import { readInput } from '../../utils/IO';
import path from 'path';

const input: string = readInput(path.resolve(__dirname, 'input'));

/*
    lowercase char code a-z = 97-122
    uppercase char code A-Z = 65-90
*/
const isUppercase = (code: number) => code >= 65 && code <= 90;
const isLowercase = (code: number) => code >= 97 && code <= 122;

const reactPolymer = (s: string): number => {
    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        const letterBefore = s[i - 1];

        if (typeof letterBefore === 'undefined') continue;

        if (letter.toLowerCase() === letterBefore.toLowerCase() &&
            (isLowercase(letterBefore.charCodeAt(0)) !==
                isLowercase(letter.charCodeAt(0)))
        ) {
            s = s.slice(0, i - 1) + s.slice(i + 1);
            i -= 2;
        }
    }

    return s.length;
};


const findShortestPolymer = (s: string): number => {
    const polymers: number[] = Array(26)
        .fill(0)
        .map((_, i) => {
            const letterToRemove = String.fromCharCode(i + 65);
            const polymer = s.replace(new RegExp(letterToRemove, 'gi'), '');
            return reactPolymer(polymer);
        });


    return Math.min(...polymers);
}

// console.log(scanPolymer(input[0]));
console.log(findShortestPolymer(input[0]));
