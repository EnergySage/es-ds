<!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
<template>
    <div
        class="es-file-upload"
        :class="{ 'active': active, 'inactive': !active}"
        @dragenter.stop.prevent="setActive"
        @dragover.stop.prevent="setActive"
        @dragleave.stop.prevent="setInActive"
        @dragend.stop.prevent="onDrop"
        @drop.stop.prevent="onDrop">
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
                    class="d-inline-block d-md-none w-100 mb-2"
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
            id="fileInput"
            v-model="pickedItems"
            :state="Boolean(pickedItems)"
            :accept="fileTypesAsString"
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
        uploadUrls: {
            type: Array,
            default: () => [],
        },
        fileTypes: {
            type: Array,
            default: () => [],
        },
        maxFileSize: {
            type: Number,
            default: 100,
            required: false,
        },
        uploadSuccessStatusCode: {
            type: Number,
            default: 200,
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
    computed: {
        fileTypesAsString() {
            return this.fileTypes.join(', ');
        },
    },
    watch: {
        uploadUrls: {
            handler(newUrls) {
                console.log('uploadUrls changed');
                if (newUrls.length > 0 && newUrls.length === this.files.length) this.upload();
            },
            deep: true,
        },
        files: {
            handler(newFiles) {
                console.log('files changed');
                if (newFiles.length > 0 && newFiles.length === this.uploadUrls.length) this.upload();
            },
            deep: true,
        },
        pickedItems(newVal) {
            this.files = newVal;
            if (newVal.length > 0 && this.fileSizeValid()) {
                this.$emit('readyToUpload', this.files.length);
                this.readFilesIntoUrl(newVal);
            }
        },
    },
    methods: {
        fileSizeValid() {
            // Check if the combined file sizes exceed the maxFileSize prop
            const totalFileSize = this.files.reduce((acc, file) => acc + file.size, 0);
            if (totalFileSize > this.maxFileSize * 1000000) {
                this.$emit('fileSizeError');
                return false;
            }
            return true;
        },
        setActive() {
            this.active = true;
        },
        setInActive() {
            this.active = false;
        },
        readFilesIntoUrl(files) {
            this.fileUrls = [];
            files
                .forEach((file) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
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
            const invalidFiles = [...event.dataTransfer.items].filter((item) => item.kind !== 'file');

            const dataTransfersAsFiles = [...event.dataTransfer.items]
                .filter((item) => item.kind === 'file')
                .map((item) => item.getAsFile());

            const validFiles = dataTransfersAsFiles
                .filter((file) => this.fileTypes.includes(file.type));
            const fileErrors = dataTransfersAsFiles
                .filter((file) => !this.fileTypes.includes(file.type))
                .concat(invalidFiles)
                .map((item) => item.name);
            if (fileErrors.length > 0) {
                this.$emit('fileTypeError', fileErrors);
            }

            this.files = validFiles;
            if (this.files.length > 0 && this.fileSizeValid()) {
                this.$emit('readyToUpload', this.files.length);
                this.readFilesIntoUrl(validFiles);
            }
        },
        openFilePicker() { document.getElementById('fileInput').click(); },
        upload() {
            this.files.forEach((file, index) => {
                this.uploadSingleFile(file, index);
            });
        },
        uploadSingleFile(file, index) {
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
            this.$axios.post(
                this.uploadUrls[index],
                file,
                config,
            )
                .then((response) => {
                    if (response.status === this.uploadSuccessStatusCode) {
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
    align-items: center;
    background-color: $gray-200;
    border-radius: $border-radius;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2.5rem;

    &.active {
        @media only screen and (min-width: 768px) {
            border: $btn-border-width dotted $cyan-500;
        }
    }

    &.inactive {
        @media only screen and (min-width: 768px) {
            border: $btn-border-width dotted $border-color;

        }
    }
    @media only screen and (max-width: 767px) {
        background-color: $white;
        border: $btn-border-width solid $border-color;
        padding: 1rem;
        text-align: center;
    }
}

</style>
