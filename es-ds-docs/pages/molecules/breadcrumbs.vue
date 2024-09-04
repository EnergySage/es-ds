<script setup>
const items = [
    {
        text: 'Home',
        to: '/',
    },
    {
        text: 'Atoms',
        to: '/atoms',
    },
    {
        text: 'Typography',
        active: true,
    },
];
const longerItems = [
    {
        href: 'https://www.energysage.com/',
        target: '_blank',
        text: 'EnergySage',
    },
    {
        href: 'https://www.energysage.com/local-data/solar-panel-cost/',
        target: '_blank',
        text: 'Cost of solar',
    },
    {
        active: true,
        href: 'https://www.energysage.com/local-data/solar-panel-cost/ca/',
        text: 'Solar cost in California',
    },
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const compSource = await import('@energysage/es-ds-components/components/es-breadcrumbs.vue?raw');
    const docSource = await import('./breadcrumbs.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

<template>
    <div>
        <h1>
            Breadcrumbs
        </h1>
        <p>
            Extended from <a
                href="https://v3.primevue.org/breadcrumb/"
                target="_blank">
                PrimeVue Breadcrumb
            </a>
        </p>

        <div class="my-500">
            <es-breadcrumbs :items="items" />
        </div>
        <div class="my-500">
            <es-breadcrumbs :items="longerItems" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-breadcrumbs.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/breadcrumbs.vue" />
    </div>
</template>
