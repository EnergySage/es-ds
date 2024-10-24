<script setup>
const VIEW_SWITCHER_VALUES = {
    COMPARE: 'Compare view',
    LIST: 'List view',
};
const viewSwitcherOptions = [VIEW_SWITCHER_VALUES.LIST, VIEW_SWITCHER_VALUES.COMPARE];
const viewSwitcherActiveOption = ref(VIEW_SWITCHER_VALUES.LIST);

const viewActiveIndex = ref(0);
const viewItems = [
    {
        label: 'List view',
    },
    {
        label: 'Compare view',
    },
];

const timeframeActiveIndex = ref(0);
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

const viewActiveItemSimple = ref(0);
const viewItemsSimple = ['List view', 'Compare view'];

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
                href="https://v3.primevue.org/tabmenu/"
                target="_blank">
                PrimeVue TabMenu
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
        <es-segmented-control-new
            v-model="viewActiveIndex"
            :options="viewItems" />
        <p>
            {{ `Selected item: "${viewActiveIndex}"` }}
        </p>
        <!--<es-segmented-control-new
            v-model="viewSwitcherActiveOption"
            :options="viewSwitcherOptions" />
        <p>
            {{ `Selected item: "${viewSwitcherActiveOption}"` }}
        </p>-->
    </div>

    <div class="my-500">
        <h2>Basic example</h2>
        <es-segmented-control
            v-model="viewActiveIndex"
            class="mb-100"
            :items="viewItems" />
        <p>
            {{ `Selected item: "${viewItems[viewActiveIndex].label}"` }}
        </p>
    </div>

    <div class="my-500">
        <h2>Timeframe selector example</h2>
        <es-segmented-control
            v-model="timeframeActiveIndex"
            class="mb-100"
            :items="timeframeItems" />
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
            class="mb-100"
            disabled
            :items="viewItems" />
        <p>
            {{ `Selected item: "${viewItems[viewActiveIndex].label}"` }}
        </p>
    </div>

    <ds-doc-source
        :comp-code="compCode"
        comp-source="es-ds-components/components/es-segmented-control.vue"
        :doc-code="docCode"
        doc-source="es-ds-docs/pages/molecules/segmented-control.vue" />
</template>
