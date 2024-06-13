<template>
    <div class="h-100">
        <h1>
            File preview modal
        </h1>

        <div class="my-500">
            <es-button @click="visible = true">
                Show preview modal
            </es-button>
        </div>

        <es-file-preview-modal
            file-source="https://www.eversource.com/content/images/default-source/bills/ct-sample-bill-electric-back.jpg?sfvrsn=e75bd262_4"
            file-name="bill.png"
            :visible="visible"
            @hidden="visible=false" />

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFileThumbnail.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-file-thumbnail.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsFilePreviewModalDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            visible: false,
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-file-preview-modal.vue');
            const compSource = await import(
                '!raw-loader!@energysage/es-vue-base/src/lib-components/EsFilePreviewModal.vue'
            );
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */
            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
