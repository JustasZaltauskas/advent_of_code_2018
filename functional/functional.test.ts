import {
    countBy,
    setter,
    increment,
} from './functional';
import { notImplementedError } from '../errors';

test('countBy should count number of times result was returned by ' +
    'iteratee', () => {
        expect(countBy([1, 1.4, 2, 3], Math.floor)).toEqual({
            1: 2,
            2: 1,
            3: 1
        })
    }
);

test('countBy should throw error if collection is object', () => {
    expect(() => { countBy({ a: 1, b: 1, c: 1 }, Math.floor) }).toThrow(Error);
});

test('notImplementedError should throw and error', () => {
    expect(notImplementedError).toThrow(Error);
});

test('setter should return an augmented object with key and value', () => {
    expect(setter({}, 'a', 1)).toHaveProperty('a', 1);
});

test('increment should increment object key by 1', () => {
    expect(increment({ a: 1 }, 'a')).toHaveProperty('a', 2);
});

test('increment should set key to 1 if key does not exist', () => {
    expect(increment({}, 'a')).toHaveProperty('a', 1);
});
