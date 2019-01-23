

const getMarbleWinner = (players: number, lastMarble: number) => {
    let marbles: number[] = [0];
    let nextPlayer = playerIterator(players);
    let player = 1;
    const scores = {} as {[k: string]: number};

    for (let i = 0; i < lastMarble; i++) {
        const currentMarble = i + 1;

        if (currentMarble && currentMarble % 23 === 0) {
            rotate(marbles, 7);
            scores[player] = scores[player] || 0;
            scores[player] += (marbles.pop() || 0) + currentMarble;
            rotate(marbles, -1);
        } else {
            rotate(marbles, -1);
            marbles.push(currentMarble);
        }

        player = nextPlayer();
    }
    
    return Math.max(...Object.values(scores));
}


const rotate = (arr: any[], n: number) => {
    for (let i = 0; i < Math.abs(n); i++) {
        if (n < 0) {
            arr.push(arr.shift());
        } else if (n > 0) {
            arr.unshift(arr.pop());
        }
    }

    return arr;
}

const playerIterator = (n: number, i: number = 1) => {
    return () => {
        if (i < n) {
            i++;
        } else {
            i = 1;
        }

        return i;
    };
};

console.log(getMarbleWinner(410, 7205900));
