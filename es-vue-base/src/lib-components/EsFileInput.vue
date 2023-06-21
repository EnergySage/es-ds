<template>
    <div
        role="button"
        tabindex="0"
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
            class="d-flex justify-content-center"
            :class="{ 'flex-row': collapsed, 'flex-column': !collapsed }">
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
                    class="d-none d-md-inline-block w-35 mb-4"
                    variant="secondary"
                    outline
                    @click="openFilePicker">
                    Browse Files
                </es-button>
                <es-button
                    class="d-md-none w-100 mb-2"
                    variant="secondary"
                    outline
                    @click="openFilePicker">
                    Choose File
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
         * An array of URLs as strings. Once the number of URLs matches the number of files, the component will upload
         * the files to the URLs.
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
            pickedItems: [],
            files: [],
            fileUrls: [], // For thumbnail preview
            active: false,
        };
    },
    watch: {
        uploadUrls: {
            handler(newUrls) {
                if (newUrls.length > 0 && newUrls.length === this.files.length) this.upload();
            },
            deep: true,
        },
        files: {
            handler(newFiles) {
                if (newFiles.length > 0 && newFiles.length === this.uploadUrls.length) this.upload();
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
    },
    methods: {
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
            this.fileUrls = [];
            files
                .forEach((file) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                        // TODO: If pdf/docx, we might not want to read the file...
                        this.$emit('fileDataRead', {
                            name: file.name, type: file.type, size: file.size, data: fileReader.result,
                        });
                    };
                    fileReader.readAsDataURL(file);
                });
        },
        async verifyFiles(files) {
            const correctlySizedFiles = this.filterLargeFiles(files);

            this.files = await Promise.all(correctlySizedFiles.map(async (file) => this.verifyMimeType(file)));
            this.files = this.files.filter((file) => file); // filter out undefined
            if (this.files.length > 0) {
                this.$emit('readyToUpload', this.files.length);
                this.readFilesIntoUrl(this.files);
            }
        },
        async verifyMimeType(file) {
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
                    if (!mimeType || !this.fileTypes.includes(mimeType)) {
                        this.$emit('fileTypeError', file.name);
                        return resolve();
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
            this.files = [];

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
        async upload() {
            await Promise.all(this.files.map(async (file, index) => {
                await this.uploadSingleFile(file, index);
            }));
        },
        async uploadSingleFile(file, index) {
            const config = {
                headers: {
                    'Content-Type': file.type,
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.$emit('uploadProgress', { fileName: file.name, percentCompleted });
                    return percentCompleted;
                },
            };
            await this.$axios.put(
                this.uploadUrls[index],
                file,
                config,
            )
                .then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        this.$emit('uploadSuccess', file.name);
                    } else {
                        this.$emit('uploadFailure', {
                            fileName: file.name,
                            message: `Received ${response.status} code from server.`,
                        });
                    }
                })
                .catch((error) => {
                    // https://axios-http.com/docs/handling_errors
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        this.$emit('uploadFailure', {
                            fileName: file.name,
                            message: `Received ${error.response.status} code from server.`,
                        });
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        this.$emit('uploadFailure', { fileName: file.name, message: 'The server did not respond.' });
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        this.$emit('uploadFailure', {
                            fileName: file.name,
                            message: 'There was an error sending your file to the server.',
                        });
                    }
                });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/bootstrap';
@import "~@energysage/es-bs-base/scss/variables";

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

.es-file-upload-button {
    background-color: $white;
}

.es-file-upload-button:hover {
    background-color: $black;
}

.es-file-upload-button:hover h4 {
    color: $white;
}

</style>
