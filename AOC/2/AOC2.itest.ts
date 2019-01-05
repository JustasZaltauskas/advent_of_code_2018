import {
    commonLettersBetweenBoxes,
    commonLettersBetweenBoxes2,
    getBoxIdsLetterFrequencies,
} from './AOC2';

test('should count object values of 2 and 3 and multiply them', () => {
    const x = ['aaaee', 'aaabbb', 'fabacaf'];
    // 3 * 3 = 9
    expect(getBoxIdsLetterFrequencies(x)).toEqual(6);
});

const commonLetters = [
    commonLettersBetweenBoxes,
    commonLettersBetweenBoxes2,
]

commonLetters.forEach((commonLettersFn, i) =>
    test(`commonLettersBetweenBoxes${i} should find common two strings that` +
        'are different by 1 letter', () => {
            expect(commonLettersFn(['aab', 'bba', 'aa'])).toEqual('aa');
        })
);
