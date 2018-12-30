import { countBy } from '../functional';

test('countBy should count each string symbol', () => {
    expect(countBy('aabb')).toEqual({
        a: 2,
        b: 2
    });
});
