import { readInput } from '../../utils/IO';
import * as path from 'path';

const test = '2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2';
const file = readInput(path.resolve(__dirname, 'input'))[0];
const input: number[] = file
    .split(' ')
    .map(Number);

const arrayIterator = (arr: number[]) => {
    let i = 0;
    return () => (++i, arr[i - 1]);
};

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
};

const getMetaData = (children: Tree[], metaData: number[]) => {
    let sum = 0;

    metaData.forEach(x => sum += x);
    children.forEach(x => sum += getMetaData(...x));

    return sum;
};

const getNodeValue = (children: Tree[], metaData: number[]) => {
    let nodeValue = 0;
    
    for (let i = 0; i < metaData.length; i++) {
        const md = metaData[i];
        const child = children[md - 1];

        if (!child) {
            continue;
        } else if (child[0].length === 0) {
            nodeValue += getMetaData(...child);
        } else {
            nodeValue += getNodeValue(...child);
        }
    }
    
    return nodeValue;
};

const root = readTree();
const metaData = getMetaData(root[0], root[1]);
const nodeValue = getNodeValue(root[0], root[1]);
console.log(nodeValue);
