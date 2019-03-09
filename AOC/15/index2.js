/*
1. Each unit begins its turn by identifying all possible targets (enemy units).
    If no targets remain, combat ends.
2. Then, the unit identifies all of the open squares (.) that are in range of
    each target; these are the squares which are adjacent (immediately up,
    down, left, or right) to any target and which aren't already occupied by a
    wall or another unit.
3. If the unit is not already in range of a target, and there are no open squares
    which are in range of a target, the unit ends its turn.

Move:
1. "To move, the unit first considers the squares that are in range and determines which of those
squares it could reach in the fewest steps"

2. "If multiple squares are in range and tied for being reachable in the fewest steps, the square
which is first in reading order is chosen."

3. "If multiple steps would put the unit equally closer to its destination, the unit chooses the
step which is first in reading order." (This requires knowing when there is more than one shortest
path so that you can consider the first step of each such path.
*/

const fs = require('fs');

const grid = fs
    .readFileSync('./input.example', 'utf-8')
    .split('\n')
    .map(x => x.trim())
    .map(x => x.split(''));

const Team = Object.freeze({
    ELF: Symbol('Elf'),
    GOBLIN: Symbol('Goblin'),
});
const TeamMap = {'G': Team.GOBLIN, 'E': Team.ELF};
const isWall = s => s === '#';

// top, right, bottom, left
const DR = [-1, 0, 1, 0];
const DC = [0, 1, 0, -1];

const obstacles = {};
const Pos = ({r, c}) => {
    const addPos = (o) => Pos({r: r + o.r, c: c + o.c});

    return {
        r, c,
        neighbors() {
            return DR.map((_, i) => addPos(Pos({r : DR[i], c: DC[i]})));
        },
    };
};

const Unit = ({pos, team, hp=200, att=3}={}) =>
    ({pos, team: TeamMap[team], hp, att});

const p = Pos({r: 1, c: 1});
const n = p.neighbors();
