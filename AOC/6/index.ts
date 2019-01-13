import { readInput } from '../../utils/IO';
import path from 'path';

// 342, 203
const input: Coord[] = readInput(path.resolve(__dirname, 'input'))
    .map((s: string) => s.split(',').map((x) => Number(x.trim())));

type Coord = [number, number];
const coordDistance = ([x, y]: Coord, [x1, y1]: Coord): number =>
    Math.abs(x - x1) + Math.abs(y - y1);

const isOnGridSide = (x: number, y: number, gridLen: number): boolean =>
    x === 0 || x === gridLen - 1 || y === 0 || y === gridLen - 1;

const getCoordGrid = (coords: Coord[]) => {
    return coords.reduce((grid: number[][], coord: Coord, i) => {
        const [x, y] = coord;
        grid[x] = grid[x] || [];
        return (grid[x][y] = i, grid);
    }, []);
};

const getGridSize = (coords: Coord[]) => {
    const [maxX, maxY] = coords.reduce((max, coord: Coord) => {
        const [x, y] = coord;
        max[0] = Math.max(max[0], x);
        max[1] = Math.max(max[1], y);
        return max;
    }, [0, 0] as number[]);

    return Math.max(maxX, maxY) + 1;
}

const largestNonInfiniteArea = (input: Coord[]): number => {
    const grid: any[][] = getCoordGrid(input);
    const gridSize = getGridSize(input);

    let areas = Array(input.length).fill(1);

    for (let x = 0; x < gridSize; x++) {
        grid[x] = grid[x] || [];

        for (let y = 0; y < gridSize; y++) {
            if (typeof grid[x][y] === 'undefined') {
                let distances: number[] = [];

                for (let coord = 0; coord < input.length; coord++) {
                    const [x1, y1] = input[coord];
                    // Distance between current spot and input coordinate
                    const distance = coordDistance([x, y], [x1, y1]);
                    distances[coord] = distance;
                }

                const minDistance = Math.min(...distances.filter(x => x));

                grid[x][y] = Object.keys(Array(distances.length).fill(0))
                    .filter((key, i) => distances[i] === minDistance);

                if (grid[x][y].length === 1) {
                    const i = Number(grid[x][y][0]);

                    if (isOnGridSide(x, y, gridSize)) {
                        areas[i] = Number.POSITIVE_INFINITY;
                    } else {
                        areas[i] += 1;
                    }
                }
            }
        }
    }

    const nonInfiniteAreas = areas
        .filter((a) => a !== Number.POSITIVE_INFINITY);
    return Math.max(...nonInfiniteAreas);
}


const findArea = (input: Coord[], treshold: number): number => {
    const grid: any[][] = getCoordGrid(input);
    const gridSize = getGridSize(input);
    let regions = 0;

    for (let x = 0; x < gridSize; x++) {
        grid[x] = grid[x] || [];

        for (let y = 0; y < gridSize; y++) {
            let totalDistance = 0;

            for (let coord = 0; coord < input.length; coord++) {
                const [x1, y1] = input[coord];
                // Distance between current spot and input coordinate
                const distance = coordDistance([x, y], [x1, y1]);
                totalDistance += distance;
            }

            if (totalDistance < treshold) {
                regions++;
            }

        }
    }

    return regions;
}

console.log(largestNonInfiniteArea(input));
console.log(findArea(input, 10000));
