import { notImplementedError } from '../errors';

interface AnyObject {
    [k: string]: any;
}

export const compose = (...fns: any[]) => (x: any) =>
    fns.reduce((y, fn) => fn(y), x);

type TcountBy = <T>(collection: Array<T> | Object, iteratee?: (x: T) => any) =>
    object | undefined;
/**
 * 1. Iterate through collection, apply iteratee to each element.
 * 2. Put iteratee result to accumulator and increase counter to 1 or assign 1.
 * @param {Array} collection
 * @param {Function} [iteratee=identity]
 * @returns {Object}
 * 'aabb' => { a: 2, b: 2 }
 */
export const countBy: TcountBy = (collection, iteratee = identity) => {
    if (Array.isArray(collection)) {
        return arrayAggregator(collection, incrementBy1, iteratee);
    } else if (typeof collection === 'string') {
        return arrayAggregator([...collection], incrementBy1, iteratee);
    } else {
        notImplementedError();
    }
};

type TarrayAggregator = <T>(
    arr: T[], setter: Tsetter, iteratee: Function, accumulator?: Object
) => Object;

export const arrayAggregator: TarrayAggregator = (
    arr, setter, iteratee, accumulator = {}
) => Object.entries(arr)
    .reduce((acc, [_, v]) => setter(acc, iteratee(v), v), accumulator);

type numbersObject = {
    [key: string]: number;
}

export const increment = (
    accumulator: numbersObject, k: string, v: number = 1
): numbersObject =>
    setter(accumulator, k, accumulator[k] ? accumulator[k] + v : v);

export const incrementBy1 = (
    accumulator: numbersObject, k: string
): numbersObject => increment(accumulator, k, 1);

type Tsetter = (o: AnyObject, k: any, v: any) => AnyObject;
export const setter: Tsetter = (o, k, v) => ({ ...o, [k]: v });

export const identity = (x: any) => x;

export const eq = (x: any) => (y: any) => x === y;
