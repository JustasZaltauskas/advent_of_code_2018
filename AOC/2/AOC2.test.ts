import {
    filterObjectsByValue,
    stringDifference,
} from './AOC2';

const eq = (x: number) => (y: number) => x === y;

test('filterObjectsByValue should return array with found numbers', () => {
    const letterFrequencies = [{
        a: 3,
        e: 2
    }];
    expect(filterObjectsByValue(letterFrequencies)(eq(2)).length).toEqual(1);
});

describe('stringDifference', () => {
    test('("ab", "aa") => "a"', () => {
        expect(stringDifference('ab', 'aa')).toBe('a');
    });

    test('("abdd", "aadd") => "add"', () => {
        expect(stringDifference('abdd', 'aadd')).toBe('add');
    });

    test('("a", "b") => ""', () => {
        expect(stringDifference('a', 'b')).toBe('');
    });

    test('("aa", "bb") => ""', () => {
        expect(stringDifference('aa', 'bb')).toBe('');
    });

    test('("bbb", "bb") => "bb"', () => {
        expect(stringDifference('bbb', 'bb')).toBe('bb');
    });

    test('("bb", "bbdd") => ""', () => {
        expect(stringDifference('bb', 'bbdd')).toBe('');
    });
})
