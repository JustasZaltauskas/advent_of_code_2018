import { countBy, groupBy } from './index';

describe('countBy', () => {
    test('should count number of times result was returned by ' +
        'iteratee', () => {
            expect(countBy([1, 1.4, 2, 3], Math.floor)).toEqual({
                1: 2,
                2: 1,
                3: 1
            })
        }
    );

    test('should count each string symbol', () => {
        expect(countBy('aabb')).toEqual({
            a: 2,
            b: 2
        });
    });
});

describe('groupBy', () => {
    test('should group numbers array by return of Math.floor', () => {
        expect(groupBy([1.1, 1.2, 2], Math.floor)).toEqual({
            1: [1.1, 1.2],
            2: [2]
        });
    });

    test('should group characters of string', () => {
        expect(groupBy('aba')).toEqual({
            a: ['a', 'a'],
            b: ['b']
        });
    });
});
