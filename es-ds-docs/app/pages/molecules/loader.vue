<script setup lang="ts">
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-loader.vue?raw');

        const docSource = await import('./loader.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>es loader</h1>

        <div class="my-500">
            <p>Example without any loading text (default):</p>
            <es-loader></es-loader>

            <p>Example with some loading text:</p>
            <es-loader>
                <span>Loading your offer</span>
            </es-loader>
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-loader.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/loader.vue" />
    </div>
</template>
