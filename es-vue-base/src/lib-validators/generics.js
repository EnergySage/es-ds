/**
 * This contains generic functions for validating string inputs
 *
 * What you'll likely use for client-side validation can be found in ./index.js
 */

/**
 * @param { string } pattern
 * @returns { Function } a function that takes a number, and returns another function which takes a string param
 * that will ultimately be what you're comparing the pattern against N times.
 */
// eslint-disable-next-line max-len
export const matchesPatternNTimes = (pattern) => (N = 1) => (param) => [...String(param).matchAll(pattern)].length >= N;

/**
 * @param { Number } number of times the resulting function will need to match
 * @returns { Function } function that will take a string param that will compare against a
 * pattern N times. The pattern is defined in the functional closure.
 *
 * Usage: hasNumber(1)('s0me string')
 */
export const hasNumber = matchesPatternNTimes(/[0-9]/g);

/**
 * @param { Number } number of times the resulting function will need to match
 * @returns { Function } function that will take a string param that will compare against a
 * pattern N times. The pattern is defined in the functional closure.
 *
 * Usage: hasSpecialCharacter(1)('some $tring')
 */
export const hasSpecialCharacter = matchesPatternNTimes(/\W|_/g);

/**
 * @param { Number } number of times the resulting function will need to match
 * @returns { Function } function that will take a string param that will compare against a
 * pattern N times. The pattern is defined in the functional closure.
 *
 * Usage: hasUppercaseLetter(1)('some String')
 */
export const hasUppercaseLetter = matchesPatternNTimes(/[A-Z]/g);

/**
 * @param { Number } number of times the resulting function will need to match
 * @returns { Function } function that will take a string param that will compare against a
 * pattern N times. The pattern is defined in the functional closure.
 *
 * Usage: hasLowercaseLetter(1)('some String')
 */
export const hasLowercaseLetter = matchesPatternNTimes(/[a-z]/g);
