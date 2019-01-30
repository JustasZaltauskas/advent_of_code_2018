import { readInput } from '../../utils/IO';
import path from 'path';

// position=<-41630, -31239> velocity=< 4,  3>
type Move = [number, number, number , number];
const input: Move[] = readInput(path.resolve(__dirname, 'input'))
    .map((s: string) => (s.match(/-?\d+/g) || []).map(Number));

const move = (moves: Move[]): Move[] =>
    moves.map(([x, y, dx, dy]): Move => [x + dx, y + dy, dx, dy]);

const visualise = (moves: Move[], gridSize: number = 100) => {
    const minX = Math.min(...moves.map((x) => x[0]));
    const maxX = Math.max(...moves.map((x) => x[0]));
    const minY = Math.min(...moves.map((x) => x[1]));
    const maxY = Math.max(...moves.map((x) => x[1]));
    let matrix = '';

    if (gridSize >= maxX - minX && gridSize >= maxY - minY) {
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                if (moves.some(([mx, my]) => mx === x && my === y)) {
                    matrix += '#';
                } else {
                    matrix += '.';
                }
            }
            matrix += '\n';
        }
        console.log(matrix);
        return true;
    }

    return false;
};

const moveTo = (n: number, moves: Move[]) => {
    for (let i = 0; i < n; i++) {
        const isVisualised = visualise(moves);
        if (isVisualised) {
            console.log(i);
            
        }
        moves = move(moves);
    }
}

moveTo(1000000, input);
