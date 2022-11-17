<template>
    <b-form
        novalidate
        @submit.prevent="submitLogin">
        <h1>
            Verification Code
        </h1>
        <div class="my-5">
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
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsVerificationCode.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-verification-code.vue" />
    </b-form>
</template>
<script>
import { EsVerificationCode } from '@energysage/es-vue-base';

export default {
    name: 'EsVerificationCodeDocs',
    components: {
        EsVerificationCode,
    },
    data() {
        return {
            localCode: '',
            isValid: false,
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const docSource = await import('!raw-loader!./es-verification-code.vue');
        // eslint-disable-next-line max-len
        const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsVerificationCode.vue');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        this.docCode = this.$prism.normalizeCode(docSource.default);
        this.compCode = this.$prism.normalizeCode(compSource.default);
        this.$prism.highlight(this);
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
