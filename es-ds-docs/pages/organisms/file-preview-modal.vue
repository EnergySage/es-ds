<script setup lang="ts">
const visible = ref(false);

const propTableRows = [
    ['visible', 'Boolean', 'false', 'Set to true to show the modal'],
    ['file-name', 'String', "'test.png'", 'The name of the file'],
    ['file-source', 'String', "''", 'The URL of the file'],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-file-preview-modal.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./file-preview-modal.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div class="h-100">
        <h1>File preview modal</h1>

        <div class="my-500">
            <es-button @click="visible = true"> Show preview modal </es-button>
        </div>

        <es-file-preview-modal
            file-source="https://www.eversource.com/content/images/default-source/bills/ct-sample-bill-electric-back.jpg?sfvrsn=e75bd262_4"
            file-name="bill.png"
            :visible="visible"
            @hidden="visible = false" />

        <div class="mb-500">
            <h2>es-file-preview-modal props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-file-preview-modal.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/organisms/file-preview-modal.vue" />
    </div>
</template>
