import {
    arraySetter,
    countBy,
    increment,
    setter,
    groupBy,
} from './index';
import * as collection from './index';
import { notImplementedError } from '../../errors';

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

describe('arraySetter', () => {
    test('should add array with given value if object key does not exist',
        () => {
            expect(arraySetter({}, 1, 1)).toEqual({
                1: [1]
            });
        })

    test('should add value to array if object key already exists',
        () => {
            const arr = [1];
            expect(arraySetter({ 1: [...arr] }, 1, 2)).toEqual({
                1: [...arr, 2]
            });
        })
});
