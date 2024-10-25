<script setup>
const viewActiveIndex = ref(0);
const viewItems = [
    {
        label: 'List view',
    },
    {
        label: 'Compare view',
    },
];

const timeframeActiveIndex = ref(1);
const timeframeItems = [
    {
        label: '90 days',
    },
    {
        label: '3 months',
    },
    {
        label: '1 year',
    },
];

const esSegmentedControlProps = [
    ['ariaLabel', 'String', 'n/a', 'Required. A description of the purpose of selecting an option. It will be hidden visually but read aloud by screen readers.'],
    ['disabled', 'Boolean', 'false', `When set to true, it specifies that the element should be disabled.`],
    ['options', 'Array', 'n/a', `Required. An array of items to display as the available options. Each item should be an object with a "label" string.`],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-segmented-control.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./segmented-control.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Segmented control</h1>
        <p>
            Extended from
            <a
                href="https://v3.primevue.org/selectbutton/"
                target="_blank">
                PrimeVue SelectButton
            </a>
        </p>
        <p>
            Per our writing guidelines, please ensure the title is in
            <a
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </a>
        </p>
    </div>

    <div class="my-500">
        <h2>Basic example</h2>
        <es-segmented-control
            v-model="viewActiveIndex"
            aria-label="Select how you want to view your quotes"
            class="mb-100"
            :options="viewItems" />
        <p>
            {{ `Selected item: "${viewItems[viewActiveIndex].label}"` }}
        </p>
    </div>

    <div class="my-500">
        <h2>Timeframe selector example</h2>
        <es-segmented-control
            v-model="timeframeActiveIndex"
            aria-label="Select the timeframe to view"
            class="mb-100"
            :options="timeframeItems" />
        <p class="mb-200">
            {{ `Selected item: "${timeframeItems[timeframeActiveIndex].label}"` }}
        </p>
        <p>Since the segmented control uses <code>v-model</code>, you can also control it from other places:</p>
        <div>
            <es-button
                class="mr-200"
                :disabled="timeframeActiveIndex === 0"
                inline
                size="sm"
                variant="link"
                @click="timeframeActiveIndex = 0">
                Set to 90 days
            </es-button>
            <es-button
                class="mr-200"
                :disabled="timeframeActiveIndex === 1"
                inline
                size="sm"
                variant="link"
                @click="timeframeActiveIndex = 1">
                Set to 3 months
            </es-button>
            <es-button
                :disabled="timeframeActiveIndex === 2"
                inline
                size="sm"
                variant="link"
                @click="timeframeActiveIndex = 2">
                Set to 1 year
            </es-button>
        </div>
    </div>

    <div class="my-500">
        <h2>Disabled example</h2>
        <es-segmented-control
            v-model="viewActiveIndex"
            aria-label="Select the timeframe to view"
            class="mb-100"
            disabled
            :options="viewItems" />
        <p>
            {{ `Selected item: "${viewItems[viewActiveIndex].label}"` }}
        </p>
    </div>

    <div class="my-500">
            <h2>EsSegmentedControl props</h2>
            <ds-prop-table :rows="esSegmentedControlProps" />
        </div>

    <ds-doc-source
        :comp-code="compCode"
        comp-source="es-ds-components/components/es-segmented-control.vue"
        :doc-code="docCode"
        doc-source="es-ds-docs/pages/molecules/segmented-control.vue" />
</template>
