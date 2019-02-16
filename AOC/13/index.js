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

// up, right, down, left
const DR = [-1, 0, 1, 0];
const DC = [0, 1, 0, -1];
const createCart = ({c, r, d, inter, dead=false}={}) => ({c, r, d, inter, dead});
const direction = {'^': 0, '>': 1, 'v': 2, '<': 3};
const cartSymbols = Object.keys(direction);

// Cart = [x, y, direction, intersections, dead]
let carts = [];
for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
        const symbol = grid[r][c];

        if (cartSymbols.includes(symbol)) {
            const cart = createCart({c, r, d: direction[symbol], inter: 0});
            carts.push(cart);

            if (symbol === '>' || symbol === '<') {
                grid[r][c] = '-';
            }

            if (symbol === '^' || symbol === 'v') {
                grid[r][c] = '|';
            }
        }
    }
}

const findCrash = (grid, carts) => {
    while (carts.length !== 1) {
        carts.sort((c1, c2) => (c1.r - c2.r || c1.c - c2.c));
       
        for (let i = 0; i < carts.length; i++) {
            const cart = carts[i];
            if (cart.dead) {
                continue;
            }
            const rr = cart.r + DR[cart.d];
            const cc = cart.c + DC[cart.d];
            const symbol = grid[rr][cc];

            // up, right, down, left
            if (symbol === '+') {
                // Turn left
                if (cart.inter === 0) {
                    cart.d = (cart.d + 3) % 4;
                // Turn right
                } else if (cart.inter === 2) {
                    cart.d = (cart.d + 1) % 4;
                }

                cart.inter = (cart.inter + 1) % 3;
            } else if (symbol === '/') {
                cart.d = {0: 1, 1: 0, 2: 3, 3: 2}[cart.d];
            } else if (symbol === '\\') {
                cart.d = {0: 3, 1: 2, 2: 1, 3: 0}[cart.d];
            }

            const foundIdx = carts.findIndex(c => c.r === rr && c.c === cc);
            
            if (foundIdx !== -1) {
                carts[i].dead = true;
                carts[foundIdx].dead = true;
            }

            cart.r = rr;
            cart.c = cc;
        }
        carts = carts.filter(c => !c.dead);
    }

    console.log(carts);
}

findCrash(grid, carts);
