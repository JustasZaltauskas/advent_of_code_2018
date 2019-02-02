import { getDigit } from './index';

describe('getDigit', () => {
    it('should get 1st number from right', () => {
        expect(getDigit(1234, 1)).toBe(4);
    })

    it('should return 0 if nth is larger than given number', () => {
        expect(getDigit(5, 2)).toBe(0);
    })

    it('should return 2 from right when number is negative', () => {
        expect(getDigit(-25, 2)).toBe(-2);
    })
});
