export const compose = (...fns: any[]) => (x: any) =>
    fns.reduce((y, fn) => fn(y), x);

export const identity = (x: any) => x;
