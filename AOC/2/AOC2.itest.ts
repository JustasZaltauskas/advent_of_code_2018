import {
    getBoxIdsLetterFrequencies,
} from './AOC2';

test('should count object values of 2 and 3 and multiply them', () => {
    const x = ['aaaee', 'aaabbb', 'fabacaf'];
    // 3 * 3 = 9
    expect(getBoxIdsLetterFrequencies(x)).toEqual(6);
});
