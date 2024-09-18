<script setup>
definePageMeta({
    layout: 'footer',
});

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-footer.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);

        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./footer.vue?raw');
        docCode.value = $prism.normalizeCode(docSource.default);

        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>
            EsFooter component
        </h1>
        <p>
            The footer is a specialized component intended for use outside the normal content
            container. See below.
        </p>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-footer.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/organisms/footer.vue" />
    </div>
</template>
