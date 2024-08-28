import { helpers, required, minValue, maxValue, requiredIf, numeric, minLength, maxLength } from '@vuelidate/validators';

// Only some vuelidate validators can be reused; others don't work well
export const vuelidateRequired = required;
export const vuelidateMinValue = minValue;
export const vuelidateMaxValue = maxValue;
export const vuelidateRequiredIf = requiredIf;
export const vuelidateNumeric = numeric;
export const vuelidateMinLength = minLength;
export const vuelidateMaxLength = maxLength;
export const vuelidateHelpers = helpers;

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

/**
 * @param { Number } number of times the resulting function will need to match
 * @returns { Function } function that will take a string param that will compare against a
 * pattern N times. The pattern is defined in the functional closure.
 *
 * Usage: hasSpecialCharacter(1)('some $tring')
 */
const hasSpecialCharacter = matchesPatternNTimes(/\W|_/g);

/**
 * @param { Number } number of times the resulting function will need to match
 * @returns { Function } function that will take a string param that will compare against a
 * pattern N times. The pattern is defined in the functional closure.
 *
 * Usage: hasUppercaseLetter(1)('some String')
 */
const hasUppercaseLetter = matchesPatternNTimes(/[A-Z]/g);

/**
 * @param { Number } number of times the resulting function will need to match
 * @returns { Function } function that will take a string param that will compare against a
 * pattern N times. The pattern is defined in the functional closure.
 *
 * Usage: hasLowercaseLetter(1)('some String')
 */
const hasLowercaseLetter = matchesPatternNTimes(/[a-z]/g);

/**
 * @param emailAddress Email Address
 * @returns if valid
 */
export function vuelidateEmail(emailAddress: string) {
    const valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z][\w]{1,}$/i.test(emailAddress);
    return !helpers.req(emailAddress) || valid;
}

/**
 * @param number US Based phone number
 * @returns if valid
 */
export function vuelidatePhone(number: string) {
    return !helpers.req(number) || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(number);
}

/**
 * @returns if not required or string contains a number
 */
export const vuelidateHasNumber = (X: number) => helpers.withParams(
    { type: 'xTimes', value: X },
    (value: string) => !helpers.req(value) || hasNumber(X)(value),
);

/**
 * @returns if not required or string contains a special character
 */
export const vuelidateHasSpecialCharacter = (X: number) => helpers.withParams(
    { type: 'xTimes', value: X },
    (value: string) => !helpers.req(value) || hasSpecialCharacter(X)(value),
);

/**
 * @returns if not required or string contains an uppercase letter
 */
export const vuelidateHasUppercaseLetter = (X: number) => helpers.withParams(
    { type: 'xTimes', value: X },
    (value: string) => !helpers.req(value) || hasUppercaseLetter(X)(value),
);

/**
 * @returns if not required or string contains an lowercase letter
 */
export const vuelidateHasLowercaseLetter = (X: number) => helpers.withParams(
    { type: 'xTimes', value: X },
    (value: string) => !helpers.req(value) || hasLowercaseLetter(X)(value),
);
