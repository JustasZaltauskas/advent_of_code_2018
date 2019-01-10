import {
    getOverlapingClaims,
    getClaimsCoordinates,
    getNonOverlapingClaim,
} from './index';

test('getClaimsCoordinates should count cordinates of claims', () => {
    const claims = [
        [1, 1, 1, 2, 2],
    ];

    expect(getClaimsCoordinates(claims)).toEqual({
        '1, 1': 1,
        '1, 2': 1,
        '2, 1': 1,
        '2, 2': 1,
    });
})

test('getClaims should calculate overlaping claims', () => {
    const claims = [
        [1, 1, 3, 4, 4],
        [2, 3, 1, 4, 4],
        [3, 5, 5, 2, 2],
    ];

    expect(getOverlapingClaims(claims)).toBe(4);
});

test('getNonOverlapingClaim should calculate nonoverlaping claims', () => {
    const claims = [
        [1, 1, 3, 4, 4],
        [2, 3, 1, 4, 4],
        [3, 5, 5, 2, 2],
    ];

    expect(getNonOverlapingClaim(claims)).toBe('3');
});
