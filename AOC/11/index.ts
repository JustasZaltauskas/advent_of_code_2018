import { readInput } from '../../utils/IO';
import path from 'path';

/**
    For example, to find the power level of the fuel cell at 3,5 in a grid with serial number 8:

    The rack ID is 3 + 10 = 13.
    The power level starts at 13 * 5 = 65.
    Adding the serial number produces 65 + 8 = 73.
    Multiplying by the rack ID produces 73 * 13 = 949.
    The hundreds digit of 949 is 9.
    Subtracting 5 produces 9 - 5 = 4.
 */
type SerialNumber = number;
const serialNumber: SerialNumber = readInput(path.resolve(__dirname, 'input'))
    .map(Number)[0];
const gridSize = 300;

const getFloatingNumber = (x: number, n: number) => x / Math.pow(10, n - 1);
/*
    Get nth number from right
    Math.floor(1234 / 10) % 10 = 3
    Math.floor(1234 / 100) % 10 = 2
*/
export const getDigit = (x: number, n: number) => {
    return x >= 0 ?
        Math.floor(getFloatingNumber(x, n)) % 10 :
        Math.ceil(getFloatingNumber(x, n)) % 10;
}

const getPowerLevel = (n: SerialNumber, x: number, y: number) => {
    const rackId = x + 10;
    const hundrethNumber = getDigit((rackId * y + n) * rackId, 3);
    return hundrethNumber - 5;
}

const largestSquare = (grid: number[][], squareSize: number) => {
    let max = Number.MIN_VALUE;
    let coord = [0, 0];
    const gridBound = grid.length - (squareSize - 1);

    for (let y = 0; y < gridBound; y++) {
        for (let x = 0; x < gridBound; x++) {
            let fuel = 0;
            let topLeft = [x, y];

            for (let j = y; j < y + squareSize; j++) {
                for (let i = x; i < x + squareSize; i++) {
                    fuel += grid[i][j];
                }
            }
            if (fuel > max) {
                max = fuel;
                coord = topLeft;
            }
        }
    }

    return coord;
};

const grid: number[][] = [];
for (let x = 0; x < gridSize; x++) {
    grid[x] = grid[x] || [];
    for (let y = 0; y < gridSize; y++) {
        grid[x][y] = getPowerLevel(serialNumber, x, y);
    }
}

const topLeft = largestSquare(grid, 3);

console.log(topLeft);
 