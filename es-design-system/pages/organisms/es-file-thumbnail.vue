<template>
    <div>
        <h1>
            File thumbnail
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
                @hidden="showPreviewModal=false" />
        </div>
        <h2>
            Thumbnails for file uploads
        </h2>
        <p>
            If the file type is not .pdf, .doc, or .docx, we will display the icon for a .doc file
        </p>
        <div class="d-md-flex flex-nowrap mb-5">
            <div
                v-for="file in thumbnails"
                :key="file.name"
                class="mt-3 mt-md-0 mr-md-4">
                <es-file-thumbnail
                    :file-name="file.name"
                    file-size="2.4 MB"
                    :file-source="file.source"
                    :mime-type="file.mimeType"
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
        <es-button
            :disabled="loadingInProgress"
            @click="showLoadingState">
            Start file upload
        </es-button>
        <es-button
            :disabled="loadingInProgress"
            @click="resetLoadingState">
            Reset loading state
        </es-button>
        <h2 class="mt-5">
            Thumbnail in mobile view
        </h2>
        <b-row class="mb-3">
            <b-col
                cols="12"
                md="6">
                <div
                    v-for="file in thumbnails"
                    :key="file.name"
                    class="mt-100">
                    <es-file-thumbnail
                        :file-name="file.name"
                        file-size="2.4 MB"
                        :file-source="file.source"
                        :mime-type="file.mimeType"
                        :percent-loaded="100"
                        mobile-view
                        @removeFile="removeFileAlert" />
                </div>
            </b-col>
        </b-row>
        <div class="mt-5 mb-500">
            <h2>
                EsFileThumbnail props
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row
                    v-for="prop in fileUploadProps"
                    :key="prop.name">
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>{{ prop.name }}</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>{{ prop.default }}</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            {{ prop.description }}
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
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
            columnWidths: {
                md: ['3', '3', '6'],
            },
            showPreviewModal: false,
            percentLoaded: 0,
            fileSource: '',
            fileUploadProps: [{
                name: 'fileName',
                default: 'test.png',
                description: 'Name of the file',
            }, {
                name: 'mimeType',
                default: 'application/pdf',
                description:
                    'File type, e.g. application/pdf, image/jpg. These mime types follow the IANA Media Types.',
            }, {
                name: 'fileSource',
                default: '""',
                description: 'The source of the image or link to a file.',
            }, {
                name: 'fileSize',
                default: '""',
                description: 'File size, already formatted (e.g. 2.4 MB)',
            }, {
                name: 'previewText',
                default: 'View preview',
                description: 'Text on mobile to preview the file',
            }, {
                name: 'percentLoaded',
                default: '0',
                description: 'The progress of the upload, out of 100',
            }, {
                name: 'mobileView',
                default: 'false',
                description: 'To show the mobile view in desktop',
            }],
            thumbnails: [{
                name: 'bill_front.pdf',
                source: 'https://www.crwwd.com/wp-content/uploads/bsk-pdf-manager/2019/09/Sample_Utility_Bill.pdf',
                mimeType: 'application/pdf',
            }, {
                name: 'bill_back.doc',
                source: '',
                mimeType: 'application/doc',
            }, {
                name: 'bill.docx',
                source: '',
                mimeType: 'application/docx',
            }],
            loadingInProgress: false,
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
            this.loadingInProgress = true;
            await this.increment(20);
            await this.increment(35);
            await this.increment(50);
            await this.increment(78);
            await this.increment(97);
            this.fileSource = 'https://www.eversource.com/content/images/default-source/bills/ct-sample-bill-electric-front.jpg?sfvrsn=495ad262_4';
            await this.increment(100);
            this.loadingInProgress = false;
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
