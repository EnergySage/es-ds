<template>
    <div>
        <h1>Badge</h1>
        <p>Extended from <a href="https://v3.primevue.org/badge/" target="_blank"> PrimeVue Badge </a></p>

        <div class="my-500">
            <es-badge> Primary </es-badge>

            <es-badge class="ml-50" variant="success"> Success </es-badge>

            <es-badge class="ml-50" variant="warning"> Warning </es-badge>

            <es-badge class="ml-50" variant="danger"> Danger </es-badge>

            <es-badge class="ml-50" variant="info"> Info </es-badge>

            <es-badge class="ml-50" variant="dark"> Dark </es-badge>
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-badge.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/badge.vue"
        />
    </div>
</template>

<script setup>
const { $prism } = useNuxtApp();
const compCode = ref("");
const docCode = ref("");

if ($prism) {
    const compSource = await import("@energysage/es-ds-components/components/es-badge.vue?raw");
    const docSource = await import("./badge.vue?raw");
    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>
