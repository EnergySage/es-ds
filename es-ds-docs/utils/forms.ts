import { helpers } from '@vuelidate/validators';

/**
 * @returns a function that takes a number, and returns another function which takes a string param
 * that will ultimately be what you're comparing the pattern against N times.
 */
const matchesPatternNTimes = (pattern: RegExp) => (N = 1) => (param: string) => [...String(param).matchAll(pattern)].length >= N;

/**
 * @param { Number } number of times the resulting function will need to match
 * @returns { Function } function that will take a string param that will compare against a
 * pattern N times. The pattern is defined in the functional closure.
 *
 * Usage: hasNumber(1)('s0me string')
 */
const hasNumber = matchesPatternNTimes(/[0-9]/g);

export const vuelidateHasNumber = (X: number) => helpers.withMessage(
    'This field must include a number',
    helpers.withParams(
        { type: 'xTimes', value: X },
        (value: string) => !helpers.req(value) || hasNumber(X)(value),
    ),
);
