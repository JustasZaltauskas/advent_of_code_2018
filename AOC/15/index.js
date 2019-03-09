/*
  - When multiple choices are equally valid,
    Ties broken in reading order (attack): top-to-bottom, left-to-right.
  - The order in which units take their turns within a round is the reading
    order of their starting positions 
  - never move or attack diagonally
  - Each unit begins its hit points is selected;
  - the number of full rounds that were completed (not counting the round in which
    combat ends) multiplied by the sum of the hit points of all remaining units at the
    moment combat ends. (Combat only ends when a unit finds no targets during its turn.)
*/

const fs = require('fs');

const grid = fs
  .readFileSync('input.example', 'utf-8')
  .split('\n')
  .map(r => r.trim().split(''));

const createUnit = ({u, coord, hp=200, att=3, dead=false}) =>
  ({u, coord, hp, att, dead});
let units = [];

const wall = '#';
const elf = 'E';
const goblin = 'G';
const isWall = s => s === wall;
const isElf = s => s === elf;
const isGoblin = s => s === goblin;
const isUnit = s => isElf(s) || isGoblin(s);

const getElves = arr => arr.filter(u => isElf(u.u) && !u.dead);
const getGoblins = arr => arr.filter(u => isGoblin(u.u) && !u.dead);
let isGameOver = false;
let rounds = 0;

// up, right, down, left
const DR = [-1, 0, 1, 0];
const DC = [0, 1, 0, -1];

// Adjacency list
const adjList = {};

const addToAdjList = (G, arr=[], r, c) => !isWall(G[r][c]) && arr.push(`${r},${c}`);

// Make adjacency list
grid
  .forEach((r, rIdx) =>
    r.forEach((_, cIdx) => {
      if (!isWall(grid[rIdx][cIdx])) {
        const pair = `${rIdx},${cIdx}`;

        if (!adjList[pair]) {
          adjList[pair] = [];
        }
        addToAdjList(grid, adjList[pair], rIdx + DR[0], cIdx + DC[0]);
        addToAdjList(grid, adjList[pair], rIdx + DR[3], cIdx + DC[3]);
        addToAdjList(grid, adjList[pair], rIdx + DR[1], cIdx + DC[1]);
        addToAdjList(grid, adjList[pair], rIdx + DR[2], cIdx + DC[2]);
      }
    }));

grid
  .forEach((r, rIdx) => r
    .forEach((c, cIdx) =>
      isUnit(c) && units.push(createUnit({u: c, coord: `${rIdx},${cIdx}`}))));

// console.log(grid);
// console.log(units);
// console.log(adjList);

/**
 * @param {Object} list Adjacency list
 * @param {String} start start coord, '#,#'
 * @param {String} end end coord, '#,#'
 * 
 * @return {Array} graph nodes array of shortest path
 */
const getShortestPath = (list, blacklist, start, end) => {
  const prev = {[start]: null};
  const toVisit = [start];
  let found = false;
  const path = [];
  
  if (!list[start] || !list[end]) {
    return path;
  }
  
  while (!found && toVisit.length) {
    const current = toVisit.shift();
    
    for (n of list[current]) {
      const isTaken = blacklist.find(x => x.coord === n);
  
      if (!(n in prev) && !isTaken) {
        prev[n] = current;
        toVisit.push(n);
      }

      if (n === end) {
        prev[n] = current;
        found = true;
        break;
      }
    }
  }
  return found ? getPath(prev, end) : [];
};

const getPath = (visited, end) => {
  if (!visited[end]) {
    return [];
  }

  const path = [];
  let toVisit = end;

  while (toVisit !== null) {
    path.push(toVisit);
    toVisit = visited[toVisit];
  }

  return path.reverse();
}

const getClosestUnits = (alist, ulist, coord, unit) => {
  const u = ulist.filter(x => x.u === unit && !x.dead);

  const paths = u.reduce((acc, x) => {
    const path = getShortestPath(alist, ulist, coord, x.coord);

    if (path.length > 1) {
      acc[x.coord] = path;
    }

    return acc;
  }, {});

  const closeUnits = u.filter(x => paths[x.coord] && paths[x.coord].length);
  
  const uSorted = closeUnits.sort((a, b) => {
    const pathA = paths[a.coord];
    const pathB = paths[b.coord];
    const d = pathA.length - pathB.length;

    if (d === 0) {
      const [r1, c1] = pathA[pathA.length - 1].split(',').map(Number);
      const [r2, c2] = pathB[pathB.length - 1].split(',').map(Number);

      return r1 === r2 ? c1 - c2 : r1 - r2;
    } else {
      return d;
    }
  });

  return uSorted;
};

const getAttackCoord = (enemies, coord) => {
  const [r, c] = coord.split(',').map(Number);
  const top = `${r + DR[0]},${c + DC[0]}`;
  const right = `${r + DR[1]},${c + DC[1]}`;
  const down = `${r + DR[2]},${c + DC[2]}`;
  const left = `${r + DR[3]},${c + DC[3]}`;

  const nearby = enemies.filter(x => {
    return x.coord === top ||
      x.coord === left ||
      x.coord === right ||
      x.coord === down;
  });
  
  if (!nearby.length) {
    return ``;
  }

  const hp = nearby.map(x => x.hp);
  const min = Math.min(...hp);

  return nearby.find(x => x.hp === min).coord;
};

const attack = (list, coord, att) => {
  for (u of list) {
    if (u.coord === coord) {
      u.hp -= att;

      if (u.hp <= 0) {
        u.dead = true;
      }

      return true;
    }
  }

  return false;
};

const attackNearby = (list, hero, enemies) => {
  const attackCoord = getAttackCoord(enemies, hero.coord);

  if (attackCoord.length) {
    return attack(list, attackCoord, hero.att);
  }

  return false;
}

const play = (adjList, units) => {
  while (!isGameOver) {
    for (u of units) {
      if (u.dead) {
        continue;
      }

      const elves = getElves(units);
      const goblins = getGoblins(units);
      
      if (!elves.length || !goblins.length) {
        const hp = units.reduce((y, x) => x.dead ? y : x.hp + y, 0);
        console.log(units);
        console.log(rounds);
        return rounds * hp;
      }
      
      if (isGoblin(u.u)) {
        const attacked = attackNearby(units, u, elves);

        if (!attacked) {
          const closeElves = getClosestUnits(adjList, units, u.coord, elf);

          if (closeElves.length !== 0) {
            const closest = closeElves[0];
            const pathToElf = getShortestPath(adjList, units, u.coord, closest.coord);

            if (pathToElf[1]) {
              u.coord = pathToElf[1];
              attackNearby(units, u, elves);
            }
          }
        }
      } else if (isElf(u.u)) {
        const attacked = attackNearby(units, u, goblins);
  
        if (!attacked) {
          const closeGoblins = getClosestUnits(adjList, units, u.coord, goblin);
          // console.log(closeGoblins);
          
          if (closeGoblins.length !== 0) {
            const closest = closeGoblins[0];
            const pathToGoblin = getShortestPath(adjList, units, u.coord, closest.coord);
    
            if (pathToGoblin[1]) {
              u.coord = pathToGoblin[1];
              attackNearby(units, u, goblins);
            }
          }
        }
      }
    }; 
  
    units = units.filter(x => !x.dead);
    units.sort((a, b) => {
      const [r1, c1] = a.coord.split(',').map(Number);
      const [r2, c2] = b.coord.split(',').map(Number);
  
      return r1 === r2 ? c1 - c2 : r1 - r2;
    });
  
    // console.log(`rounds: ${rounds}`);
    console.log(`units`);
    console.log(units);
    console.log();
    rounds++;
    // if (rounds === 3) {
      break;
    // }
  }
}

const score = play(adjList, units);
console.log(score);
