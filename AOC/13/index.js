/*
    When Arrived at intersection turn
    1. left
    2. straight
    3. right

    highest cart on the grid move first
*/
const fs = require('fs');

const grid = fs.readFileSync('./input.txt', 'utf8')
    .split('\n')
    .map(s => s.split(''));
const moves = {
    '<': [-1, 0],
    '^': [0, -1],
    '>': [1, 0],
    'v': [0, 1],
};
const cartsSymbols = Object.keys(moves);

// Cart = [x, y, direction, intersections]
let carts = [];
for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
        const symbol = grid[r][c];

        if (cartsSymbols.includes(symbol)) {
            carts.push([c, r, moves[symbol].slice(), 0]);

            if (symbol === '>' || symbol === '<') {
                grid[r][c] = '-';
            }

            if (symbol === '^' || symbol === 'v') {
                grid[r][c] = '|';
            }
        }
    }
}
// 1 + 3n -> left
// 2 + 3n -> straight
// 3 + 3n -> right
const getNextIntersectionMove = (intersections, move) =>  {
    if (((intersections - 1) / 3) % 1 === 0) {
        if (move.toString() === moves['<'].toString()) {
            return moves['v'].slice();
        } else if (move.toString() === moves['^'].toString()) {
            return moves['<'].slice();
        } else if (move.toString() === moves['>'].toString()) {
            return moves['^'].slice();
        } else if (move.toString() === moves['v'].toString()) {
            return moves['>'].slice();
        }
    } else if (((intersections - 2) / 3) % 1 === 0) {
        return move;
    } else {
        if (move.toString() === moves['<'].toString()) {
            return moves['^'].slice();
        } else if (move.toString() === moves['^'].toString()) {
            return moves['>'].slice();
        } else if (move.toString() === moves['>'].toString()) {
            return moves['v'].slice();
        } else if (move.toString() === moves['v'].toString()) {
            return moves['<'].slice();
        }
    }
}

const findCrash = (grid, carts) => {
    let found = false;

    while (!found) {
        carts.sort(([x1, y1], [x2, y2]) => y1 - y2);
       
        for (let i = 0; i < carts.length; i++) {
            let cart = carts[i];
            cart[0] += cart[2][0];
            cart[1] += cart[2][1];

            const [x, y] = cart;
            const symbol = grid[y][x];

            if (symbol === '+') {
                cart[3]++;
                cart[2] = getNextIntersectionMove(cart[3], cart[2]);
            } else if (symbol === '/') {
                if (
                    cart[2].toString() === moves['^'].toString() ||
                    cart[2].toString() === moves['<'].toString()
                ) {
                    cart[2] = cart[2].map(x => ++x);
                } else if (
                    cart[2].toString() === moves['>'].toString() ||
                    cart[2].toString() === moves['v'].toString()
                ) {
                    cart[2] = cart[2].map(x => --x);
                }
            } else if (symbol === '\\') {
                if (
                    cart[2].toString() === moves['^'].toString() ||
                    cart[2].toString() === moves['>'].toString()
                ) {
                    cart[2][0]--;
                    cart[2][1]++;
                } else if (
                    cart[2].toString() === moves['<'].toString() ||
                    cart[2].toString() === moves['v'].toString()
                ) {
                    cart[2][0]++;
                    cart[2][1]--;
                }
            }

            let match = {};
            for (let i = 0; i < carts.length; i++) {
                const c = carts[i];
                const key = `${c[0]} ${c[1]}`;

                if (match[key]) {
                    found = true;
                    console.log(key);
                    return key;
                } else {
                    match[key] = true;
                }
            };
        }
    }

    return '';
};

findCrash(grid, carts);
