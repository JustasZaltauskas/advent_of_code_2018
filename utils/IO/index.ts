const fs = require('fs');

export const readInput = (path: string) => {
    try {
        return fs.readFileSync(path, 'utf8').split('\n');
    } catch (e) {
        throw e;
    }
}
