/**
 * constants.js
 *
 * String constants that can be used when defining validations objects
 */

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
const HELPERS = 'vuelidateHelpers';

const vuelidateKeys = {
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
    HELPERS,
};

export default vuelidateKeys;
