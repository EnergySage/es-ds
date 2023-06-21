<template>
    <div>
        <h1>
            File Input
        </h1>

        <div class="mb-450">
            <es-file-input
                :upload-urls="urls"
                :max-file-size-mb="10"
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
            </es-file-input>
        </div>
        <div class="mb-450">
            <h2 class="mb-200">
                File Input Collapsed
            </h2>
            <es-file-input
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
                    <h3 class="d-none d-md-block mb-4 text-center">
                        Drag and drop your files or
                    </h3>
                    <p class="d-block d-md-none text-center">
                        <b>Don't forget:</b> Make sure to upload an image of both sides of your bill.
                    </p>
                </template>
                <template #helpText>
                    <p class="d-none d-md-block">
                        Please upload your file as a PDF or JPG.
                    </p>
                    <p class="d-md-none mb-0">
                        File types: PDF or JPG
                    </p>
                </template>
            </es-file-input>
        </div>
        <div
            v-if="numberOfFiles"
            class="mb-450">
            <h2 class="mb-200">
                Upload Links
            </h2>
            <b-form
                @submit.stop.prevent="onSubmit">
                <es-form-input
                    id="basicExample"
                    v-model="rawUrls">
                    <template #label>
                        I need {{ numberOfFiles }} URL{{ numberOfFiles > 1 ? 's  (comma separated)': '' }}
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
            <div
                v-for="progress in uploadProgresses"
                :key="progress.name"
                class="mb-100">
                <h3>
                    {{ progress.name }}
                </h3>
                <es-progress :value="progress.percent" />
                <p>
                    {{ progress.percent }}%
                </p>
            </div>
        </div>
        <div v-if="events.length">
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
    name: 'EsFileInputDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            urls: [],
            numberOfFiles: 0,
            rawUrls: '',
            events: [],
            uploadProgresses: [],
            fileUploadProps: [{
                name: 'uploadUrls',
                default: 'None',
                description: 'An array of URLs to upload files to. Must be the same length as the number of files '
                + 'uploaded.',
            }, {
                name: 'fileTypes',
                default: 'None',
                description: 'An array of accepted mime types for a file. If no argument passed, all file types are '
                + 'accepted. These mime types follow the IANA Media Types.',
            }, {
                name: 'maxFileSize',
                default: '25',
                description: 'Max file size in MB. This is per file. Any file that exceeds this size will not be '
                + 'uploaded.',
            },
            {
                name: 'collapsed',
                default: 'false',
                description: 'In desktop view, determines whether the upload box is horizontally collapsed.',
            },
            ],
            fileUploadEventListeners: [{
                name: '@fileSizeError',
                payload: 'String',
                description: 'If a file picked exceeds the max file size defined as a prop, this event is '
                + 'emitted. The payload is the name of the file.',
            },
            {
                name: '@fileTypeError',
                payload: 'String',
                description: 'If the file type of a file picked is not in the fileTypes array defined as a '
                + 'prop, this event is emitted. The payload is the name of the file that was not accepted.',
            },
            {
                name: '@readyToUpload',
                payload: 'Number',
                description: 'If the files picked do not exceed the max file size defined as a prop, this '
                + 'event is emitted. The payload is the number of files that are ready to be uploaded.',
            },
            {
                name: '@uploadSuccess',
                payload: 'String',
                description: 'If the upload for a given file is successful, this event is emitted. The payload is the '
                + 'name of the file that was successfully uploaded.',
            },
            {
                name: '@uploadFailure',
                payload: 'Object',
                description: 'If the upload for a given file fails, this event is emitted. The payload is an object '
                + 'with the fields fileName and message.',
            },
            {
                name: '@fileDataRead',
                payload: 'Object',
                description: 'Used for a file thumbnail preview. This is the callback for the FileReader onload '
                + 'event (a file has finished being read locally into the browser as an encoded string). The payload '
                + 'is an object with the fields name, size, type, and data.',
            },
            {
                name: '@uploadProgress',
                payload: 'Number',
                description: 'The callback for the Axios onUploadProgress event. The payload is the percentage of '
                + 'the file that has been uploaded so far.',
            }],
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-file-input.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsCard.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */
            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        fileTypeError(fileName) {
            this.events.push({ msg: `fileTypeError for file: ${fileName}`, variant: 'danger' });
        },
        onSubmit() {
            this.uploadProgresses = [];
            this.urls = this.rawUrls.replaceAll(' ', '').split(',').filter((url) => url !== '');
        },
        readyToUpload(numberOfFiles) {
            this.numberOfFiles = numberOfFiles;
            this.uploadProgresses = [];
            this.events.push({ msg: `readyToUpload for ${numberOfFiles} file(s)`, variant: 'success' });
        },
        uploadSuccess(fileName) {
            this.events.push({ msg: `uploadSuccess for file: ${fileName}`, variant: 'success' });
        },
        uploadFailure(fileNameAndMessage) {
            this.events.push({
                msg: `uploadFailure for file: ${fileNameAndMessage.fileName}. Message: `
            + `${fileNameAndMessage.message}`,
                variant: 'danger',
            });
        },
        fileDataRead(file) {
            this.events.push({
                msg: `fileDataRead for file: ${file.name} type: ${file.type} size: ${file.size}`,
                variant: 'success',
            });
        },
        uploadProgress(progressData) {
            const progress = this.uploadProgresses.find((_progress) => _progress.name === progressData.fileName);
            if (progress) {
                progress.percent = progressData.percentCompleted;
                return;
            }
            this.uploadProgresses.push({
                name: progressData.fileName,
                percent: progressData.percentCompleted,
            });
        },
        fileSizeError(fileName) {
            this.events.push({ msg: `fileSizeError: exceeded max file size for file ${fileName}`, variant: 'danger' });
        },
    },
};
</script>
