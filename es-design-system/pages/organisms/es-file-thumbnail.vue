<template>
    <div>
        <h1>
            EsFileThumbnail
        </h1>
        <div class="my-5">
            <h2>
                Thumbnail for an image upload
            </h2>
            <p>
                Click to see EsPreviewModal
            </p>
            <es-file-thumbnail
                file-name="bill.jpg"
                file-size="1.3 MB"
                mime-type="image/jpg"
                file-source="https://www.eversource.com/content/images/default-source/bills/ct-sample-bill-electric-front.jpg?sfvrsn=495ad262_4"
                :percent-loaded="100"
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
        <h2>
            Thumbnails for file uploads
        </h2>
        <div class="d-md-flex flex-nowrap mb-5">
            <div class="mt-3 mt-md-0 mr-md-4">
                <es-file-thumbnail
                    file-name="bill_front.pdf"
                    file-size="2.4 MB"
                    file-source="https://www.crwwd.com/wp-content/uploads/bsk-pdf-manager/2019/09/Sample_Utility_Bill.pdf"
                    mime-type="application/pdf"
                    :percent-loaded="100"
                    @removeFile="removeFileAlert" />
            </div>
            <div class="mt-3 mt-md-0 mr-md-4">
                <es-file-thumbnail
                    file-name="bill_back.doc"
                    file-size="2.4 MB"
                    mime-type="application/doc"
                    :percent-loaded="100"
                    @removeFile="removeFileAlert" />
            </div>
            <div class="mt-3 mt-md-0 mr-md-4">
                <es-file-thumbnail
                    file-name="bill.docx"
                    file-size="2.4 MB"
                    mime-type="application/docx"
                    :percent-loaded="100"
                    @removeFile="removeFileAlert" />
            </div>
        </div>
        <h2>
            Thumbnail in loading state
        </h2>
        <div class="mb-3">
            <es-file-thumbnail
                file-name="bill.jpg"
                mime-type="image/jpg"
                :percent-loaded="percentLoaded"
                :file-source="fileSource"
                @removeFile="removeFileAlert"
                @showPreview="showPreviewModal=true" />
        </div>
        <es-button @click="showLoadingState">
            Show loading state
        </es-button>
        <es-button @click="resetLoadingState">
            Reset loading state
        </es-button>
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
            percentLoaded: 0,
            fileSource: '',
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
        async showLoadingState() {
            await this.increment(20);
            await this.increment(35);
            await this.increment(50);
            await this.increment(78);
            await this.increment(97);
            this.fileSource = 'https://www.eversource.com/content/images/default-source/bills/ct-sample-bill-electric-front.jpg?sfvrsn=495ad262_4';
            await this.increment(100);
        },
        resetLoadingState() {
            this.percentLoaded = 0;
            this.fileSource = '';
        },
        async increment(percent) {
            this.percentLoaded = percent;
            await new Promise((r) => {
                setTimeout(r, 1000);
            });
        },
    },
};
</script>
