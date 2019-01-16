const fs = require('fs');

export const readInput = (path: string) => {
    try {
        return fs.readFileSync(path, 'utf8')
            .split('\n')
            .filter((s: string) => s);
    } catch (e) {
        throw e;
    }
}
