<template>
    <div
        role="presentation"
        class="es-file-upload align-items-center rounded-sm d-flex flex-column justify-content-center p-150"
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
            <div class="align-self-center">
                <icon-upload
                    class="d-none d-md-inline-block"
                    :class="{ 'mb-200': collapsed }"
                    height="32px"
                    width="32px" />
                <icon-upload
                    class="d-md-none"
                    height="24px"
                    width="24px" />
            </div>
            <div
                class="align-self-center text-center"
                :class="{ 'px-100': collapsed }">
                <slot name="cta" />
            </div>
            <div class="align-self-center">
                <button
                    type="button"
                    class="d-none d-md-inline w-100 w-md-auto"
                    :class="{ 'mb-200': collapsed }"
                    @click="openFilePicker">
                    <slot name="buttonText">
                        <p class="m-0">
                            Browse files
                        </p>
                    </slot>
                </button>
                <button
                    type="button"
                    class="d-md-none w-100"
                    @click="openFilePicker">
                    <slot name="buttonText">
                        <p class="m-0">
                            Choose files
                        </p>
                    </slot>
                </button>
            </div>
        </div>
        <div>
            <slot name="helpText" />
        </div>
        <input
            type="file"
            @change="onFileChanged($event)"
            :accept="fileTypes.join(', ')"
            ref="fileInput"
            style="display: none"
            multiple/>
    </div>
</template>

<script setup lang="ts">
import findMimeType, { mimeTypes } from '../lib-utils/mime-type-finder';

type UploadInfo = {
    name: string;
    uploadUrl: string;
    additionalFields?: Object;
};

const props = defineProps({
    /**
     * An array of Objects with the following shape:
     * {
     *    name: String,
     *    uploadUrl: String,
     *    additionalFields: Object,
     * }
     */
    uploadUrls: {
        type: Array<UploadInfo>,
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
});

let currentFiles: Array<File> = [];
let active = false;
const fileInput = ref(null);
const emit = defineEmits([
    'fileSizeError',
    'fileTypeError',
    'fileIsAFolderError',
    'fileDataRead',
    'duplicateFileMessage',
    'readyToUpload',
    'uploadFailure',
    'uploadSuccess'
]);

watch(() => props.uploadUrls, (newUrls, oldUrls) => {
    // For every file that has an associated upload URL, we start the upload
    newUrls.forEach((newUrlPair) => {
        const oldUrl = oldUrls.find(({ name }) => name === newUrlPair.name);
        const fileToUpload = currentFiles.find((file) => file.name === newUrlPair.name);
        if ((!oldUrl || oldUrl.uploadUrl !== newUrlPair.uploadUrl) && fileToUpload) {
            uploadSingleFile(fileToUpload);
        }
    });
});

async function onFileChanged($event: Event) {
    const target = $event.target as HTMLInputElement;
    // The user has selected files from the file picker. We have to filter out any files that exceed the
    // maxFileSizeMb prop.
    if (target && target.files) {
        await verifyFiles([...target.files]);
    }
}

const removeSpaceFromFileNames = (files: Array<File>) => {
    const newFiles = files.map((file) => new File(
        // Return new File object with the modified name (without any space)
        [file],
        file.name.replace(/\s/g, ''),
        { type: file.type, lastModified: file.lastModified },
    ));
    return newFiles;
}

const filterLargeFiles = (files: Array<File>) => {
    // Takes an array of files, and filters out any files that exceed the maxFileSizeMb prop. Emits a
    // fileSizeError event for each file that exceeds the maxFileSizeMb prop. The File API uses bytes, so
    // we have to convert the maxFileSizeMb prop to bytes.
    const maxFileSizeBytes = props.maxFileSizeMb * 1000000;
    return [...files].filter((file) => {
        if (file.size > maxFileSizeBytes) {
            emit('fileSizeError', file.name);
            return false;
        }
        return true;
    });
}

const readFilesIntoUrl = (files: Array<File>) => {
    files.forEach((file) => {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            emit('fileDataRead', {
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
}

async function verifyFiles(files: Array<File>) {
    const correctlySizedFiles = filterLargeFiles(files);
    const correctlyNamedFiles = removeSpaceFromFileNames(correctlySizedFiles);

    // Make sure the file is the correct mime type
    let newValidFiles = await Promise.allSettled(
        correctlyNamedFiles.map(async (file) => verifyMimeType(file)),
    );
    // Filter out undefined values and "rejected"
    newValidFiles = newValidFiles.filter((file) => file && file.status === 'fulfilled')
        .map((file) => file.value);

    // If the new file with name already exists in the current files
    // Don't upload the new file and display an error
    const duplicateFiles = newValidFiles.filter(({ name }) => currentFiles.some((file) => file.name === name));
    duplicateFiles.forEach((file) => emit('duplicateFileMessage', file.name));

    // For new files with unused names, add them to files
    newValidFiles = newValidFiles.filter(({ name }) => !currentFiles.some((file) => file.name === name));
    currentFiles = [...currentFiles, ...newValidFiles];

    if (newValidFiles.length > 0) {
        emit('readyToUpload', newValidFiles);
        readFilesIntoUrl(newValidFiles);
    }

    console.log(currentFiles);
}

async function verifyMimeType(file: File) {
    // If an empty folder then trigger fileIsAFolderError
    if (file.type === '') {
        emit('fileIsAFolderError');
    }
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = (evt) => {
            const uint = new Uint8Array(evt.target.result);
            const bytes: String[] = [];
            uint.forEach((byte) => {
                bytes.push(byte.toString(16));
            });
            const hex = bytes.join('').toUpperCase();
            const mimeType = findMimeType(hex);
            if (!mimeType || (props.fileTypes.length > 0 && !props.fileTypes.includes(mimeType))) {
                emit('fileTypeError', file.name);
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
}

const onDrop = (event) => {
    // The user has dropped files onto the component. We have to apply the same logic as if they had
    // selected the files from the file picker which limits the file types to the ones specified in the
    // fileTypes prop.
    active = false;

    // Use DataTransferItemList interface to access the file(s)
    const dataTransfersAsFiles = [...event.dataTransfer.items]
        .filter((item) => {
            if (item.kind !== 'file') {
                emit('fileTypeError', item.name);
                return false;
            }
            return true;
        })
        .map((item) => item.getAsFile());

    verifyFiles(dataTransfersAsFiles);
}

const openFilePicker = () => {
    if (fileInput.value) {
        fileInput.value.click();
    }
}

async function uploadSingleFile(file: File) {
    const uploadInfo = props.uploadUrls.find((uploadUrl) => uploadUrl.name === file.name);
    if (!uploadInfo) {
        emit('uploadFailure', {
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
            emit('uploadSuccess', file.name);
        } else {
            emit('uploadFailure', {
                name: file.name,
                message: `Received ${response.status} code from server.`,
            });
        }
    })
    .catch((error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            emit('uploadFailure', {
                name: file.name,
                message: `Received ${error.response.status} code from server.`,
            });
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            emit('uploadFailure', { name: file.name, message: 'The server did not respond.' });
        } else {
            // Something happened in setting up the request that triggered an Error
            emit('uploadFailure', {
                name: file.name,
                message: 'There was an error sending your file to the server.',
            });
        }
    });
}
</script>
