import * as generics from '../../src/lib-validators/generics';

describe('hasNumber', () => {
    test.concurrent.each([
        ['asdf', false],
        ['', false],
        [123, true],
        ['123', true],
        [1, true],
        ['1', true],
        ['asdf1', true],
        ['1asdf', true],
        ['as1df', true],
    ])('for %s is %s', async (value, expected) => {
        expect(generics.hasNumber()(value)).toBe(expected);
    });
});

describe('hasSpecialCharacter', () => {
    test.concurrent.each([
        ['asdf', false],
        ['', false],
        [123, false],
        ['123', false],
        [1, false],
        ['1', false],
        ['asdf1', false],
        ['1asdf', false],
        ['as1df', false],
        ['a$sdf', true],
        ['@', true],
        ['12!3', true],
    ])('for %s is %s', async (value, expected) => {
        expect(generics.hasSpecialCharacter()(value)).toBe(expected);
    });
});

describe('hasUppercaseLetter', () => {
    test.concurrent.each([
        ['asdf', false],
        ['', false],
        [123, false],
        ['123', false],
        [1, false],
        ['1', false],
        ['asdf1', false],
        ['1asdf', false],
        ['as1df', false],
        ['a$sdf', false],
        ['@', false],
        ['12!3', false],
        ['aSdf1', true],
        ['1asDf', true],
        ['ASDF', true],
        ['a$sdF', true],
    ])('for %s is %s', async (value, expected) => {
        expect(generics.hasUppercaseLetter()(value)).toBe(expected);
    });
});

describe('hasLowercaseLetter', () => {
    test.concurrent.each([
        ['asdf', true],
        ['', false],
        [123, false],
        ['a$sdF', true],
        ['', false],
        [123, false],
        ['a$sdF', true],
        ['d', true],
    ])('for %s is %s', async (value, expected) => {
        expect(generics.hasLowercaseLetter()(value)).toBe(expected);
    });
});
