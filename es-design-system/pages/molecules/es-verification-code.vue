<template>
    <b-form
        novalidate
        @submit.prevent="submitLogin">
        <h1>
            Verification Code
        </h1>
        <es-verification-code
            @update-code="updateCode"
            @valid-code="validCode" />
        <dl class="row mt-4">
            <dt class="col-6">
                Code: {{ localCode }}
            </dt>
            <dt class="col-6">
                Valid: {{ isValid }}
            </dt>
        </dl>
    </b-form>
</template>
<script>
import { EsVerificationCode } from '@energysage/es-vue-base';

export default {
    name: 'EsBreadcrumbsDocs',
    components: {
        EsVerificationCode,
    },
    data() {
        return {
            localCode: '',
            isValid: false,
        };
    },
    methods: {
        updateCode(event) {
            // eslint-disable-next-line no-console
            console.log(`Code Update: ${event}`);
            this.localCode = event;
            this.isValid = false;
        },
        validCode(event) {
            // eslint-disable-next-line no-console
            console.log(`Code is Valid: ${event}`);
            this.localCode = event;
            this.isValid = true;
        },
    },
};
</script>
