import { type ErrorObject, useVuelidate, type ValidationArgs } from '@vuelidate/core';
import type { ToRefs, Ref } from 'vue';

export function useEsForms<
  T extends {[key in keyof Vargs]: any},
  Vargs extends ValidationArgs = ValidationArgs,
>(
  validationsArgs: Ref<Vargs> | Vargs,
  state: T | Ref<T> | ToRefs<T>,
) {
    const v$ = useVuelidate(validationsArgs, state);

    const submitInProgress = ref(false);
    const formShowSuccess = ref(false);
    const formShowError = ref(false);
    const formMsgVariant = ref('danger');

    const isSubmitInProgress = computed(() => submitInProgress.value);

    const getFields = (obj: any, valueKey = 'obj') => {
        let objKeys = null;
        try {
            objKeys = Object.keys(obj);
            console.log('objKeys: ', objKeys)
        } catch (e) {
            return [];
        }
        return objKeys
            .filter((name) => !name.startsWith('$'))
            .map((name) => ({ name, [valueKey]: obj[name] }));
    };

    const formErrors = computed(() => {
        const errors = v$.value.$errors.map((error) => error);
        return errors.reduce((acc: any, error: ErrorObject) => {
            if (!(error.$property in acc)) {
                acc[error.$property] = [];
            }
            acc[error.$property].push(error.$validator);
            return acc;
        }, {})
    });

    const getValidatorField = (dotPath: string) => {
        const validatorField = dotPath.split('.').reduce((acc, field) => {
            acc = acc[field];
            return acc;
        }, v$.value);
        if (!validatorField) {
            return null;
        }
        if (!['$dirty', '$error'].map((key) => Object.prototype.hasOwnProperty.call(validatorField, key))) {
            return null;
        }
        return validatorField;
    }

    const validateState = (dotPath: string) => {
        const validatorField = getValidatorField(dotPath);
        if (!validatorField) {
            return null;
        }
        const { $dirty, $error } = validatorField;
        return $dirty ? !$error : null;
    }

    const touchOnChange = (dotPath: string) => {
        const validatorField = getValidatorField(dotPath);
        if (!validatorField) {
            return;
        }
        if (validatorField.$dirty) {
            validatorField.$touch();
        }
    };

    const showFormError = (
        text = 'The server responded with an error and we were unable to complete your request. Please try again',
    ) => {
        formMsgVariant.value = 'danger';
        formShowError.value = true;
    }

    const showFormSuccess = (
        text = 'Saved Successfully',
    ) => {
        formMsgVariant.value = 'success';
        formShowSuccess.value = true;
    }

    const hideFormError = () => {
        formShowError.value = false;
    }

    const hideFormSuccess = () => {
        formShowSuccess.value = false;
    }

    const startSubmit = () => {
        submitInProgress.value = true;
        formShowSuccess.value = false;
        formShowError.value = false;
    }

    const stopSubmit = () => {
        submitInProgress.value = false;
    }

    return {
        v$,
        submitInProgress,
        formShowSuccess,
        formShowError,
        formMsgVariant,
        isSubmitInProgress,
        formErrors,
        getValidatorField,
        validateState,
        touchOnChange,
        showFormError,
        showFormSuccess,
        hideFormError,
        hideFormSuccess,
        startSubmit,
        stopSubmit,
        getFields,
    };
}
