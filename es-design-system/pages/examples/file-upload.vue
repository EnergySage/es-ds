<template>
    <b-container>
        <div>
            <b-col>
                <h1>
                    File Upload
                </h1>
                <h2>
                    Comprised of...
                </h2>
                <p>
                    <ul>
                        <li>
                            <strong>es-file-input</strong> to obtain the files from the user
                        </li>
                        <li>
                            <strong>es-form-msg</strong> to display error messages to the user
                        </li>
                        <li>
                            <strong>es-file-thumbnail</strong> to display the files the user has uploaded
                        </li>
                        <li>
                            <strong>es-file-preview-modal</strong> to display a preview of the file the user has
                            uploaded
                        </li>
                    </ul>
                </p>
            </b-col>
        </div>
        <div class="border-top pt-200">
            <div>
                <h2 class="mb-4 d-none d-md-block">
                    Upload a copy of your electric bill.
                </h2>
                <p class="d-none d-md-block">
                    <b>Don't forget:</b> Make sure to upload an image of both sides of your bill.
                </p>
            </div>
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
                    <h2 class="d-none d-md-inline-block mb-4 text-center">
                        Drag and drop your files or
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
            <div v-if="events.length">
                <es-form-msg
                    v-for="(event, index) in events"
                    :key="index"
                    :variant="event.variant"
                    :show="true"
                    :timeout="60">
                    {{ event.msg }}
                </es-form-msg>
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
                :visible="previewModalVisible"
                @hidden="previewModalVisible=false" />
        </div>
    </b-container>
</template>

<script lang="js">
import { getHumanReadableTypeFromMime } from '@energysage/es-vue-base';

export default {
    name: 'EsFileUpload',
    data() {
        return {
            files: [], // Needs to be an object with: name, source, mimeType, percentLoaded, and size
            events: [],
            fileTypes: ['image/png', 'application/pdf'],
            maxFileSizeMb: 25,
            uploadUrls: [],
            previewFileSource: '',
            previewFileName: '',
            deleteFileName: '',
            previewModalVisible: false,
            active: false,
        };
    },
    methods: {
        removeFile(fileName) {
            this.files = this.files.filter((file) => file.name !== fileName);
            this.uploadUrls = this.uploadUrls.filter((file) => file.name !== fileName);
            this.deleteFileName = fileName;
        },
        showPreview(fileName) {
            const file = this.files.find(({ name }) => name === fileName);
            this.previewFileSource = file.source;
            this.previewFileName = file.name;
            this.previewModalVisible = true;
        },
        fileTypeError(fileName) {
            this.events.push({
                msg: `The file "${fileName}" is not the correct type. Ensure your file is one of the following: `
                + `${this.fileTypes.map((mimeType) => getHumanReadableTypeFromMime(mimeType)).join(', ')}`,
                variant: 'danger',
            });
        },
        readyToUpload(fileObjects) {
            this.uploadUrls = fileObjects.map(({ name }) => ({
                name,
                uploadUrl: `https://energysage.free.beeceptor.com/${name}`,
            }));
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
