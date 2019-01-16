import { readInput } from '../../utils/IO';
import * as path from 'path';

// Step P must be finished before step R can begin.
const input: string[][] = readInput(path.resolve(__dirname, 'input'))
    .map((s: string) =>  {
        const steps = s.split(' ');
        return [steps[1], steps[7]];
    });

const test: string[][] = [
    ['C', 'A'],
    ['C', 'F'],
    ['A', 'B'],
    ['A', 'D'],
    ['B', 'E'],
    ['D', 'E'],
    ['F', 'E'],
];

// Part 1
type Graph = {[k: string]: string[]};
type IncomingEdges = {[k: string]: number};
// Graph
const G = {} as Graph;
// Graph incoming edges
const E = {} as IncomingEdges;
// Set of all nodes with no incoming edge
const S: string[] = [];

input.forEach(([before, after]) => {
    G[before] = G[before] || [];
    E[after] = E[after] || 0;

    G[before].push(after);
    E[after]++;
});

// Find start of the graph
Object.keys(G).forEach((vertex) => {
    if (!E[vertex]) {
        S.push(vertex);
    }
});

/**
 * 
 * @param G Graph (non-cyclical)
 * @param E Graph's incoming edges
 * @param S Set of all nodes with no incoming edge
 * 
 * @returns A topologically sorted order
 */
const topologicalSort = (G: Graph, E: IncomingEdges, S: string[]) => {
    let sorted = '';

    while (S.length) {
        const node = S.sort().shift()!;
        sorted += node;
        
        if (G[node]) {
            G[node].forEach((e) => {
                E[e]--;
        
                if (E[e] === 0) {
                    S.push(e);
                }
            });
        }
     }

     return sorted;
}


const sorted = topologicalSort(G, E ,S);
console.log(sorted);
 