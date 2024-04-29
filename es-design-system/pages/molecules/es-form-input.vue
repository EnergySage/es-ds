<template>
    <div>
        <h1>
            Input
        </h1>
        <p>
            Extended from <b-link
                href="https://bootstrap-vue.org/docs/components/form-input"
                target="_blank">
                bootstrap-vue form-input
            </b-link>
        </p>
        <p>
            When using a form input, please ensure that the label style is
            <b-link
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </b-link>
        </p>

        <div class="my-450">
            <h2>
                Basic example
            </h2>
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    lg="4">
                    <es-form-input
                        id="basicExample"
                        v-model="form.firstName">
                        <template #label>
                            First name
                        </template>
                    </es-form-input>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Required
            </h2>
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    lg="4">
                    <es-form-input
                        id="requiredExample"
                        v-model="form.firstName"
                        required>
                        <template #label>
                            First name
                        </template>
                    </es-form-input>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Error state
            </h2>
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    lg="4">
                    <es-form-input
                        id="errorExample"
                        v-model="form.emailWrong"
                        :state="false">
                        <template #label>
                            Email address
                        </template>
                        <template #errorMessage>
                            Please enter a valid email address.
                        </template>
                    </es-form-input>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Success state
            </h2>
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    lg="4">
                    <es-form-input
                        id="successExample"
                        v-model="form.emailCorrect"
                        :state="true">
                        <template #label>
                            Email address
                        </template>
                        <template #errorMessage>
                            Please enter a valid email address.
                        </template>
                    </es-form-input>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Success state with message
            </h2>
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    lg="4">
                    <es-form-input
                        id="successMessageExample"
                        v-model="form.emailCorrect"
                        :state="true">
                        <template #label>
                            Email address
                        </template>
                        <template #errorMessage>
                            Please enter a valid email address.
                        </template>
                        <template #successMessage>
                            Your email address has been entered successfully.
                        </template>
                    </es-form-input>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Disabled state
            </h2>
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    lg="4">
                    <es-form-input
                        id="disabledExample"
                        v-model="form.emailCorrect"
                        disabled>
                        <template #label>
                            Email address
                        </template>
                        <template #errorMessage>
                            Please enter a valid email address.
                        </template>
                    </es-form-input>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Placeholder
            </h2>
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    lg="4">
                    <es-form-input
                        id="placeholderExample"
                        v-model="form.phoneNumber"
                        placeholder="(XXX) XXX-XXXX">
                        <template #label>
                            Phone number
                        </template>
                    </es-form-input>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Masked
            </h2>
            <p>
                This example uses an input mask to only allow entry of characters that match
                the format "(XXX) XXX-XXXX".
            </p>
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    lg="4">
                    <es-form-input
                        id="maskedExample"
                        v-model="form.maskedPhoneNumber"
                        type="maskedTel"
                        placeholder="(XXX) XXX-XXXX">
                        <template #label>
                            Phone number
                        </template>
                    </es-form-input>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Hidden label
            </h2>
            <p>
                In rare cases (e.g. a call-to-action banner on a marketing page), it is desirable
                to visually hide the input label and use the placeholder text to label the input.
                Below is an example of how to accomplish this.
            </p>
            <b-row>
                <b-col
                    class="d-lg-flex"
                    cols="12"
                    md="6"
                    lg="4">
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
                        <template #label>
                            ZIP code
                        </template>
                    </es-form-input>
                    <es-button class="ml-lg-50 w-100 w-lg-auto">
                        Submit
                    </es-button>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Prefix icon
            </h2>
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    lg="4">
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
                        <template #label>
                            ZIP code
                        </template>
                    </es-form-input>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Context message above the field
            </h2>
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    lg="4">
                    <es-form-input
                        id="contextAboveExample"
                        v-model="form.password"
                        type="password">
                        <template #extraContext>
                            Your password should be hard to guess.
                        </template>
                        <template #label>
                            Password
                        </template>
                    </es-form-input>
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <h2>
                Context message below the field
            </h2>
            <b-row>
                <b-col
                    cols="12"
                    md="6"
                    lg="4">
                    <es-form-input
                        id="contextBelowExample"
                        v-model="form.password"
                        type="password">
                        <template #message>
                            Your password should be hard to guess.
                        </template>
                        <template #label>
                            Password
                        </template>
                    </es-form-input>
                </b-col>
            </b-row>
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFormInput.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-form-input.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsFormInputDocs',
    data() {
        return {
            form: {
                emailCorrect: 'hello@energysage.com',
                emailWrong: 'hello@energy',
                firstName: '',
                password: '',
                phoneNumber: '',
                zipCode: '',
            },
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-form-input.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsFormInput.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
