<script setup lang="ts">
const value = ref(10);
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

const propTableRows = [
    ['height', 'String', '50px', 'Specifies height of the progress circle'],
    ['value', 'Number', '10', 'Required. A value between 0 and 100 representing the progress'],
    [
        'showPercentage',
        'Boolean',
        'true',
        'When present, it allows the progress percentage in the center of progress circle',
    ],
];
const propTableWidths = {
    md: ['3', '2', '2', '5'],
    lg: ['2', '2', '2', '6'],
};

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-progress-circle.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./progress-circle.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Progress circle</h1>
        <p class="pb-200">
            Extended from
            <nuxt-link
                href="https://github.com/EnergySage/es-cdgm/blob/main/frontend/components/CircularProgress.vue"
                target="_blank">
                <code>es-cdgm</code> codebase
            </nuxt-link>
        </p>
        <es-progress-circle
            class="mb-100"
            :value="value"
            height="100px" />
        <div class="d-flex flex-nowrap mb-400">
            <es-button
                size="sm"
                class="mr-50"
                @click="value = value - 10">
                -10%
            </es-button>
            <es-button
                size="sm"
                @click="value = value + 10">
                +10%
            </es-button>
        </div>
        <div class="mb-500">
            <h2>EsProgressCircle props</h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="propTableWidths" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-progress-circle.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/progress-circle.vue" />
    </div>
</template>
