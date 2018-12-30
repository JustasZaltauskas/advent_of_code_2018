import {
    getBoxIdsLetterFrequencies
} from './AOC2';

test('getBoxIdsLetterFrequencies should multiply frequency of 2 letters and ' +
    '3 letters', () => {
        const x = ['aaaee', 'aaabbb', 'fabacaf'];
        expect(getBoxIdsLetterFrequencies(x)).toEqual(6);
    });

test('getBoxIdsLetterFrequencies should multiply frequency of 2 letters and ' +
    '3 letters', () => {
        const x = ['aaaee', 'aaabbb', 'fabacaf'];
        expect(getBoxIdsLetterFrequencies(x)).toEqual(6);
    });
