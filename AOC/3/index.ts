import { readInput } from '../../utils/IO';
import path from 'path';

const input: string[] = readInput(path.resolve(__dirname, 'input'));

type Tclaims = number[][];
type TclaimsCoordinates = { [key: string]: number };

/*
    #id @ x, y: width, height
    #123 @ 3,2: 5x4
*/
const claims: Tclaims = input.map((s: string): number[] => {
    const [number, coordinates] = s.split('@');
    const id = Number(number.replace('#', ''));
    const [offset, size] = coordinates.split(':').map(x => x.trim());
    const [x, y] = offset.split(',');
    const [w, h] = size.split('x');

    return [id, x, y, w, h].map(Number);
});

export const getClaimsCoordinates = (claims: Tclaims) => {
    return claims.reduce((grid, [_, x, y, w, h]) => {
        for (let dx = 0; dx < w; dx++) {
            for (let dy = 0; dy < h; dy++) {
                const key = `${dx + x}, ${dy + y}`;
                grid[key] = (grid[key] || 0) + 1;
            }
        }

        return grid;
    }, {} as TclaimsCoordinates);
}

export const getOverlapingClaims = (claims: Tclaims): number => {
    const claimsCoordinates = getClaimsCoordinates(claims);
    return Object.values(claimsCoordinates).filter((x) => x > 1).length;
}

export const getNonOverlapingClaim = (claims: Tclaims) => {
    let nonOverlapingClaims = {} as { [key: string]: boolean };
    let grid = {} as { [key: string]: number };

    for (let i = 0; i < claims.length; i++) {
        const [id, x, y, w, h] = claims[i];

        nonOverlapingClaims[id] = true;

        for (let dx = x; dx < w + x; dx++) {
            for (let dy = y; dy < h + y; dy++) {
                const key = `${dx}, ${dy}`;

                if (grid[key]) {
                    nonOverlapingClaims[grid[key]] = false;
                    nonOverlapingClaims[id] = false;
                }

                grid[key] = id;
            }
        }
    };

    return Object.entries(nonOverlapingClaims).filter(([_, v]) => v === true)[0][0];
};
