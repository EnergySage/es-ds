<script setup>
definePageMeta({
    layout: 'full-width-component',
});

const propTableRows = [['errorType', 'String', 'n/a', 'The type of error to display.']];
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        /* eslint-disable import/no-self-import */
        const compSource = await import('@energysage/es-ds-components/components/es-error-page.vue?raw');
        const docSource = await import('./error-page.vue?raw');
        /* eslint-enable import/no-self-import */

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Error page</h1>
        <p>
            The Error Page component is intended to be used in error pages across nuxt apps. The four types of error
            codes explicitly handled include 403, 404, 500 and 503. This component is intended to take over the entire
            page between the header and footer.
        </p>
        <div class="my-500">
            <h2>Error 403</h2>
            <es-error-page error-type="403" />
        </div>
        <div class="my-500">
            <h2>Error 404</h2>
            <es-error-page error-type="404" />
        </div>
        <div class="my-500">
            <h2>Error 500</h2>
            <es-error-page error-type="500" />
        </div>
        <div class="my-500">
            <h2>Error 503</h2>
            <es-error-page error-type="503" />
        </div>
        <div class="my-500">
            <h2>Error 418 (and how other errors look)</h2>
            <es-error-page error-type="418" />
        </div>
        <div class="mb-500">
            <h2>EsErrorPage props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/src/lib-components/es-error-page.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/organisms/error-page.vue" />
    </div>
</template>
