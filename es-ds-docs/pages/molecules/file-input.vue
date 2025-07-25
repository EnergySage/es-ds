<script setup lang="ts">
const columnWidths = {
    md: ['3', '2', '7'],
};

const propTableRows = [
    [
        'uploadUrls',
        'Object',
        'n/a',
        'An array of objects with name, uploadUrl, and additionalFields (optional) as fields.',
    ],
    [
        'fileTypes',
        'Array',
        '[]',
        'An array of accepted mime types for a file. If no argument passed, all file types are ' +
            'accepted. These mime types follow the IANA Media Types.',
    ],
    [
        'maxFileSize',
        'Number',
        '25',
        'Max file size in MB. This is per file. Any file that exceeds this size will not be uploaded.',
    ],
    ['collapsed', 'Boolean', 'false', 'In desktop view, determines whether the upload box is horizontally collapsed.'],
    [
        'multiple',
        'Boolean',
        'true',
        'When true, allows multiple file selection. When false, restricts to single file selection.',
    ],
];

const fileUploadEventListeners = [
    {
        name: '@fileSizeError',
        payload: 'String',
        description:
            'If a file picked exceeds the max file size defined as a prop, this event is ' +
            'emitted. The payload is the name of the file.',
    },
    {
        name: '@fileIsAFolderError',
        payload: 'String',
        description: 'If the user tries to upload a folder.',
    },
    {
        name: '@file',
        payload: 'String',
        description:
            'If the file type of a file picked is not in the fileTypes array defined as a ' +
            'prop, this event is emitted. The payload is the name of the file that was not accepted.',
    },
    {
        name: '@readyToUpload',
        payload: 'Array',
        description:
            'If the files picked do not exceed the max file size defined as a prop, this ' +
            'event is emitted. The payload is an array of file objects ready to be uploaded.',
    },
    {
        name: '@uploadSuccess',
        payload: 'String',
        description:
            'If the upload for a given file is successful, this event is emitted. The payload is the ' +
            'name of the file that was successfully uploaded.',
    },
    {
        name: '@uploadFailure',
        payload: 'Object',
        description:
            'If the upload for a given file fails, this event is emitted. The payload is an object ' +
            'with the fields name and message.',
    },
    {
        name: '@fileDataRead',
        payload: 'Object',
        description:
            'Used for a file thumbnail preview. This is the callback for the FileReader onload ' +
            'event (a file has finished being read locally into the browser as an encoded string). The payload ' +
            'is an object with the fields name, size, type, and data.',
    },
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-file-input.vue?raw');

        const docSource = await import('./file-input.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const url = ref('');
let fileObjects: File[] = [];
const uploadUrls: Ref<{ name: string; uploadUrl: string }[]> = ref([]);
const events: Ref<{ msg: string; variant: string; show: boolean }[]> = ref([]);

const onSubmit = () => {
    uploadUrls.value = fileObjects.map(({ name }) => ({
        name,
        uploadUrl: url.value,
    }));
};

const fileTypeError = (fileName: string) => {
    events.value.push({ msg: `fileTypeError for file: ${fileName}`, variant: 'danger', show: true });
};

const fileIsAFolderError = () => {
    events.value.push({ msg: 'fileIsAFolderError', variant: 'danger', show: true });
};

const readyToUpload = (fileUploads: File[]) => {
    fileObjects = fileUploads;
    events.value.push({ msg: `readyToUpload for ${fileUploads.length} file(s)`, variant: 'success', show: true });
};

const uploadSuccess = (fileName: string) => {
    events.value.push({ msg: `uploadSuccess for file: ${fileName}`, variant: 'success', show: true });
};

const uploadFailure = (fileNameAndMessage: { name: string; message: string }) => {
    events.value.push({
        msg: `uploadFailure for file: ${fileNameAndMessage.name}. Message: ${fileNameAndMessage.message}`,
        variant: 'danger',
        show: true,
    });
};

const fileDataRead = (file: File) => {
    events.value.push({
        msg: `fileDataRead for file: ${file.name} type: ${file.type} size: ${file.size}`,
        variant: 'success',
        show: true,
    });
};
const fileSizeError = (fileName: string) => {
    events.value.push({
        msg: `fileSizeError: exceeded max file size for file ${fileName}`,
        variant: 'danger',
        show: true,
    });
};
</script>

<template>
    <div>
        <h1>File input</h1>

        <div class="mb-500">
            <es-file-input
                :upload-urls="uploadUrls"
                :max-file-size-mb="10"
                :file-types="['image/png', 'application/pdf']"
                @file-size-error="fileSizeError"
                @file-type-error="fileTypeError"
                @file-is-a-folder-error="fileIsAFolderError"
                @ready-to-upload="readyToUpload"
                @upload-success="uploadSuccess"
                @upload-failure="uploadFailure"
                @file-data-read="fileDataRead">
                <template #cta>
                    <h2 class="d-none d-md-inline-block font-size-500 text-center my-200">
                        Drag and drop your files or
                    </h2>
                    <p class="d-inline-block d-md-none my-200">
                        <b>Don't forget:</b> Make sure to upload an image of both sides of your bill.
                    </p>
                </template>
                <template #helpText>
                    <p class="d-none d-md-inline-block mb-0 mt-200">Please upload your file as a PDF or PNG.</p>
                    <p class="d-inline-block d-md-none mb-0 mt-200 font-size-sm">
                        Please upload your file as a PDF or PNG.
                    </p>
                </template>
            </es-file-input>
        </div>
        <div class="mb-500">
            <h2 class="mb-50">Collapsed</h2>
            <p class="mb-150">Only applicable on non-mobile devices (medium and up breakpoints).</p>
            <es-file-input
                :upload-urls="uploadUrls"
                :file-types="['image/png', 'application/pdf']"
                :collapsed="true"
                @file-size-error="fileSizeError"
                @file-type-error="fileTypeError"
                @file-is-a-folder-error="fileIsAFolderError"
                @ready-to-upload="readyToUpload"
                @upload-success="uploadSuccess"
                @upload-failure="uploadFailure"
                @file-data-read="fileDataRead">
                <template #cta>
                    <h3 class="d-none d-md-block mb-200 text-center">Drag and drop your files or</h3>
                    <p class="d-block d-md-none text-center">
                        <b>Don't forget:</b> Make sure to upload an image of both sides of your bill.
                    </p>
                </template>
                <template #helpText>
                    <p class="d-none d-md-block">Please upload your file as a PDF or PNG.</p>
                    <p class="d-md-none mb-0">File types: PDF or PNG</p>
                </template>
            </es-file-input>
        </div>
        <div class="mb-500">
            <h2 class="mb-50">Single file mode</h2>
            <p class="mb-150">When <code>:multiple="false"</code> is set, only one file can be selected at a time.</p>
            <es-file-input
                :upload-urls="uploadUrls"
                :file-types="['image/png', 'application/pdf']"
                :multiple="false"
                @file-size-error="fileSizeError"
                @file-type-error="fileTypeError"
                @file-is-a-folder-error="fileIsAFolderError"
                @ready-to-upload="readyToUpload"
                @upload-success="uploadSuccess"
                @upload-failure="uploadFailure"
                @file-data-read="fileDataRead">
                <template #cta>
                    <h2 class="d-none d-md-inline-block font-size-500 text-center my-200">
                        Drag and drop your file or
                    </h2>
                    <p class="d-inline-block d-md-none my-200 text-center">Upload a single file</p>
                </template>
                <template #helpText>
                    <p class="d-none d-md-inline-block mb-0 mt-200">Please upload one file as a PDF or PNG.</p>
                    <p class="d-inline-block d-md-none mb-0 mt-200 font-size-sm">Single file: PDF or PNG</p>
                </template>
            </es-file-input>
        </div>
        <div
            v-if="fileObjects.length"
            class="mb-500">
            <h2 class="mb-200">Upload links</h2>
            <form @submit.stop.prevent="onSubmit">
                <es-form-input
                    id="basicExample"
                    v-model="url">
                    <template #label> Where should I upload? </template>
                </es-form-input>
                <div class="d-flex flex-grow-1 justify-content-end mt-100">
                    <es-button
                        type="submit"
                        class="w-100 w-lg-auto">
                        <span class="position-relative d-inline-block w-100"> Submit </span>
                    </es-button>
                </div>
            </form>
        </div>
        <div v-if="events.length">
            <h2 class="mb-200">Emitted events</h2>
            <es-form-msg
                v-for="(event, index) in events"
                :key="index"
                :variant="event.variant"
                :show="event.show"
                :timeout="60"
                @hidden="event.show = false">
                {{ event.msg }}
            </es-form-msg>
        </div>
        <div class="mb-500">
            <h2>EsFileInput props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>
        <div class="mb-500">
            <h2>EsFileInput event listeners</h2>
            <ds-responsive-table>
                <ds-responsive-table-row
                    v-for="eventListener in fileUploadEventListeners"
                    :key="eventListener.name">
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name> Name </template>
                        <template #value>
                            <code>{{ eventListener.name }}</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name> Payload </template>
                        <template #value>
                            <code>{{ eventListener.payload }}</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name> Descriptions </template>
                        <template #value>
                            {{ eventListener.description }}
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-file-input.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/file-input.vue" />
    </div>
</template>
