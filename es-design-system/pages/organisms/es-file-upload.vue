<template>
    <div>
        <h1 class="mb-450">
            File Upload
        </h1>

        <div class="mb-450">
            <es-file-upload
                :upload-urls="uploadUrls"
                :file-types="['image/png', 'application/pdf']"
                @readyToUpload="readyToUpload"
                @removeFile="removeFile">
                <template #header>
                    <h2 class="mb-4 d-none d-md-block">
                        Upload a copy of your electric bill.
                    </h2>
                    <p class="d-none d-md-block">
                        <b>Don't forget:</b> Make sure to upload an image of both sides of your bill.
                    </p>
                </template>
                <template #inputCta>
                    <h2 class="d-none d-md-inline-block mb-4 text-center">
                        Drag and drop your files or
                    </h2>
                    <p class="d-inline-block d-md-none">
                        <b>Don't forget:</b> Make sure to upload an image of both sides of your bill.
                    </p>
                </template>
                <template #inputHelpText>
                    <p class="d-none d-md-inline-block">
                        Please upload your file as a PDF or JPG.
                    </p>
                    <p class="d-inline-block d-md-none mb-0">
                        File types: PDF or JPG
                    </p>
                </template>
            </es-file-upload>
        </div>
        <div class="mb-450">
            <h2>
                EsFileInput props
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row
                    v-for="prop in fileUploadProps"
                    :key="prop.name">
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>{{ prop.name }}</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>{{ prop.default }}</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            {{ prop.description }}
                        </dd>
                    </dl>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>
        <div class="mb-450">
            <h2>
                EsFileInput event listeners
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row
                    v-for="eventListener in fileUploadEventListeners"
                    :key="eventListener.name">
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>{{ eventListener.name }}</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Payload
                        </dt>
                        <dd>
                            <code>{{ eventListener.payload }}</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            {{ eventListener.description }}
                        </dd>
                    </dl>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFileInput.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-file-input.vue" />
    </div>
</template>
<script>
export default {
    name: 'EsFileUploadDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            uploadUrls: [],
            fileUploadProps: [{
                name: 'uploadUrls',
                default: '[]',
                description: 'A list of URLs to upload files to. When the number of files ready to upload matches '
                + 'the number of URLs, the component will begin uploading.',
            },
            {
                name: 'fileTypes',
                default: 'None',
                description: 'An array of accepted mime types for a file. If no argument passed, all file types are '
                + 'accepted. These mime types follow the IANA Media Types.',
            },
            ],
            fileUploadEventListeners: [{
                name: '@readyToUpload',
                payload: 'Number',
                description: 'Called when the component is ready to upload files. The payload is the number of files '
                + 'that are ready to upload.',
            },
            {
                name: '@removeFile',
                payload: 'String',
                description: 'Called when the user clicks the remove button on a file. The payload is the name of the '
                + 'file that was removed.',
            }],
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-file-upload.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsFileUpload.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */
            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        readyToUpload(fileObjects) {
            this.uploadUrls = fileObjects.map(({ name }) => ({
                name,
                uploadUrl: `https://energysage.free.beeceptor.com/${name}`,
            }));
        },
        removeFile(fileName) {
            this.uploadUrls = this.uploadUrls.filter((file) => file.name !== fileName);
        },
    },
};
</script>
