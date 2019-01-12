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

    const { sleepData } = input.reduce((acc, sleep) => {
        const [timestamp, action] = sleep;
        const [_, time] = timestamp.split(' ');
        const number = action.match(/\d+/);

        if (number) {
            return {
                ...acc,
                guardId: number[0],
            }
        }

        const currentMinutes = Number(time.split(':')[1]);
        if (action.search(/falls/) !== -1) {
            return {
                ...acc,
                asleepTime: currentMinutes,
            }
        };

        if (action.search(/wakes/) !== -1) {
            const id = acc.guardId;
            const sleepData = acc.sleepData[id] || {
                sleepTime: 0,
                minutes: Array(60).fill(0),
            };
            const asleepTime = acc.asleepTime || 0;
            const sleepTime = sleepData.sleepTime;

            const newMinutes = sleepData.minutes
                .slice(asleepTime, currentMinutes)
                .map(min => ++min);

            sleepData.minutes.splice(
                asleepTime,
                newMinutes.length,
                ...newMinutes
            );

            return {
                ...acc,
                sleepData: {
                    ...acc.sleepData,
                    [id]: {
                        sleepTime: sleepTime + (currentMinutes - asleepTime - 1),
                        minutes: sleepData.minutes,
                    }
                }
            }
        }

        return acc;
    }, {
        sleepData: {}
    } as {
        sleepData: ISleepData,
        guardId: string,
        asleepTime: number,
    });


    const [sleepyGuardId, sleepyGuard] = maxEntry(
        sleepData, (x: ISleepData) => x.sleepTime);
    const [maxMinute] = maxEntry(sleepyGuard.minutes);


    return Number(sleepyGuardId) * Number(maxMinute);
}

const maxEntry = (o: object, getValue: Function = identity) => Object.entries(o)
    .reduce((acc, x) => getValue(acc[1]) < getValue(x[1]) ? x : acc);

const x = findSleepyGuard(input)
console.log(x);
