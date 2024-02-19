<template>
    <div
        role="presentation"
        class="es-file-upload align-items-center rounded d-flex flex-column justify-content-center p-2"
        :class="{ 'active': active }"
        @dragenter.stop.prevent="active = true"
        @dragover.stop.prevent="active = true"
        @dragleave.stop.prevent="active = false"
        @dragend.stop.prevent="onDrop"
        @drop.stop.prevent="onDrop"
        @click.self="openFilePicker"
        @keypress.enter.prevent="openFilePicker"
        @keypress.space.prevent="openFilePicker">
        <div
            class="d-flex justify-content-center flex-column"
            :class="{ 'flex-md-row': collapsed }">
            <div class="align-self-center p-2">
                <icon-upload
                    class="d-none d-md-inline-block mb-4"
                    height="48px"
                    width="48px" />
            </div>
            <div class="align-self-center p-2 text-center">
                <slot name="cta" />
            </div>
            <div class="align-self-center p-2">
                <es-button
                    class="w-100 w-md-auto mb-2 mb-md-4"
                    variant="secondary"
                    outline
                    @click="openFilePicker">
                    <slot name="buttonText">
                        <p class="d-none d-md-inline m-0">
                            Browse files
                        </p>
                        <p class="d-md-none m-0">
                            Choose file
                        </p>
                    </slot>
                </es-button>
            </div>
        </div>
        <div>
            <slot name="helpText" />
        </div>
        <b-form-file
            ref="fileInput"
            v-model="pickedItems"
            :state="Boolean(pickedItems)"
            :accept="fileTypes.join(', ')"
            style="display: none"
            multiple />
    </div>
</template>

<script lang="js">
import { BFormFile } from 'bootstrap-vue';
import EsButton from './EsButton.vue';
import IconUpload from '../lib-icons/icon-upload.vue';
import { mimeTypes, findMimeType } from '../lib-utils';

export default {
    name: 'EsFileInput',
    components: {
        BFormFile,
        EsButton,
        IconUpload,
    },
    props: {
        /**
         * An array of Objects with the following shape:
         * {
         *    fileName: String,
         *    uploadUrl: String,
         *    additionalFields: Object,
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
        deleteFileName: {
            type: String,
            default: '',
            required: false,
        },
    },
    data() {
        return {
            pickedItems: [],
            files: [],
            active: false,
        };
    },
    watch: {
        uploadUrls: {
            handler(newUrls, oldUrls) {
                // For every file that has an associated upload URL, we start the upload
                newUrls.forEach((newUrlPair) => {
                    const oldUrl = oldUrls.find(({ name }) => name === newUrlPair.name);
                    const fileToUpload = this.files.find((file) => file.name === newUrlPair.name);
                    if ((!oldUrl || oldUrl.uploadUrl !== newUrlPair.uploadUrl) && fileToUpload) {
                        this.uploadSingleFile(fileToUpload);
                    }
                });
            },
            deep: true,
        },
        async pickedItems(newVal) {
            // The user has selected files from the file picker. We have to filter out any files that exceed the
            // maxFileSizeMb prop.
            if (newVal.length > 0) {
                await this.verifyFiles(newVal);
            }
        },
        deleteFileName(newVal) {
            this.files = this.files.filter((file) => file.name !== newVal);
        },
    },
    methods: {
        removeSpaceFromFileNames(files) {
            const newFiles = files.map((file) => new File(
                // Return new File object with the modified name (without any space)
                [file],
                file.name.replace(/\s/g, ''),
                { type: file.type, lastModified: file.lastModified },
            ));
            return newFiles;
        },
        filterLargeFiles(files) {
            // Takes an array of files, and filters out any files that exceed the maxFileSizeMb prop. Emits a
            // fileSizeError event for each file that exceeds the maxFileSizeMb prop. The File API uses bytes, so
            // we have to convert the maxFileSizeMb prop to bytes.
            const maxFileSizeBytes = this.maxFileSizeMb * 1000000;
            return files.filter((file) => {
                if (file.size > maxFileSizeBytes) {
                    this.$emit('fileSizeError', file.name);
                    return false;
                }
                return true;
            });
        },
        readFilesIntoUrl(files) {
            files
                .forEach((file) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                        this.$emit('fileDataRead', {
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            data: file.type.includes('application')
                                // For non-image files (pdf, docx, etc.)
                                ? URL.createObjectURL(new Blob([file], { type: file.type }))
                                : fileReader.result,
                        });
                    };
                    fileReader.readAsDataURL(file);
                });
        },
        async verifyFiles(files) {
            const correctlySizedFiles = this.filterLargeFiles(files);
            const correctlyNamedFiles = this.removeSpaceFromFileNames(correctlySizedFiles);

            // Make sure the file is the correct mime type
            let newValidFiles = await Promise.allSettled(
                correctlyNamedFiles.map(async (file) => this.verifyMimeType(file)),
            );
            // Filter out undefined values and "rejected"
            newValidFiles = newValidFiles.filter((file) => file && file.status === 'fulfilled')
                .map((file) => file.value);

            // If the new file with name already exists in the current files
            // Don't upload the new file and display an error
            const duplicateFiles = newValidFiles.filter(({ name }) => this.files.some((file) => file.name === name));
            duplicateFiles.forEach((file) => this.$emit('duplicateFileMessage', file.name));

            // For new files with unused names, add them to files
            newValidFiles = newValidFiles.filter(({ name }) => !this.files.some((file) => file.name === name));
            this.files = [...this.files, ...newValidFiles];

            if (newValidFiles.length > 0) {
                this.$emit('readyToUpload', newValidFiles);
                this.readFilesIntoUrl(newValidFiles);
            }
            this.pickedItems = [];
        },
        async verifyMimeType(file) {
            // If an empty folder then trigger fileTypeError
            if (file.type === '') {
                this.$emit('fileIsAFolderError');
            }
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.onload = (evt) => {
                    const uint = new Uint8Array(evt.target.result);
                    const bytes = [];
                    uint.forEach((byte) => {
                        bytes.push(byte.toString(16));
                    });
                    const hex = bytes.join('').toUpperCase();
                    const mimeType = findMimeType(hex);
                    if (!mimeType || (this.fileTypes.length > 0 && !this.fileTypes.includes(mimeType))) {
                        this.$emit('fileTypeError', file.name);
                        return reject();
                    }
                    return resolve(file);
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
                const blob = file.slice(0, 4);
                fileReader.readAsArrayBuffer(blob);
            });
        },
        onDrop(event) {
            // The user has dropped files onto the component. We have to apply the same logic as if they had
            // selected the files from the file picker which limits the file types to the ones specified in the
            // fileTypes prop.
            this.active = false;

            // Use DataTransferItemList interface to access the file(s)
            const dataTransfersAsFiles = [...event.dataTransfer.items]
                .filter((item) => {
                    if (item.kind !== 'file') {
                        this.$emit('fileTypeError', item.name);
                        return false;
                    }
                    return true;
                })
                .map((item) => item.getAsFile());

            this.verifyFiles(dataTransfersAsFiles);
        },
        openFilePicker() { this.$refs.fileInput.$el.childNodes[0].click(); },
        async uploadSingleFile(file) {
            const uploadInfo = this.uploadUrls.find((uploadUrl) => uploadUrl.name === file.name);
            if (!uploadInfo) {
                this.$emit('uploadFailure', {
                    name: file.name,
                    message: 'No upload URL found for this file.',
                });
                return;
            }
            const form = new FormData();
            if (uploadInfo.additionalFields) {
                Object.entries(uploadInfo.additionalFields).forEach(([key, value]) => {
                    form.append(key, value);
                });
            }
            form.append('file', file);
            fetch(uploadInfo.uploadUrl, {
                method: 'POST',
                body: form,
            })
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        this.$emit('uploadSuccess', file.name);
                    } else {
                        this.$emit('uploadFailure', {
                            name: file.name,
                            message: `Received ${response.status} code from server.`,
                        });
                    }
                })
                .catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        this.$emit('uploadFailure', {
                            name: file.name,
                            message: `Received ${error.response.status} code from server.`,
                        });
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        this.$emit('uploadFailure', { name: file.name, message: 'The server did not respond.' });
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        this.$emit('uploadFailure', {
                            name: file.name,
                            message: 'There was an error sending your file to the server.',
                        });
                    }
                });
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.es-file-upload {
    background-color: $gray-200;
    border: $btn-border-width dotted $border-color;
    @include media-breakpoint-down(sm) {
        background-color: $white;
        border: $btn-border-width solid $border-color;
    }

    &.active {
        border: $btn-border-width dotted $cyan-500;
    }
}

</style>
