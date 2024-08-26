import { useVuelidate, type ValidationArgs } from '@vuelidate/core';
import type { ToRefs, Ref } from 'vue';

export function useEsForms<
  T extends {[key in keyof Vargs]: any},
  Vargs extends ValidationArgs = ValidationArgs,
>(
  validationsArgs: Ref<Vargs> | Vargs,
  state: T | Ref<T> | ToRefs<T>,
) {
    const v$ = useVuelidate(validationsArgs, state);

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

    // TODO I don't know whether this function is even necessary. I think touching already happens on change
    const touchOnChange = (bla: string) => {
        console.log(`touchOnChange ${bla}`);
    };

    return {
        v$,
        validateState,
        touchOnChange,
    };
}
