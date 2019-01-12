/*
[1518-04-09 00:01] Guard #3407 begins shift
[1518-03-15 00:11] falls asleep
[1518-07-31 00:54] wakes up
*/
import { readInput } from '../../utils/IO';
import path from 'path';
import { identity } from '../../utils/functional';

const input: string[][] = readInput(path.resolve(__dirname, 'input'))
    .map((s: string) => s.replace('[', '').split('] '));

interface ISleepData {
    [id: string]: {
        minutes: number[];
        sleepTime: number;
    }
}

const findSleepyGuard = (input: string[][]) => {
    input.sort();

    let guardId: string;
    let asleepMinutes: number;
    let sleepData: ISleepData = {};

    input.forEach(([timestamp, action]) => {
        const currentMinutes = Number(timestamp.split(' ')[1].split(':')[1]);
        const number = action.match(/\d+/);

        if (guardId && !sleepData.hasOwnProperty(guardId)) {
            sleepData[guardId] = {
                sleepTime: 0,
                minutes: Array(60).fill(0),
            }
        }

        if (number) {
            guardId = number[0];
        }

        if (action.search(/falls/) !== -1) {
            asleepMinutes = currentMinutes;
        }

        if (action.search(/wakes/) !== -1) {
            for (let i = asleepMinutes; i < currentMinutes; i++) {
                sleepData[guardId].minutes[i]++;
            }

            sleepData[guardId].sleepTime += currentMinutes - asleepMinutes - 1;
        }
    });

    const [sleepyGuardId, sleepyGuard] = maxEntry(
        sleepData, (x: ISleepData) => x.sleepTime);
    const [maxMinute] = maxEntry(sleepyGuard.minutes);

    return Number(sleepyGuardId) * Number(maxMinute);
}

const maxEntry = (o: object, getValue: Function = identity) => Object.entries(o)
    .reduce((acc, x) => getValue(acc[1]) < getValue(x[1]) ? x : acc);

console.log(findSleepyGuard(input));
