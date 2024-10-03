<script setup lang="ts">
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-skeleton.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./skeleton.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Skeleton</h1>
        <p>
            Extended from
            <nuxt-link
                href="https://v3.primevue.org/skeleton/"
                target="_blank">
                PrimeVue Skeleton
            </nuxt-link>
        </p>
        <b-row class="my-500">
            <b-col lg="6">
                <es-skeleton
                    height="5rem"
                    animation="wave" />
            </b-col>
        </b-row>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-skeleton.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/skeleton.vue" />
    </div>
</template>
