import { readInput } from '../../utils/IO';
import path from 'path';

/*
    Initial state
    #..#.#..##......###...###

    Rule
    ###.# => #
*/
interface Rules {
    [rule: string]: string
}

const input: string[] = readInput(path.resolve(__dirname, 'input'))
    .filter((s: string) => s.trim());

const [_, state] = input.shift()!.split(': ');

const rules = input
    .reduce((acc, x) => {
        const [rule, result] = x
            .trim()
            .replace(' ', '')
            .split('=>')
            .map(s => s.trim());

        return (acc[rule] = result, acc);
    }, {} as Rules);

const generations = 20;

type GeneratePlants = (state: string, rules: Rules, generations: number) => void;
const generatePlants: GeneratePlants = (state, rules, generations) => {
    let startLen = state.length;
    state = state.slice();
  
    for (let i = 0; i < generations; i++) {
      state = '..'.concat(state, '..');
      let plants = Array(state.length);
      const readPlants = '..'.concat(state, '..');
    
      for (let j = 0; j < state.length; j++) {
        const plant = readPlants.substr(j, 5);
        plants[j] = rules[plant] || '.'; 
      }
  
      state = plants.join('');
    }
  
    const zero_idx = (state.length - startLen) / 2;
    const result = state
      .split('')
      .reduce((acc, x, i) => acc + (x === '#' ? i - zero_idx : 0), 0);
  
    console.log(result);
  }

generatePlants(state, rules, generations);
