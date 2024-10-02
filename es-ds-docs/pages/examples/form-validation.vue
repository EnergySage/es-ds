<script setup lang="ts">
const state = reactive({
    form: {
        name: '',
    },
});
const rules = {};

const { showFormError, formShowError, formMsgVariant, isSubmitInProgress, startSubmit, stopSubmit } = useEsForms(
    rules,
    state,
);

const asyncTimeout = async (seconds = 3) => {
    const millisecondTimeout = seconds * 1000;
    return new Promise((resolve) => {
        setTimeout(resolve, millisecondTimeout);
    });
};

const fakeServerRequest = async () => {
    await asyncTimeout();
    showFormError();
};

const onSubmit = async () => {
    startSubmit(); // This method via forms composable, will set submitInProgress to true
    await fakeServerRequest();
    stopSubmit(); // This method via forms composable, will set submitInProgress to false
};

const { $prism } = useNuxtApp();
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./form-validation.vue?raw');

        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <es-container>
        <es-row>
            <es-col>
                <h1>Form with server error</h1>
                <p>
                    See
                    <nuxt-link to="/examples/form-field-validation"> Form with client-side validation </nuxt-link> for
                    example of individual field validation
                </p>
                <h2>UX Guidelines</h2>
                <ul>
                    <li>Show loading spinner on button during server request</li>
                    <li>
                        Use <nuxt-link to="/molecules/form-message"> Form message </nuxt-link>
                        to display server-side errors
                    </li>
                </ul>
            </es-col>
        </es-row>
        <es-row class="border-top pt-200 my-50">
            <es-col
                cols="12"
                lg="8">
                <form @submit.stop.prevent="onSubmit">
                    <es-form-msg
                        class="mt-100"
                        :show="formShowError"
                        :variant="formMsgVariant"
                        @hidden="formShowError = false">
                        The server responded with an error and we were unable to complete your request. Please try
                        again
                    </es-form-msg>
                    <es-form-input
                        id="form-input-name"
                        v-model="state.form.name"
                        :disabled="isSubmitInProgress"
                        required>
                        <template #label> Name </template>
                    </es-form-input>
                    <div class="d-flex flex-grow-1 justify-content-end mt-200">
                        <es-button
                            type="submit"
                            class="w-100 w-lg-auto"
                            :disabled="isSubmitInProgress">
                            <span class="w-100">
                                <span v-if="isSubmitInProgress">
                                    <es-spinner
                                        role="status"
                                        label="Loading" />
                                </span>
                                <span :class="{ 'sr-only': isSubmitInProgress }"> Submit </span>
                            </span>
                        </es-button>
                    </div>
                </form>
            </es-col>
        </es-row>
        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/examples/form-validation.vue" />
    </es-container>
</template>
