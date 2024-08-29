<template>
    <div>
        <h1>
            Carousel
        </h1>
        <p class="mb-500">
            Uses <a
                href="https://v3.primevue.org/carousel/"
                target="_blank">
                PrimeVue Carousel
            </a>
        </p>

        <div class="my-500">
           <es-carousel :items="items"/>
        </div>

        <div class="mb-500">
            <h2>
                EsCarousel props
            </h2>
            <ds-prop-table
                :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/src/lib-components/es-radio-button.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/radio-button.vue" />
    </div>
</template>

<script setup lang="ts">

const items = ref([ "1", "2", "3", "4", "5" ]);

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref("");

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const compSource = await import('@energysage/es-ds-components/components/es-carousel.vue?raw');
    const docSource = await import("./carousel.vue?raw");
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}

const propTableRows = [
    [
        'name',
        'type',
        'default',
        'description',
    ],
];
</script>
