import { readInput } from '../../utils/IO';
import path from 'path';

const input: string = readInput(path.resolve(__dirname, 'input'));

/*
    lowercase char code a-z = 97-122
    uppercase char code A-Z = 65-90
*/
const isUppercase = (code: number) => code >= 65 && code <= 90;
const isLowercase = (code: number) => code >= 97 && code <= 122;

const isPolymer = (x: string, y: string): boolean =>
    x.toLowerCase() === y.toLowerCase() &&
    isLowercase(y.charCodeAt(0)) !== isLowercase(x.charCodeAt(0));

const reactPolymer = (s: string): number => {
    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        const letterBefore = s[i - 1];

        if (typeof letterBefore === 'undefined') continue;

        if (isPolymer(letterBefore, letter)) {
            s = s.slice(0, i - 1) + s.slice(i + 1);
            i -= 2;
        }
    }

    return s.length;
};

const peek = <T>(stack: T[]): T => stack[stack.length - 1];
// Stack implementation
const reactPolymerv2 = (s: string): number => {
    const stack: string[] = [];

    s.split('').forEach((char) => {
        if (!stack.length || !isPolymer(peek(stack), char)) {
            stack.push(char);
        } else {
            stack.pop();
        }
    });

    return stack.length;
}

const findShortestPolymer = (s: string): number => {
    const polymers = Array(26)
        .fill(0)
        .map((_, i) => {
            const re = new RegExp(String.fromCharCode(i + 65), 'gi');
            const polymer = s.replace(re, '');
            return reactPolymer(polymer);
        });


    return Math.min(...polymers);
}

console.log(reactPolymer(input[0]));
// console.log(reactPolymerv2(input[0]));
// console.log(findShortestPolymer(input[0]));
