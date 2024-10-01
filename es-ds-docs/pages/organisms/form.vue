<script setup lang="ts">
const inline = ref(false);

const propTableRows = [
    ['inline', 'Boolean', 'false', 'Display labels and form controls on a single horizontal row'],
    ['novalidate', 'Boolean', 'null', 'Disables browser native HTML5 validation on controls in the form'],
    [
        'validated',
        'Boolean',
        'null',
        "Adds the Bootstrap class 'was-validated' on the form, triggering the native browser validation states",
    ],
];

const state = reactive({
    form: {
        email: '',
        password: '',
        phone: '',
        maskedPhoneNumber: '',
        notes: '',
    },
});

const rules = {};

const { isSubmitInProgress, startSubmit, stopSubmit } = useEsForms(rules, state);

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-form.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./form.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const asyncTimeout = async (seconds = 3) => {
    const millisecondTimeout = seconds * 1000;
    return new Promise((resolve) => {
        setTimeout(resolve, millisecondTimeout);
    });
};

const fakeServerRequest = async () => {
    await asyncTimeout();
    // eslint-disable-next-line no-console
    console.log('Submit Complete!');
};

const onSubmit = async () => {
    startSubmit();
    await fakeServerRequest();
    stopSubmit();
};
</script>

<template>
    <b-container>
        <b-row>
            <b-col>
                <h1>Form</h1>
                <es-form-checkbox
                    id="inline-form"
                    v-model="inline"
                    name="inline-form">
                    Inline form
                </es-form-checkbox>
            </b-col>
        </b-row>
        <b-row class="my-500 border-top pt-500">
            <b-col
                cols="12"
                lg="8">
                <es-form
                    :inline="inline"
                    @submit.stop.prevent="onSubmit">
                    <es-form-input
                        id="email"
                        v-model="state.form.email"
                        :disabled="isSubmitInProgress"
                        required>
                        <template #label> Email address </template>
                    </es-form-input>
                    <es-form-input
                        id="password"
                        v-model="state.form.password"
                        :disabled="isSubmitInProgress"
                        required
                        type="tel">
                        <template #label> Password </template>
                    </es-form-input>
                    <es-form-input
                        id="phone"
                        v-model="state.form.phone"
                        :disabled="isSubmitInProgress"
                        required
                        type="tel">
                        <template #label> Phone number </template>
                    </es-form-input>
                    <es-form-textarea
                        id="notes"
                        v-model="state.form.notes"
                        :disabled="isSubmitInProgress"
                        required>
                        <template #label> Notes </template>
                    </es-form-textarea>
                    <div class="d-flex flex-grow-1 justify-content-end mt-200">
                        <es-button
                            type="submit"
                            class="w-100 w-lg-auto"
                            :disabled="isSubmitInProgress">
                            <span class="w-100">
                                <span v-if="isSubmitInProgress">
                                    <b-spinner
                                        role="status"
                                        label="Loading" />
                                </span>
                                <span :class="{ 'sr-only': isSubmitInProgress }"> Submit </span>
                            </span>
                        </es-button>
                    </div>
                </es-form>
            </b-col>
        </b-row>
        <div class="my-500">
            <h2>EsForm props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-form.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/organisms/form.vue" />
    </b-container>
</template>
