<script setup lang='ts'>
const value = ref(20);
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    // eslint-disable-next-line
    const compSource = await import('@energysage/es-ds-components/components/es-progress.vue?raw');
    const docSource = await import('./progress.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

<script setup lang='ts'>
const value = ref(20);
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

const propTableRows = [
    [
        'value',
        'Number',
        '20',
        'Required. A value between 0 and 100 representing the progress',
    ],
    [
        'height',
        'String',
        '0.3125rem',
        'Specifies height of the progress bar',
    ],
    [
        'showValue',
        'Boolean',
        'false',
        'When present, it allows the progress percentage visible on the progress bar',
    ],
];
const propTableWidths = {
    md: ['2', '2', '2', '6'],
};

if ($prism) {
    const compSource = await import('@energysage/es-ds-components/components/es-progress.vue?raw');
    const docSource = await import('./progress.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

<template>
    <div>
        <h1>
            Progress
        </h1>
        <p class="pb-200">
            Extended from <nuxt-link
                href="https://v3.primevue.org/progressbar/"
                target="_blank">
                primevue progress
            </nuxt-link>
        </p>
        <h2>
            Three Steps
        </h2>
        <div class="mb-100">
            <es-progress :value="0" />
        </div>
        <div class="mb-100">
            <es-progress :value="33" />
        </div>
        <div class="mb-100">
            <es-progress :value="67" />
        </div>
        <div class="mb-100">
            <es-progress :value="100" />
        </div>
        <h2>
            Animated Transition
        </h2>
        <div class="mb-100">
            <es-progress :value="value" />
        </div>
        <div class="mb-100">
            <button
                class="px-50"
                size="sm"
                @click="value = Math.max(value - 20, 0)">
                <icon-minus
                    height="16px"
                    width="16px" />
                <span class="sr-only">Remove</span>
                20%
            </button>
            <button
                class="px-50"
                size="sm"
                @click="value = Math.min(value + 20, 100)">
                <icon-plus
                    height="16px"
                    width="16px" />
                <span class="sr-only">Add</span>
                20%
            </button>
        </div>
        <p class="mb-300">
            value: {{ value }}
        </p>
        <div class="mb-500">
            <h2>
                EsProgress props
            </h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="propTableWidths" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-progress.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/progress.vue" />
    </div>
</template>
