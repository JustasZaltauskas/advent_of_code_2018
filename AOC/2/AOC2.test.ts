import {
    filterObjectsByValue,
} from './AOC2';

const eq = (x: number) => (y: number) => x === y;

test('filterObjectsByValue should return array with found numbers', () => {
    const letterFrequencies = [{
        a: 3,
        e: 2
    }];
    expect(filterObjectsByValue(letterFrequencies)(eq(2)).length).toEqual(1);
});
