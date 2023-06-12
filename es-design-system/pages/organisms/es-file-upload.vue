<template>
    <div>
        <h1>
            File Upload
        </h1>
        <p class="mb-450">
            Description and mention of variables
        </p>

        <div class="mb-450">
            <h2 class="mb-200">
                File Upload
            </h2>
            <es-file-upload
                :upload-urls="urls"
                :max-file-size="20"
                :file-types="['image/png', 'application/pdf']"
                @fileSizeError="fileSizeError"
                @fileTypeError="fileTypeError"
                @readyToUpload="readyToUpload"
                @uploadSuccess="uploadSuccess"
                @uploadFailure="uploadFailure"
                @fileDataRead="fileDataRead"
                @uploadProgress="uploadProgress">
                <template #cta>
                    <h2 class="d-none d-md-inline-block mb-4 text-center">
                        Drag and drop your files<br>or
                    </h2>
                    <p class="d-inline-block d-md-none">
                        <b>Don't forget:</b> Make sure to upload an image of both sides of your bill.
                    </p>
                </template>
                <template #helpText>
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
            <h2 class="mb-200">
                File Upload Collapsed
            </h2>
            <p>
                Not intended for mobile use
            </p>
            <es-file-upload
                :upload-urls="urls"
                :file-types="['image/png', 'application/pdf']"
                :collapsed="true"
                @fileSizeError="fileSizeError"
                @fileTypeError="fileTypeError"
                @readyToUpload="readyToUpload"
                @uploadSuccess="uploadSuccess"
                @uploadFailure="uploadFailure"
                @fileDataRead="fileDataRead"
                @uploadProgress="uploadProgress">
                <template #cta>
                    <h3 class="d-none d-md-inline-block mb-4 text-center">
                        Drag and drop your files or
                    </h3>
                    <p class="d-inline-block d-md-none">
                        <b>Don't forget:</b> Make sure to upload an image of both sides of your bill.
                    </p>
                </template>
                <template #helpText>
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
            <h2 class="mb-200">
                Upload Links
            </h2>
            <b-form
                @submit.stop.prevent="onSubmit">
                <es-form-input
                    id="basicExample"
                    v-model="rawUrls">
                    <template #label>
                        URLs
                    </template>
                </es-form-input>
                <div class="d-flex flex-grow-1 justify-content-end mt-100">
                    <es-button
                        type="submit"
                        class="w-100 w-lg-auto">
                        <span class="position-relative d-inline-block w-100">
                            Submit
                        </span>
                    </es-button>
                </div>
            </b-form>
        </div>
        <div>
            <h2 class="mb-200">
                Emitted Events
            </h2>
            <es-form-msg
                v-for="(event, index) in events"
                :key="index"
                :variant="event.variant"
                :message="event.msg"
                :timeout="60" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFileUpload.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-file-upload.vue" />
    </div>
</template>
<script>
export default {
    name: 'EsFileUploadDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            urls: [],
            rawUrls: '',
            events: [],
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-file-upload.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsCard.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */
            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        fileTypeError(fileNames) {
            this.events.push({ msg: `fileTypeError for file(s): ${fileNames.join(', ')}`, variant: 'danger' });
        },
        onSubmit() {
            this.urls = this.rawUrls.replace(' ', '').split(',').filter((url) => url !== '');
        },
        readyToUpload(numberOfFiles) {
            this.events.push({ msg: `readyToUpload for ${numberOfFiles} file(s)`, variant: 'success' });
        },
        uploadSuccess(fileName) {
            this.events.push({ msg: `uploadSuccess for file: ${fileName}`, variant: 'success' });
        },
        uploadFailure(fileName) {
            this.events.push({ msg: `uploadFailure for file: ${fileName}`, variant: 'danger' });
        },
        fileDataRead(file) {
            this.events.push({
                msg: `fileDataRead for file: ${file.name} type: ${file.type} size: ${file.size}`,
                variant: 'success',
            });
        },
        uploadProgress(progressData) {
            this.events.push({
                msg: `uploadProgress for file: ${progressData.fileName} percentCompleted: `
            + `${progressData.percentCompleted}`,
                variant: 'success',
            });
        },
        fileSizeError() {
            this.events.push({ msg: 'fileSizeError: exceeded max file size', variant: 'danger' });
        },
    },
};
</script>
