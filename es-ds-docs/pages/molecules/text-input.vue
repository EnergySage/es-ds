<script setup lang="ts">
const form = ref({
    emailCorrect: 'hello@energysage.com',
    emailWrong: 'hello@energy',
    firstName: '',
    password: '',
    phoneNumber: '',
    maskedPhoneNumber: '',
    zipCode: '',
});

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-form-input.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./text-input.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const propTableRows = [
    ['v-model', 'String', 'n/a', 'Required. The v-model directive binds the input to a data property.'],
    ['id', 'String', 'n/a', 'Required. The id of the input.'],
    ['disabled', 'Boolean', 'false', 'Specifies that the input should be disabled.'],
    ['label-sr-only', 'Boolean', 'false', 'Specifies that the label should be visually hidden.'],
    ['required', 'Boolean', 'false', 'Specifies that the input is required.'],
    [
        'state',
        'Boolean',
        'null',
        'Specifies the validity of the input. Can be true (success), false (error), or null (default).',
    ],
    ['phone-mask-value', 'String', "'(999) 999-9999'", 'The mask value for the phone number input.'],
    ['type', 'String', "'text'", 'The type of input. Can be text, number, email, password, tel, or maskedTel.'],
];
</script>

<template>
    <div>
        <h1>Text input</h1>
        <p>
            Uses
            <a
                href="https://v3.primevue.org/inputtext/"
                target="_blank">
                PrimeVue InputText
            </a>
            and
            <a
                href="https://v3.primevue.org/inputmask/"
                target="_blank">
                PrimeVue InputMask
            </a>
        </p>

        <p>
            When using a form input, please ensure that the label style is
            <a
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </a>
        </p>

        <div class="my-500">
            <h2>Basic example</h2>
            <es-row>
                <es-col
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="basicExample"
                        v-model="form.firstName">
                        <template #label> First name </template>
                    </es-form-input>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Required</h2>
            <es-row>
                <es-col
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="requiredExample"
                        v-model="form.firstName"
                        required>
                        <template #label> First name </template>
                    </es-form-input>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Error state</h2>
            <es-row>
                <es-col
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="errorExample"
                        v-model="form.emailWrong"
                        :state="false">
                        <template #label> Email address </template>
                        <template #errorMessage> Please enter a valid email address. </template>
                    </es-form-input>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Success state</h2>
            <es-row>
                <es-col
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="successExample"
                        v-model="form.emailCorrect"
                        :state="true">
                        <template #label> Email address </template>
                        <template #errorMessage> Please enter a valid email address. </template>
                    </es-form-input>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Success state with message</h2>
            <es-row>
                <es-col
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="successMessageExample"
                        v-model="form.emailCorrect"
                        :state="true">
                        <template #label> Email address </template>
                        <template #errorMessage> Please enter a valid email address. </template>
                        <template #successMessage> Your email address has been entered successfully. </template>
                    </es-form-input>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Disabled state</h2>
            <es-row>
                <es-col
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="disabledExample"
                        v-model="form.emailCorrect"
                        disabled>
                        <template #label> Email address </template>
                        <template #errorMessage> Please enter a valid email address. </template>
                    </es-form-input>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Placeholder</h2>
            <es-row>
                <es-col
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="placeholderExample"
                        v-model="form.phoneNumber"
                        placeholder="(999) 999-9999">
                        <template #label> Phone number </template>
                    </es-form-input>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Masked</h2>
            <p>
                This example uses an input mask to only allow entry of characters that match the format "(999)
                999-9999".
            </p>
            <es-row>
                <es-col
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="maskedExample"
                        v-model="form.maskedPhoneNumber"
                        type="maskedTel"
                        placeholder="(999) 999-9999">
                        <template #label> Phone number </template>
                    </es-form-input>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Hidden label</h2>
            <p>
                In rare cases (e.g. a call-to-action banner on a marketing page), it is desirable to visually hide the
                input label and use the placeholder text to label the input. Below is an example of how to accomplish
                this.
            </p>
            <es-row>
                <es-col
                    class="d-lg-flex"
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="hiddenLabelExample"
                        v-model="form.zipCode"
                        autocomplete="postal-code"
                        class="flex-grow-1"
                        inputmode="numeric"
                        label-sr-only
                        maxlength="5"
                        pattern="\d*"
                        placeholder="ZIP code">
                        <template #label> ZIP code </template>
                    </es-form-input>
                    <es-button class="ml-lg-50 w-100 w-lg-auto"> Submit </es-button>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Prefix icon</h2>
            <es-row>
                <es-col
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="prefixIconExample"
                        v-model="form.zipCode"
                        autocomplete="postal-code"
                        inputmode="numeric"
                        label-sr-only
                        maxlength="5"
                        pattern="\d*"
                        placeholder="ZIP code">
                        <template #prefixIcon>
                            <icon-location />
                        </template>
                        <template #label> ZIP code </template>
                    </es-form-input>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Context message above the field</h2>
            <es-row>
                <es-col
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="contextAboveExample"
                        v-model="form.password"
                        type="password">
                        <template #extraContext> Your password should be hard to guess. </template>
                        <template #label> Password </template>
                    </es-form-input>
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Context message below the field</h2>
            <es-row>
                <es-col
                    cols="12"
                    md="6"
                    xxl="4">
                    <es-form-input
                        id="contextBelowExample"
                        v-model="form.password"
                        type="password">
                        <template #message> Your password should be hard to guess. </template>
                        <template #label> Password </template>
                    </es-form-input>
                </es-col>
            </es-row>
        </div>

        <div class="mb-500">
            <h2>EsFormInput props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-form-input.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/text-input.vue" />
    </div>
</template>
