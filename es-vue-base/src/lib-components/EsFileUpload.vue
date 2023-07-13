<template>
    <div>
        <slot name="header" />
        <es-file-input
            class="mb-450"
            :upload-urls="uploadUrls"
            :max-file-size-mb="10"
            :file-types="['image/png', 'application/pdf']"
            :collapsed="files.length > 0"
            :delete-file-name="deleteFileName"
            @fileSizeError="fileSizeError"
            @fileTypeError="fileTypeError"
            @readyToUpload="readyToUpload"
            @uploadSuccess="uploadSuccess"
            @uploadFailure="uploadFailure"
            @fileDataRead="fileDataRead"
            @uploadProgress="uploadProgress">
            <template #cta>
                <slot name="inputCta" />
            </template>
            <template #helpText>
                <slot name="inputHelpText" />
            </template>
        </es-file-input>
        <div v-if="events.length">
            <es-form-msg
                v-for="(event, index) in events"
                :key="index"
                :variant="event.variant"
                :message="event.msg"
                :timeout="60" />
        </div>
        <div class="d-md-flex flex-nowrap mb-5">
            <div
                v-for="file in files"
                :key="file.name"
                class="mt-3 mt-md-0 mr-md-4">
                <es-file-thumbnail
                    :file-name="file.name"
                    :file-size="file.size"
                    :file-source="file.source"
                    :mime-type="file.mimeType"
                    :percent-loaded="file.percentLoaded"
                    @removeFile="removeFile"
                    @showPreview="showPreview" />
            </div>
        </div>
        <es-file-preview-modal
            :file-source="previewFileSource"
            :file-name="previewFileName"
            :visible="visible"
            @hidden="visible=false" />
    </div>
</template>

<script lang="js">
import EsFileInput from './EsFileInput.vue';
import EsFormMsg from './EsFormMsg.vue';
import EsFileThumbnail from './EsFileThumbnail.vue';
import EsFilePreviewModal from './EsFilePreviewModal.vue';

export default {
    name: 'EsFileUpload',
    components: {
        EsFileInput,
        EsFormMsg,
        EsFileThumbnail,
        EsFilePreviewModal,
    },
    props: {
        /**
         * An array of URLs as strings. Once the number of URLs matches the number of files, the component will upload
         * the files to the URLs.
         */
        uploadUrls: {
            type: Array,
            default: () => [],
        },
        /**
         * The maximum file size in MB. This is per file, not the total size of all files.
         */
        maxFileSizeMb: {
            type: Number,
            default: 25,
            required: false,
        },
        /**
         * When true, the component will be shorter vertically. This is achieved by giving the parent div
         * flex-direction: row instead of the default flex-direction: column.
         */
        collapsed: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    data() {
        return {
            files: [], // Needs to be an object with: name, source, mimeType, percentLoaded, and size
            events: [],
            previewFileSource: '',
            previewFileName: '',
            deleteFileName: '',
            visible: false,
            active: false,
        };
    },
    methods: {
        removeFile(fileName) {
            this.files = this.files.filter((file) => file.name !== fileName);
            this.deleteFileName = fileName;
        },
        showPreview(fileName) {
            const file = this.files.find(({ name }) => name === fileName);
            this.previewFileSource = file.source;
            this.previewFileName = file.name;
            this.visible = true;
        },
        fileTypeError(fileName) {
            this.events.push({ msg: `fileTypeError for file: ${fileName}`, variant: 'danger' });
        },
        readyToUpload(numberOfFiles) {
            this.$emit('readyToUpload', numberOfFiles);
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
        formatFileSizeInMb(sizeInBytes) {
            return `${(sizeInBytes / 1000000).toFixed(2)} MB`;
        },
        fileDataRead(file) {
            if (this.files.find(({ name }) => name === file.name)) {
                this.files = this.files.filter(({ name }) => name !== file.name);
            }
            this.files.push({
                name: file.name,
                source: file.data,
                mimeType: file.type,
                percentLoaded: 0,
                size: this.formatFileSizeInMb(file.size),
            });
        },
        uploadProgress(progressData) {
            // const progress = this.files.find((file) => file.name === progressData.fileName);
            this.files = this.files.map((file) => {
                if (file.name === progressData.fileName) {
                    return {
                        ...file,
                        percentLoaded: progressData.percentCompleted,
                    };
                }
                return file;
            });
        },
        fileSizeError(fileName) {
            this.events.push({ msg: `fileSizeError: exceeded max file size for file ${fileName}`, variant: 'danger' });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/bootstrap';
@import "~@energysage/es-bs-base/scss/variables";

</style>
