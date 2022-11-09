import {
    required,
    minValue,
    maxValue,
    minLength,
    maxLength,
    requiredIf,
    numeric,
    helpers,
} from 'vuelidate/lib/validators';

// Only some vuelidate validators can be reused; others don't work well
export const vuelidateRequired = required;
export const vuelidateMinValue = minValue;
export const vuelidateMaxValue = maxValue;
export const vuelidateRequiredIf = requiredIf;
export const vuelidateNumeric = numeric;
export const vuelidateMinLength = minLength;
export const vuelidateMaxLength = maxLength;

/**
 * @param { string } emailAddress Email Address
 * @returns { boolean } if valid
 */
export function vuelidateEmail(emailAddress) {
    const valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z][\w]{1,}$/i.test(emailAddress);
    return !helpers.req(emailAddress) || valid;
}

/**
 * @param { number } number US Based phone number
 * @returns { boolean } if valid
 */
export function vuelidatePhone(number) {
    return !helpers.req(number) || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(number);
}

/**
 * @param { string } param
 * @returns { boolean } if string contains a number
 */
export const hasNumber = (param) => /[0-9]/.test(param);

/**
 * @param { string } param
 * @returns { boolean } if string contains a special character (i.e. non-word or underscore)
 */
export const hasSpecialCharacter = (param) => /\W|_/.test(param);

/**
 * @param { string } param
 * @returns { boolean } if string contains a uppercase letter
 */
export const hasUppercaseLetter = (param) => /[A-Z]/.test(param);

/**
 * @param { string } param
 * @returns { boolean } if string contains a lowercase letter
 */
export const hasLowercaseLetter = (param) => /[a-z]/.test(param);

/**
 * @param { string } param
 * @returns { boolean } if not required or string contains a number
 */
export function vuelidateHasNumber(param) {
    return !helpers.req(param) || hasNumber(param);
}

/**
 * @param { string } param
 * @returns { boolean } if not required or string contains a special character
 */
export function vuelidateHasSpecialCharacter(param) {
    return !helpers.req(param) || hasSpecialCharacter(param);
}

/**
 * @param { string } param
 * @returns { boolean } if not required or string contains an uppercase letter
 */
export function vuelidateHasUppercaseLetter(param) {
    return !helpers.req(param) || hasUppercaseLetter(param);
}

/**
 * @param { string } param
 * @returns { boolean } if not required or string contains an lowercase letter
 */
export function vuelidateHasLowercaseLetter(param) {
    return !helpers.req(param) || hasLowercaseLetter(param);
}

const REQUIRED = 'vuelidateRequired';
const MIN_VALUE = 'vuelidateMinValue';
const MAX_VALUE = 'vuelidateMaxValue';
const REQUIRED_IF = 'vuelidateRequiredIf';
const NUMERIC = 'vuelidateNumeric';
const MIN_LENGTH = 'vuelidateMinLength';
const MAX_LENGTH = 'vuelidateMaxLength';
const HAS_NUMBER = 'vuelidateHasNumber';
const HAS_SPECIAL_CHARACTER = 'vuelidateHasSpecialCharacter';
const HAS_UPPERCASE_LETTER = 'vuelidateHasUppercaseLetter';
const HAS_LOWERCASE_LETTER = 'vuelidateHasLowercaseLetter';
const EMAIL = 'vuelidateEmail';
const PHONE = 'vuelidatePhone';

export const vuelidateKeys = {
    REQUIRED,
    REQUIRED_IF,
    MIN_VALUE,
    MAX_VALUE,
    MIN_LENGTH,
    MAX_LENGTH,
    NUMERIC,
    EMAIL,
    PHONE,
    HAS_NUMBER,
    HAS_SPECIAL_CHARACTER,
    HAS_UPPERCASE_LETTER,
    HAS_LOWERCASE_LETTER,

};
