import { readInput } from '../../utils/IO';
import * as path from 'path';

const file = readInput(path.resolve(__dirname, 'input'))[0];
const input: number[] = file
    .split(' ')
    .map(Number)

const arrayIterator = (arr: number[]) => {
    let i = 0;
    return () => (++i, arr[i - 1]);
}

const nextInt = arrayIterator(input);

type Tree = [any[], number[]];

const readTree = (): Tree => {
    const nodes = nextInt();
    const md = nextInt();
    let children: Tree[] = [];
    let metaData: number[] = [];

    for (let i = 0; i < nodes; i++) {
        children.push(readTree());
    }

    for (let i = 0; i < md; i++) {
        metaData.push(nextInt());
    }

    return [children, metaData];
}

const root = readTree();

const getMetaData = (children: Tree[], metaData: number[]) => {
    let sum = 0;

    metaData.forEach(x => sum += x);
    children.forEach(x => sum += getMetaData(...x));

    return sum;
}

const metaData = getMetaData(root[0], root[1]);
console.log(metaData);
