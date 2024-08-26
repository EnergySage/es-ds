import { useVuelidate, type ValidationArgs } from '@vuelidate/core';

import type { ToRefs, Ref } from 'vue';

// TODO I don't know whether this function is even necessary. I think touching already happens on change
const touchOnChange = (bla: string) => {
    console.log(`touchOnChange ${bla}`);
};

export function useEsForms<
  T extends {[key in keyof Vargs]: any},
  Vargs extends ValidationArgs = ValidationArgs,
>(
  validationsArgs: Ref<Vargs> | Vargs,
  state: T | Ref<T> | ToRefs<T>,
) {
    const v$ = useVuelidate(validationsArgs, state);
    return {
        v$,
        touchOnChange,
    };
}
