<template>
    <b-form novalidate>
        <h1>
            Verification Code
        </h1>
        <es-verification-code
            v-model="code"
            :char-count="charCount"
            @valid-code="checkValidation" />
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
                <es-button @click="code = randomCode()">
                    random code
                </es-button>
                <es-button
                    outline
                    @click="code = Array(charCount).fill('')">
                    clear code
                </es-button>
            </b-col>
        </b-row>
    </b-form>
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
        checkValidation(valid) {
            // eslint-disable-next-line no-console
            console.log('code is valid', valid);
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
