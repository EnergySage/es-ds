<script setup lang="ts">

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const compSource = await import('@energysage/es-ds-components/components/es-verification-code.vue?raw');
    const docSource = await import('./verification-code.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}

const propTableRows = [
    [
        'v-model',
        'String',
        'n/a',
        'Required. The v-model directive binds the otpinput to a data property.',
    ],
];
const code = ref();
const isSubmitInProgress = ref(false);

const charCount: number = 5;

const isValid = () => {
    if (code.value && code.value.length === charCount) {
        return true;
    }
    return false;
};

const randomCode = () => {
    // Randomly generates an array of numbers 0-9
    const rand = Array.from(
        { length: charCount },
        () => Math.floor(Math.random() * 10).toString(),
    );

    // eslint-disable-next-line no-console
    console.log('Generated', rand);
    isSubmitInProgress.value = true;
    setTimeout(() => {
        isSubmitInProgress.value = false;
    }, 1000);
    return rand.join('');
};

// eslint-disable-next-line no-return-assign
const clearCode = () => {
    isSubmitInProgress.value = true;
    setTimeout(() => {
        isSubmitInProgress.value = false;
    }, 1000);
    return '';
};

</script>

<template>
    <div>
        <h1>
            Verification code
        </h1>
        <p>{{ code }}</p>
        <p class="mb-500">
            Uses <a
                href="https://v3.primevue.org/inputotp/"
                target="_blank">
                PrimeVue InputOtp
            </a>
        </p>
        <b-row class="justify-content-center my-500">
            <es-verification-code
                v-model="code"
                :disabled="isSubmitInProgress" />
        </b-row>
        <b-row class="mt-200 align-items-center">
            <b-col
                class="mb-100 mb-lg-0"
                cols="10"
                lg="4">
                <dl class="row">
                    <dd class="col-4">
                        Code:
                    </dd>
                    <dt class="col-8">
                        {{ code && code.split('') }}
                    </dt>
                    <dd class="col-4">
                        Code(string):
                    </dd>
                    <dt class="col-8">
                        {{ code }}
                    </dt>
                    <dd class="col-4">
                        Valid:
                    </dd>
                    <dt class="col-8">
                        {{ isValid() }}
                    </dt>
                </dl>
            </b-col>
            <b-col
                class="text-right"
                cols="12"
                lg="4">
                <es-button
                    class="mr-1"
                    :disabled="isSubmitInProgress"
                    @click="code = randomCode()">
                    random code
                </es-button>
                <es-button
                    outline
                    :disabled="isSubmitInProgress"
                    @click="code = clearCode()">
                    clear code
                </es-button>
            </b-col>
        </b-row>
    </div>
    <div>
        <div class="mb-500">
            <h2>
                EsVerification props
            </h2>
            <ds-prop-table
                :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/src/lib-components/es-verification-code.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/verification-code.vue" />
    </div>
</template>
