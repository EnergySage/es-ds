<script setup>
const startValue = 150;
const sliderVal = ref(startValue);
const min = ref(0);
const max = ref(1000);
const step = ref(50);
const ariaLabel = ref('Sample aria-label');

const propTableRows = [
    ['starting-value', 'Number', '1', 'Required. Initial value of slider.'],
    ['min', 'Number', '1', 'Required. Minimum value of slider.'],
    ['max', 'Number', '100', 'Required. Maximum value of slider.'],
    ['step', 'Number', '1', 'Step factor to increment/decrement the value.'],
    ['aria-label', 'String', '"Pick a number"', 'Aria-label for slider handle.'],
    ['label-formatter', 'Function', 'n/a', 'Function that modifies label value.'],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-slider.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./slider.vue?raw');

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
                v-model="sliderVal"
                :min="min"
                :max="max"
                :step="step"
                :starting-value="startValue"
                :aria-label="ariaLabel"
                :label-formatter="(val) => `$${val}`" />
            <pre>
                sliderVal: {{ sliderVal }}
            </pre>
        </div>

        <div class="mb-500">
            <h2>EsSlider props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-slider.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/slider.vue" />
    </div>
</template>
