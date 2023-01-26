<template>
    <div>
        <h1>
            Verification Code
        </h1>
        <b-row class="justify-content-center my-5">
            <b-col
                cols="12"
                lg="6">
                <h2 class="text-center">
                    Large
                </h2>
                <es-verification-code
                    v-model="code"
                    :disabled="isSubmitInProgress"
                    :char-count="charCount"
                    @valid-code="checkValidation" />
            </b-col>
        </b-row>
        <b-row class="my-5">
            <b-col
                cols="12"
                lg="3">
                <h2>
                    Medium
                </h2>
                <es-verification-code
                    v-model="code"
                    size="md"
                    :char-count="charCount"
                    :disabled="isSubmitInProgress"
                    @valid-code="checkValidation" />
            </b-col>
        </b-row>
        <b-row class="mt-4 align-items-center">
            <b-col
                class="mb-3 mb-lg-0"
                cols="6"
                lg="4">
                <dl class="row">
                    <dd class="col-3">
                        Code:
                    </dd>
                    <dt class="col-9">
                        {{ code }}
                    </dt>
                    <dd class="col-3">
                        Code(string):
                    </dd>
                    <dt class="col-9">
                        {{ code.join('') }}
                    </dt>
                    <dd class="col-3">
                        Valid:
                    </dd>
                    <dt class="col-9">
                        {{ isValid }}
                    </dt>
                </dl>
            </b-col>
            <b-col
                class="text-right"
                cols="12"
                lg="4">
                <es-button
                    :disabled="isSubmitInProgress"
                    @click="code = randomCode()">
                    random code
                </es-button>
                <es-button
                    outline
                    :disabled="isSubmitInProgress"
                    @click="code = Array(charCount).fill('')">
                    clear code
                </es-button>
            </b-col>
        </b-row>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsVerificationCode.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-verification-code.vue" />
    </div>
</template>
<script>
import { EsVerificationCode, EsButton } from '@energysage/es-vue-base';

const CHARACTER_COUNT = 5;

export default {
    name: 'EsVerificationCodeDocs',
    components: {
        EsButton,
        EsVerificationCode,
    },
    data() {
        return {
            code: Array(CHARACTER_COUNT).fill(''),
            charCount: CHARACTER_COUNT,
            isSubmitInProgress: false,
            isValid: false,
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-verification-code.vue');
            // eslint-disable-next-line max-len
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsVerificationCode.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        checkValidation(valid) {
            // eslint-disable-next-line no-console
            console.log('code is valid', valid);

            // Simulate server transaction
            if (valid) {
                // eslint-disable-next-line no-console
                console.log('submitting to server');

                this.isSubmitInProgress = true;
                setTimeout(() => {
                    this.isSubmitInProgress = false;
                }, 1000);
            }

            this.isValid = valid;
        },
        randomCode() {
            // Randomly generates an array of numbers 0-9
            const rand = Array.from(
                { length: this.charCount },
                () => Math.floor(Math.random() * this.charCount).toString(),
            );

            // eslint-disable-next-line no-console
            console.log('Generated', rand);
            return rand;
        },
    },
};
</script>
