import { validationMixin } from 'vuelidate';

export default {
    mixins: [validationMixin],
    data() {
        return {
            submitInProgress: false,
            formShowSuccess: false,
            formShowError: false,
            formMsgVariant: '',
        };
    },
    computed: {
        isSubmitInProgress() {
            return this.submitInProgress;
        },
        /**
        * @returns { Object } structure that's easy to use for form validation
        *
        * Shape of output will match validators defined in the validations
        * attribute of a component. For example if your validations object looks like:
        *
        * validations: {
        *     form: {
        *         password: {
        *             [vuelidateKeys.REQUIRED]: vuelidateRequired,
        *             [vuelidateKeys.MIN_LENGTH]: vuelidateMinLength(8),
        *             [vuelidateKeys.HAS_NUMBER]: vuelidateHasNumber,
        *             [vuelidateKeys.HAS_SPECIAL_CHARACTER]: vuelidateHasSpecialCharacter,
        *             [vuelidateKeys.HAS_UPPERCASE_LETTER]: vuelidateHasUppercaseLetter,
        *             [vuelidateKeys.HAS_LOWERCASE_LETTER]: vuelidateHasLowercaseLetter,
        *         },
        *     },
        * },
        *
        * Then the resulting formErrors (if the field is invalid) will look something like:
        *
        * {
        *     password: [
        *         'required',
        *         'minLength',
        *         'hasNumber',
        *         'hasSpecialCharacter',
        *         'hasUppercaseLetter',
        *         'hasLowercaseLetter',
        *     ]
        * }
        *
        * Only validators returning "false" will show up in the resulting list.
        * So if the field is valid, the result would be:
        *
        * {
        *     password: [],
        * }
        */
        formErrors() {
            let hasFormAttribute = false;
            try {
                hasFormAttribute = Object.prototype.hasOwnProperty.call(this.$v, 'form');
            } catch (e) {
                return {};
            }
            if (!hasFormAttribute) {
                return {};
            }
            const formFields = this.getFields(this.$v.form);
            if (!formFields.length) {
                return {};
            }
            const formFieldErrors = formFields.reduce((formObj, item) => {
                // eslint-disable-next-line no-param-reassign
                formObj[item.name] = this.getFields(item.obj, 'isValid')
                    .filter((i) => !i.isValid)
                    .map((j) => j.name);
                return formObj;
            }, {});
            return formFieldErrors;
        },
    },
    methods: {
        /**
        * @param { string } dataPath
        * @returns { Object | null } either a validation object or null
        */
        getValidatorField(dotPath) {
            // Find validators associated with dotted path
            const validatorField = dotPath.split('.').reduce((acc, field) => {
                // eslint-disable-next-line no-param-reassign
                acc = acc[field];
                return acc;
            }, this.$v);
            if (!validatorField) {
                return null;
            }
            if (!['$dirty', '$error'].map((key) => Object.prototype.hasOwnProperty.call(validatorField, key))) {
                return null;
            }
            return validatorField;
        },
        /**
        * @param { string } dotPath
        * @returns { Boolean | null } `true` if field is valid, `false` if field isn't valid, `null` if not "touched"
        */
        validateState(dotPath) {
            const validatorField = this.getValidatorField(dotPath);
            if (!validatorField) {
                return null;
            }
            const { $dirty, $error } = validatorField;
            return $dirty ? !$error : null;
        },
        /**
        * @param { string } dotPath
        *
        * Trigger "touch" to kick-off vuelidate validation
        */
        touchOnChange(dotPath) {
            const validatorField = this.getValidatorField(dotPath);
            if (!validatorField) {
                return;
            }
            if (validatorField.$dirty) {
                validatorField.$touch();
            }
        },
        // eslint-disable-next-line max-len
        // eslint-disable-next-line no-unused-vars
        showFormError(text = 'The server responded with an error and we were unable to complete your request. Please try again') {
            this.formMsgVariant = 'danger';
            this.formShowError = true;
        },
        // eslint-disable-next-line no-unused-vars
        showFormSuccess(text = 'Saved Successfully') {
            this.formMsgVariant = 'success';
            this.formShowSuccess = true;
        },

        hideFormError() {
            this.formShowError = false;
        },

        hideFormSuccess() {
            this.formShowSuccess = false;
        },
        startSubmit() {
            this.formMsg = '';
            this.submitInProgress = true;
        },
        stopSubmit() {
            this.submitInProgress = false;
        },
        getFields(obj, valueKey = 'obj') {
            let objKeys = null;
            try {
                objKeys = Object.keys(obj);
            } catch (e) {
                return [];
            }
            return objKeys
                .filter((name) => !name.startsWith('$'))
                .map((name) => ({ name, [valueKey]: obj[name] }));
        },
    },
};
