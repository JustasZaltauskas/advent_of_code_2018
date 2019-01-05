import { remove } from './index';

describe('remove', () => {
    test('("", 2) => ""', () => expect(remove('', 2)).toBe(''))
    test('("a", 0) => ""', () => expect(remove('a', 0)).toBe(''))
    test('("a", 1) => "a"', () => expect(remove('a', 1)).toBe('a'))
    test('("aba", 1) => "aa"', () => expect(remove('aba', 1)).toBe('aa'))
    test('("abba", 3) => "abb"', () => expect(remove('abba', 3)).toBe('abb'))
});
