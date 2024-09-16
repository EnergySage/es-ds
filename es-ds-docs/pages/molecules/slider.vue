<script setup>
const model = ref(null);
const min = ref(0);
const max = ref(1000);
const step = ref(50);
const ariaLabel = ref('Sample aria-label');

const propTableRows = [
    ['min', 'Number', '0', 'Required. Minimum value of slider.'],
    ['max', 'Number', '100', 'Required. Maximum value of slider.'],
    ['step', 'Number', '1', 'Step factor to increment/decrement the value.'],
    ['ariaLabel', 'String', '"Pick a number"', 'Aria-label for slider handle.'],
    ['labelFormatter', 'Function', 'n/a', 'Function that modifies label value.'],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const compSource = await import('@energysage/es-ds-components/components/es-slider.vue?raw');
        const docSource = await import('./slider.vue?raw');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Slider</h1>

        <p class="pb-200">
            Extended from
            <nuxt-link
                href="https://v3.primevue.org/slider/"
                target="_blank">
                PrimeVue Slider
            </nuxt-link>
        </p>

        <div class="my-500">
            <es-slider
                v-model="model"
                :min="min"
                :max="max"
                :step="step"
                :aria-label="ariaLabel"
                :label-formatter="(val) => `$${val}`" />
        </div>

        <div class="mb-500">
            <h2>Slider props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-slider.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/slider.vue" />
    </div>
</template>
