<script setup lang="ts">
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const compSource = await import('@energysage/es-ds-components/components/es-verification-code.vue?raw');
        const docSource = await import('./verification-code.vue?raw');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const propTableRows = [
    ['v-model', 'String', 'n/a', 'Required. The v-model directive binds the input to a data property.'],
    ['charCount', 'Number', '5', 'Specifies the length of the verification code input.'],
];
const code = ref<Array<string>>([]);
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
    const rand = Array.from({ length: charCount }, () => Math.floor(Math.random() * 10).toString());

    isSubmitInProgress.value = true;
    setTimeout(() => {
        isSubmitInProgress.value = false;
    }, 1000);
    return rand;
};

</script>

<template>
    <div>
        <h1>Verification code</h1>
        <p class="mb-500">
            Uses
            <a
                href="https://v3.primevue.org/inputotp/"
                target="_blank">
                PrimeVue InputOtp
            </a>
        </p>
        <es-row class="justify-content-center my-500">
            <es-verification-code
                v-model="code"
                :char-count="charCount"
                :disabled="isSubmitInProgress" />
        </es-row>
        <es-row class="m-200 align-items-center">
            <es-col
                class="text-nowrap mb-100 mb-lg-0"
                cols="12"
                lg="6">
                <dl class="row">
                    <dd class="col-4 mr-50 mr-lg-0">Code:</dd>
                    <dt class="col-8">
                        {{ code }}
                    </dt>
                    <dd class="col-4 mr-50 mr-lg-0">Code(string):</dd>
                    <dt class="col-8">
                        {{ code.join('') }}
                    </dt>
                    <dd class="col-4 mr-50 mr-lg-0">Valid:</dd>
                    <dt class="col-8">
                        {{ isValid() }}
                    </dt>
                </dl>
            </es-col>
            <es-col
                class="text-nowrap mb-lg-0 mb-100"
                cols="12"
                lg="6">
                <es-button
                    class="mr-1"
                    :disabled="isSubmitInProgress"
                    @click="code = randomCode()">
                    random code
                </es-button>
                <es-button
                    outline
                    :disabled="isSubmitInProgress"
                    @click="code = []">
                    clear code
                </es-button>
            </es-col>
        </es-row>
    </div>
    <div>
        <div class="mb-500">
            <h2>EsVerificationCode props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/src/lib-components/es-verification-code.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/verification-code.vue" />
    </div>
</template>
