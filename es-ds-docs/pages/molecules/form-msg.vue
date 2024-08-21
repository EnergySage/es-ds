<script setup lang="ts">
const showHeaderError = ref(false);
const showHeaderInfo = ref(false);
const showHeaderSuccess = ref(false);
const showSimpleError = ref(false);
const showSimpleInfo = ref(false);
const showSimpleSuccess = ref(false);

const propTableRows = [
    [
        'show',
        'Boolean',
        'false',
        'Whether to show the form message. This component will respond to changes of this prop, '
        + 'and the client is responsible for setting it false upon receiving the "hidden" event.',
    ],
    [
        'timeout',
        'Number',
        '20',
        'How many seconds the message should show for.',
    ],
    [
        'variant',
        'String',
        '\'danger\'',
        'Controls the icon on the message. Options are danger, success, or primary.',
    ],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

if ($prism) {
    const compSource = await import('@energysage/es-ds-components/components/es-form-msg.vue?raw');
    const docSource = await import('./form-msg.vue?raw');

    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

<template>
    <div>
        <h1>
            Form message
        </h1>

        <div class="my-500">
            <h2>
                Simple
            </h2>

            <!-- TODO replace buttons with es-button after that's available -->
            <button
                class="mb-100 mb-sm-0 mr-100"
                @click="showSimpleSuccess = true">
                Show success
            </button>
            <button
                class="mb-100 mb-sm-0 mr-100"
                @click="showSimpleError = true">
                Show error
            </button>
            <button
                class="mb-100 mb-sm-0"
                @click="showSimpleInfo = true">
                Show info
            </button>

            <es-form-msg
                class="my-100"
                :show="showSimpleSuccess"
                variant="success"
                @hidden="showSimpleSuccess = false">
                <div class="align-items-center d-flex">
                    Saved successfully!
                </div>
            </es-form-msg>
            <es-form-msg
                class="my-100"
                :show="showSimpleError"
                variant="danger"
                @hidden="showSimpleError = false">
                <div class="align-items-center d-flex">
                    The server responded with an error and we were unable to complete your request.
                    Please try again.
                </div>
            </es-form-msg>
            <es-form-msg
                class="my-100"
                :show="showSimpleInfo"
                variant="primary"
                @hidden="showSimpleInfo = false">
                <div class="align-items-center d-flex">
                    <p class="mb-0">
                        Need expert advice? &nbsp;
                        <a href="https://www.energysage.com/">
                            Schedule a free call with our Energy Advisor team!
                        </a>
                    </p>
                </div>
            </es-form-msg>
        </div>

        <div class="my-500">
            <h2>
                With header and body
            </h2>

            <button
                class="mb-100 mb-sm-0  mr-100"
                @click="showHeaderSuccess = true">
                Show success
            </button>
            <button
                class="mb-100 mb-sm-0  mr-100"
                @click="showHeaderError = true">
                Show error
            </button>
            <button
                class="mb-100 mb-sm-0 "
                @click="showHeaderInfo = true">
                Show info
            </button>

            <es-form-msg
                class="my-100"
                :show="showHeaderSuccess"
                variant="success"
                @hidden="showHeaderSuccess = false">
                <div>
                    <h2 class="h4 mb-50">
                        bill.png
                    </h2>
                    <p class="mb-0">
                        Upload successful!
                    </p>
                </div>
            </es-form-msg>
            <es-form-msg
                class="my-100"
                :show="showHeaderError"
                variant="danger"
                @hidden="showHeaderError = false">
                <div>
                    <h2 class="h4 mb-50">
                        bill.webp
                    </h2>
                    <p class="mb-0">
                        Upload failed: incorrect file type.
                    </p>
                </div>
            </es-form-msg>
            <es-form-msg
                class="my-100"
                :show="showHeaderInfo"
                variant="primary"
                @hidden="showHeaderInfo = false">
                <div>
                    <h2 class="h4 mb-50">
                        bill.png
                    </h2>
                    <p class="mb-0">
                        This file is now available for preview.
                    </p>
                </div>
            </es-form-msg>
        </div>

        <div class="mb-500">
            <h2>
                EsFormMsg props
            </h2>
            <ds-prop-table
                :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsFormMsg.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-form-msg.vue" />
    </div>
</template>
