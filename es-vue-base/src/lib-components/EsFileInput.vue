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
        @keypress.enter="openFilePicker">
        <div
            class="d-flex justify-content-center"
            :class="{ 'flex-row': collapsed, 'flex-column': !collapsed }">
            <div class="align-self-center p-2">
                <icon-upload
                    class="d-none d-md-inline-block mb-4"
                    height="48px"
                    width="48px" />
            </div>
            <div class="align-self-center p-2">
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

export default {
    name: 'EsFileUpload',
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
                // There are 9 valid types, but there are there are about ~1500 subtypes. We'll just check that the
                // type is valid and the subtype is not empty.
                const validTypes = ['application',
                    'audio',
                    'font',
                    'example',
                    'image',
                    'message',
                    'model',
                    'multipart',
                    'text',
                    'video'];
                return fileTypes.every((fileType) => {
                    const mimeTypeParts = fileType.split('/');
                    if (mimeTypeParts.length !== 2) return false;
                    const [type, subtype] = mimeTypeParts;
                    return validTypes.includes(type) && subtype.length > 0;
                });
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
        pickedItems(newVal) {
            // The user has selected files from the file picker. We have to filter out any files that exceed the
            // maxFileSizeMb prop.
            this.files = this.filterLargeFiles(newVal);
            if (this.files.length > 0) {
                this.$emit('readyToUpload', this.files.length);
                this.readFilesIntoUrl(newVal);
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
        onDrop(event) {
            // The user has dropped files onto the component. We have to apply the same logic as if they had
            // selected the files from the file picker which limits the file types to the ones specified in the
            // fileTypes prop.
            this.active = false;
            this.files = [];

            // Use DataTransferItemList interface to access the file(s)
            const invavlidItems = [...event.dataTransfer.items].filter((item) => item.kind !== 'file');

            const dataTransfersAsFiles = [...event.dataTransfer.items]
                .filter((item) => item.kind === 'file')
                .map((item) => item.getAsFile());

            const validFileTypes = dataTransfersAsFiles
                .filter((file) => this.fileTypes.includes(file.type));
            const validFiles = this.filterLargeFiles(validFileTypes);

            const fileErrors = dataTransfersAsFiles
                .filter((file) => !this.fileTypes.includes(file.type))
                .concat(invavlidItems)
                .map((item) => item.name);

            if (fileErrors.length > 0) {
                this.$emit('fileTypeError', fileErrors);
            }

            this.files = validFiles;
            if (this.files.length > 0) {
                this.$emit('readyToUpload', this.files.length);
                this.readFilesIntoUrl(this.files);
            }
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
                        this.$emit('uploadFailure', file.name);
                    }
                })
                .catch(() => {
                    this.$emit('uploadFailure', file.name);
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

</style>
