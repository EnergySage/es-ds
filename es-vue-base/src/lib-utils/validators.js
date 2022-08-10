import {
    required as vuelidateRequired,
    minValue as vuelidateMinValue,
    maxValue as vuelidateMaxValue,
    minLength as vuelidateMinLength,
    maxLength as vuelidateMaxLength,
    requiredIf as vuelidateRequiredIf,
    numeric as vuelidateNumeric,
    helpers,
} from 'vuelidate/lib/validators';

// Only some vuelidate validators can be reused; others dont work well
export const required = vuelidateRequired;
export const minValue = vuelidateMinValue;
export const maxValue = vuelidateMaxValue;
export const requiredIf = vuelidateRequiredIf;
export const numeric = vuelidateNumeric;
export const minLength = vuelidateMinLength;
export const maxLength = vuelidateMaxLength;

/**
 * @param { string } emailAddress Email Address
 * @returns { boolean } if valid
 */
export function email(emailAddress) {
    const valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z][\w]{1,}$/i.test(emailAddress);
    return !helpers.req(emailAddress) || valid;
}

/**
 * @param { number } number US Based phone number
 * @returns { boolean } if valid
 */
export function phone(number) {
    return !helpers.req(number) || /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(number);
}

export default {
    required,
    requiredIf,
    email,
    phone,
    numeric,
    minLength,
    minValue,
    maxLength,
    maxValue,
};
