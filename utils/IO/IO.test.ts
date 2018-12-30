import { readInput } from './index';
const path = require('path');

test('readInput should return content array from input file', () => {
    expect(readInput(path.resolve(__dirname, './mock/input'))).toEqual(['test']);
});
