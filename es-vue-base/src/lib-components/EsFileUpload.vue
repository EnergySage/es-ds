<template>
    <div>
        <slot name="header" />
        <es-file-input
            class="mb-450"
            :upload-urls="uploadUrls"
            :max-file-size-mb="maxFileSizeMb"
            :file-types="fileTypes"
            :collapsed="files.length > 0"
            :delete-file-name="deleteFileName"
            @fileSizeError="fileSizeError"
            @fileTypeError="fileTypeError"
            @readyToUpload="readyToUpload"
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
import { mimeTypes, getHumanReadableTypeFromMime } from '../lib-utils';

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
         * An array of Objects with the following shape:
         * {
         *    name: String,
         *    uploadUrl: String,
         * }
         */
        uploadUrls: {
            type: Array,
            default: () => [],
        },
        /**
         * The file types that are allowed to be uploaded. This is a list of MIME types as strings. If the array is
         * empty, all file types are allowed. A list of acceptable MIME types can be found here in the template column:
         * https://www.iana.org/assignments/media-types/media-types.xhtml
         */
        fileTypes: {
            type: Array,
            default: () => [],
            required: true,
            validator(fileTypes) {
                return fileTypes.every((fileType) => mimeTypes.includes(fileType));
            },
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
            this.$emit('removeFile', fileName);
            this.deleteFileName = fileName;
        },
        showPreview(fileName) {
            const file = this.files.find(({ name }) => name === fileName);
            this.previewFileSource = file.source;
            this.previewFileName = file.name;
            this.visible = true;
        },
        fileTypeError(fileName) {
            this.events.push({
                msg: `The file "${fileName}" is not the correct type. Ensure your file is one of the following: `
                + `${this.fileTypes.map((mimeType) => getHumanReadableTypeFromMime(mimeType)).join(', ')}`,
                variant: 'danger',
            });
        },
        readyToUpload(files) {
            this.$emit('readyToUpload', files);
        },
        uploadFailure(fileNameAndMessage) {
            this.removeFile(fileNameAndMessage.name);
            this.events.push({
                msg: `Failed to upload the file: ${fileNameAndMessage.name}`,
                variant: 'danger',
            });
        },
        formatFileSizeInMb(sizeInBytes) {
            return `${(sizeInBytes / 1000000).toFixed(2)} MB`;
        },
        fileDataRead(file) {
            const existingFile = this.files.find(({ name }) => name === file.name);
            if (existingFile) {
                this.files = this.files.filter(({ name }) => name !== file.name);
            }
            this.files.push({
                name: file.name,
                source: file.data,
                mimeType: file.type,
                percentLoaded: existingFile ? existingFile.percentLoaded : 0,
                size: this.formatFileSizeInMb(file.size),
            });
        },
        uploadProgress(progressData) {
            this.files = this.files.map((file) => {
                if (file.name === progressData.name) {
                    return {
                        ...file,
                        percentLoaded: progressData.percentCompleted,
                    };
                }
                return file;
            });
        },
        fileSizeError(fileName) {
            this.events.push({
                msg: `The file "${fileName}" is too large. Make sure your file does not exceed `
                    + `${this.maxFileSizeMb} MB`,
                variant: 'danger',
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/bootstrap';
@import "~@energysage/es-bs-base/scss/variables";

</style>
