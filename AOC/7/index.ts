import { readInput } from '../../utils/IO';
import * as path from 'path';

// Step P must be finished before step R can begin.
const input: string[][] = readInput(path.resolve(__dirname, 'input'))
    .map((s: string) =>  {
        const steps = s.split(' ');
        return [steps[1], steps[7]];
    });

const startOfTheGraph = (G: Graph, E: IncomingEdges) => {
    const V: string[] = [];

    // Find start of the graph
    Object.keys(G).forEach((vertex) => {
        if (!E[vertex]) {
            V.push(vertex);
        }
    });

    return V;
}

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
const S: string[] = startOfTheGraph(G, E);

input.forEach(([before, after]) => {
    G[before] = G[before] || [];
    E[after] = E[after] || 0;

    G[before].push(after);
    E[after]++;
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

// const sorted = topologicalSort(G, E ,S);
// console.log(sorted);

// Part 2;
type WorkQueue = string[];
type Events = [number, string][];
type Work = (Q: WorkQueue, EV: Events, workers: number, time: number) => void;
const workTime = (char: string) => char.charCodeAt(0) - 65 + 61;
const startWork: Work = (Q, EV, workers, t) => {
    // Work amount cannot exceed number of workers
    while (EV.length < workers && Q.length) {
        // Sorting because we do select graph's node in alphabetic order
        const work = Q.sort().shift()!;
        console.log(`Starting ${work} at ${t}`);
        EV.push([t + workTime(work), work]);
    }
}

// Graph in being travelled in parallel by specified number of workers
const getGraphTravel = (G:Graph, E: IncomingEdges, workers: number) => {
    let Q: WorkQueue = startOfTheGraph(G, E);
    let EV: Events = [];
    let t: number = 0;

    Object.keys(G).forEach((n) => G[n].sort());
    
    startWork(Q, EV, workers, t);
    
    while (Q.length || EV.length) {
        // Sort by number then by letter
        // We take first work that will be finished
        const [second, e] = EV.sort((a, b) => {
            const diff = a[0] - b[0];
            return diff === 0 ?
                (a[1] > b[1] ? 1 : a[1] < b[1] ? -1 : 0):
                diff;
        }).shift() || [t, ''];
        t = second;
    
        console.log(`Done ${e} at ${second}`);
    
        (G[e] || []).forEach((e) => {
            E[e]--;
    
            if (E[e] === 0) {
                // Add task
                Q.push(e);
            }
        })
        // Remove work from Q, calculate finish time and add to EV
        startWork(Q, EV, workers, t);
    }

    return t;
}

console.log(getGraphTravel(G, E, 5));
    