<template>
    <div>
        <h1>
            EsFileThumbnail
        </h1>
        <div class="d-md-flex flex-nowrap">
            <div class="mr-md-4">
                <es-file-thumbnail
                    file-name="bill.jpg"
                    file-size="1.3 MB"
                    mime-type="image/jpg"
                    file-source="https://www.eversource.com/content/images/default-source/bills/ct-sample-bill-electric-front.jpg?sfvrsn=495ad262_4"
                    success
                    @removeFile="removeFileAlert"
                    @showPreview="showPreviewModal=true" />
                <es-file-preview-modal
                    file-source="https://www.eversource.com/content/images/default-source/bills/ct-sample-bill-electric-back.jpg?sfvrsn=e75bd262_4"
                    file-name="bill.png"
                    :visible="showPreviewModal"
                    @hidden="showPreviewModal=false">
                    <template #desktop-header>
                        Preview your image uploads.
                        <div class="font-size-base font-weight-normal pt-3">
                            Make sure that your images are clear and readable.
                        </div>
                    </template>
                </es-file-preview-modal>
            </div>
            <div class="mt-3 mt-md-0 mr-md-4">
                <es-file-thumbnail
                    file-name="bill_front.pdf"
                    file-size="2.4 MB"
                    mime-type="application/pdf"
                    success
                    @removeFile="removeFileAlert" />
            </div>
            <div class="mt-3 mt-md-0 mr-md-4">
                <es-file-thumbnail
                    file-name="bill_back.doc"
                    file-size="2.4 MB"
                    mime-type="application/doc"
                    success
                    @removeFile="removeFileAlert" />
            </div>
            <div class="mt-3 mt-md-0 mr-md-4">
                <es-file-thumbnail
                    file-name="bill.docx"
                    file-size="2.4 MB"
                    mime-type="application/docx"
                    success
                    @removeFile="removeFileAlert" />
            </div>
            <div class="mt-3 mt-md-0 mr-md-4 mb-450">
                <es-file-thumbnail
                    file-name="bill.png"
                    mime-type="image/png"
                    :success="false"
                    :percent-loaded="35"
                    @removeFile="removeFileAlert" />
            </div>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFileThumbnail.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-file-thumbnail.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsFileThumbnailDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            showPreviewModal: false,
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-file-thumbnail.vue');
            const compSource = await import(
                '!raw-loader!@energysage/es-vue-base/src/lib-components/EsFileThumbnail.vue'
            );
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */
            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        removeFileAlert() {
            // eslint-disable-next-line no-alert
            alert('remove file triggered');
        },
    },
};
</script>
