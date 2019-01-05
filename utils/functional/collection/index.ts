import { notImplementedError } from '../../errors';
import { identity } from '../util';

interface IObject<T = any> {
    [k: string]: T;
}

type Taggregator = <T>(collection: Array<T> | Object, iteratee?: (x: T) => any) =>
    object | undefined;
/**
* 1. Iterate through collection, apply iteratee to each element.
* 2. Put iteratee result to accumulator and increase counter to 1 or assign 1.
* @param {Array} collection
* @param {Function} [iteratee=identity]
* @returns {Object}
* 'aabb' => { a: 2, b: 2 }
*/
export const countBy: Taggregator = (collection, iteratee = identity) => {
    if (Array.isArray(collection)) {
        return arrayAggregator(collection, incrementBy1, iteratee);
    } else if (typeof collection === 'string') {
        return arrayAggregator([...collection], incrementBy1, iteratee);
    } else {
        notImplementedError();
    }
};

export const groupBy: Taggregator = (collection, iteratee = identity) => {
    if (Array.isArray(collection)) {
        return arrayAggregator(collection, arraySetter, iteratee);
    } else if (typeof collection === 'string') {
        return arrayAggregator([...collection], arraySetter, iteratee);
    } else {
        notImplementedError();
    }
}

export const arraySetter: Tsetter = (o, k, v) => {
    if (!o[k]) {
        o[k] = [v];
    } else if (Array.isArray(o[k])) {
        o[k].push(v);
    }

    return o;
}

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


type Tsetter = (o: IObject, k: any, v: any) => IObject;
export const setter: Tsetter = (o, k, v) => ({ ...o, [k]: v });
