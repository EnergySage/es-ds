<script setup lang="ts">
const propTableRows = [
    ['rating', 'Number', '0', 'Starting rating value 0-5, with .5 values available in read only mode'],
    ['rounded', 'Boolean', 'true', 'Round rating to nearest .5'],
    ['read-only', 'Boolean', 'true', 'Disable changing the rating'],
    ['width', 'String', '20px', 'Icon width'],
    ['height', 'String', '20px', 'Icon height'],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-rating.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./rating.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const rating1Val = ref(0);
</script>

<template>
    <div>
        <h1>Rating</h1>
        <p>
            Extended from
            <nuxt-link
                href="https://v3.primevue.org/rating/"
                target="_blank">
                PrimeVue Rating
            </nuxt-link>
        </p>
        <div class="my-500">
            <h2>Form input</h2>
            <es-rating
                v-model="rating1Val"
                :read-only="false" />
            <h2 class="mt-500">Static display</h2>
            <div
                v-for="i in 11"
                :key="i">
                <es-rating :rating="(i - 1) / 2" />
            </div>
        </div>

        <div class="my-500">
            <h2>Background variations</h2>
            <div class="d-flex flex-column flex-md-row">
                <div class="bg-gray-50 justify-content-center d-flex p-200 mb-200 mb-md-0 mr-md-200">
                    <es-rating :rating="4.5" />
                </div>
                <div class="bg-blue-50 justify-content-center d-flex p-200 mb-200 mb-md-0 mr-md-200">
                    <es-rating :rating="4.5" />
                </div>
                <div class="bg-blue-900 justify-content-center d-flex p-200 mb-200 mb-md-0 mr-md-200">
                    <es-rating :rating="4.5" />
                </div>
            </div>
        </div>

        <div class="my-500">
            <h2>EsRating props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-rating.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/rating.vue" />
    </div>
</template>

<style lang="scss">
.code-holder {
    .code-input {
        appearance: textfield;

        &.lg {
            font-size: 3rem;
            height: 6rem;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            appearance: none;
        }
    }
}
</style>
