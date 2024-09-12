<script setup>
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const compSource = await import('@energysage/es-ds-components/components/es-reviews-io-card-carousel.vue?raw');
        const docSource = await import('./reviews-io-card-carousel.vue?raw');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Reviews.io card carousel</h1>
        <p>This is a third-party widget provided by Reviews.io with custom styling on our end.</p>

        <div class="my-500">
            <es-reviews-io-card-carousel />
        </div>
    </div>

    <ds-doc-source
        :comp-code="compCode"
        comp-source="es-ds-components/components/es-reviews-io-card-carousel.vue"
        :doc-code="docCode"
        doc-source="es-ds-docs/pages/organisms/reviews-io-carousel.vue" />
</template>
