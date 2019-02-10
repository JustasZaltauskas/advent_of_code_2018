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

const generations = 2000;

type GeneratePlants = (state: string, rules: Rules, generations: number) => void;
const generatePlants: GeneratePlants = (state, rules, generations) => {
    state = state.slice();
    let zero_idx = 0;
  
    for (let i = 0; i < generations; i++) {
      state = '..'.concat(state, '..');
      let plants = Array(state.length);
      const readPlants = '..'.concat(state, '..');
      zero_idx += 2;
    
      for (let j = 0; j < state.length; j++) {
        const plant = readPlants.substr(j, 5);
        plants[j] = rules[plant] || '.'; 
      }
      
      let start = 0;
      let end = plants.length - 1;

      while (plants[start] === '.') {
        start++;
        zero_idx -= 1;
      }

      while (plants[end] === '.') {
        end--;
      }

      state = plants.slice(start, end + 1).join('');
      console.log(i + 1, zero_idx, start, end);
    }
    
    // part 2
    zero_idx = (-Number(50e9)) + 82;
    
    const result =  state
      .split('')
      .reduce((acc, x, i) => x === '#' ? acc + (i - zero_idx) : acc, 0);

    console.log(result);
  }

generatePlants(state, rules, generations);
