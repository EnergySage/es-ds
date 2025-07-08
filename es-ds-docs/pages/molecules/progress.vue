<script setup lang="ts">
const animatedProgressExample = ref(20);
const showValueExample = ref(20);

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

const propTableRows = [
    [
        'formatter',
        'Function',
        '(val: number) => `${val}%`',
        'Allows controlling the display of the value displayed when showValue is set to true.',
    ],
    ['height', 'String', '0.125rem', 'Specifies height of the progress bar.'],
    ['showCircle', 'Boolean', 'true', 'Set to false to hide the indicator circle.'],
    ['showValue', 'Boolean', 'false', 'When present, it shows the progress bar value below the bar.'],
    ['value', 'Number', 'n/a', 'Required. A value between 0 and 100 representing the progress.'],
    ['valueClass', 'String', "''", 'Allows control of styling for the value displayed when showValue is set to true.'],
];
const propTableWidths = {
    md: ['2', '2', '3', '5'],
};

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-progress.vue?raw');

        const docSource = await import('./progress.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Progress</h1>
        <p>
            Extended from
            <nuxt-link
                href="https://v3.primevue.org/progressbar/"
                target="_blank">
                PrimeVue ProgressBar
            </nuxt-link>
        </p>

        <div class="my-500">
            <h2>Basic example</h2>
            <es-progress
                class="mb-100"
                :value="0" />
            <es-progress
                class="mb-100"
                :value="33" />
            <es-progress
                class="mb-100"
                :value="67" />
            <es-progress
                class="mb-100"
                :value="100" />
        </div>

        <div class="my-500">
            <h2>Animated transition</h2>
            <p>
                If the value of the progress bar is changed programmatically, it will animate to the new value. Try
                clicking one of the buttons below to add or subtract from the progress bar's value.
            </p>

            <es-progress
                class="mb-100"
                :value="animatedProgressExample" />

            <div class="mb-100">
                <es-button
                    class="px-50 mr-50"
                    size="sm"
                    @click="animatedProgressExample = Math.max(animatedProgressExample - 10, 0)">
                    <icon-minus
                        height="16px"
                        width="16px" />
                    <span class="sr-only">Remove</span>
                    10%
                </es-button>
                <es-button
                    class="px-50"
                    size="sm"
                    @click="animatedProgressExample = Math.min(animatedProgressExample + 10, 100)">
                    <icon-plus
                        height="16px"
                        width="16px" />
                    <span class="sr-only">Add</span>
                    10%
                </es-button>
            </div>
        </div>

        <div class="my-500">
            <h2>Showing the value</h2>
            <p>
                These examples show how to make the value of the progress bar visible, and how to format it to display
                in whatever way you want.
            </p>

            <es-progress
                class="mb-100"
                :value="showValueExample"
                show-value />

            <es-progress
                class="mb-100"
                :formatter="(val: number) => `${(val * 10) / 100} of 10`"
                :value="showValueExample"
                show-value />

            <es-progress
                class="mb-100"
                :formatter="(val: number) => `${(val * 10) / 100}/10`"
                :value="showValueExample"
                value-class="font-weight-bold"
                show-value />

            <div class="mb-100">
                <es-button
                    class="px-50 mr-50"
                    size="sm"
                    @click="showValueExample = Math.max(showValueExample - 10, 0)">
                    <icon-minus
                        height="16px"
                        width="16px" />
                    <span class="sr-only">Remove</span>
                    10%
                </es-button>
                <es-button
                    class="px-50"
                    size="sm"
                    @click="showValueExample = Math.min(showValueExample + 10, 100)">
                    <icon-plus
                        height="16px"
                        width="16px" />
                    <span class="sr-only">Add</span>
                    10%
                </es-button>
            </div>
        </div>

        <div class="my-500">
            <h2>Customized height</h2>
            <p>The height of the progress bar is customizable. The indicator circle will scale proportionally.</p>
            <es-progress
                class="mb-100"
                height="0.25rem"
                :value="0" />
            <es-progress
                class="mb-100"
                height="0.25rem"
                :value="33" />
            <es-progress
                class="mb-100"
                height="0.25rem"
                :value="67" />
            <es-progress
                class="mb-100"
                height="0.25rem"
                :value="100" />
        </div>

        <div class="my-500">
            <h2>Hide indicator circle</h2>
            <p>This example shows how to hide the indicator circle for a simpler progress bar.</p>
            <es-progress
                class="mb-200"
                height="0.375rem"
                :show-circle="false"
                :value="0" />
            <es-progress
                class="mb-200"
                height="0.375rem"
                :show-circle="false"
                :value="33" />
            <es-progress
                class="mb-200"
                height="0.375rem"
                :show-circle="false"
                :value="67" />
            <es-progress
                class="mb-200"
                height="0.375rem"
                :show-circle="false"
                :value="100" />
        </div>

        <div class="mb-500">
            <h2>EsProgress props</h2>
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
