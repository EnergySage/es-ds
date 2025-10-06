<script setup lang="ts">
const simpleModalVisible = ref(false);
const buttonsModalVisible = ref(false);
const noHeaderModalVisible = ref(false);

const propTableRows = [
    ['bodyClass', 'String', "''", 'Additional classes to add to the modal-body'],
    ['closable', 'Boolean', 'true', 'Whether the close button should appear in the top right corner.'],
    ['hideFooter', 'Boolean', 'false', 'Whether to show the modal footer.'],
    ['id', 'String', 'n/a', 'Required. Provide a unique id for the modal for accessibility purposes.'],
    [
        'showFooterSeparator',
        'Boolean',
        'true',
        'Whether to show the separator line between the modal content and footer.',
    ],
    ['size', 'string', "'md'", "Width of modal window. Allowed values: 'sm', 'md', 'lg', 'xl'"],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-modal.vue?raw');

        const docSource = await import('./modal.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Modal</h1>
        <p>
            Extended from
            <nuxt-link
                href="https://v3.primevue.org/dialog/"
                target="_blank">
                PrimeVue Modal
            </nuxt-link>
        </p>
        <div class="my-500">
            <es-button
                class="mb-100 mb-lg-0 mr-100"
                @click="simpleModalVisible = true">
                Show simple modal
            </es-button>
            <es-button
                class="mb-100 mb-lg-0 mr-100"
                @click="buttonsModalVisible = true">
                Show modal with buttons
            </es-button>
            <es-button
                class="mb-100 mb-lg-0"
                @click="noHeaderModalVisible = true">
                Show modal without header
            </es-button>

            <es-modal
                id="simple-modal"
                hide-footer
                :visible="simpleModalVisible"
                size="lg"
                @hidden="simpleModalVisible = false">
                <template #modal-title> Arcadia Reviews </template>
                <template #default>
                    <p
                        id="lorem-ipsum"
                        class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis lacus quis turpis commodo
                        tempus. Donec sodales enim in dolor blandit aliquet. Sed ac lectus ipsum. Curabitur et nisi
                        dapibus, ultricies lacus a, congue turpis. Nullam viverra velit nisi, sed eleifend neque
                        condimentum at. Sed a vulputate ligula, sit amet viverra velit. Proin interdum ornare. Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Praesent non
                        gravida leo, quis ultrices mi. Aliquam erat volutpat. Donec sed orci. Quisque felis est, et
                        cursus diam facilisis quis. Integer fermentum mauris ut metus dignissim, sed ligula finibus.
                        Donec non sem tempus nulla lobortis elementum at a sapien.
                    </p>
                </template>
            </es-modal>

            <es-modal
                id="buttons-modal"
                :visible="buttonsModalVisible"
                size="lg"
                @hidden="buttonsModalVisible = false">
                <template #modal-title> Arcadia Reviews </template>
                <template #default>
                    <p
                        id="lorem-ipsum"
                        class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis lacus quis turpis commodo
                        tempus. Donec sodales enim in dolor blandit aliquet. Sed ac lectus ipsum. Curabitur et nisi
                        dapibus, ultricies lacus a, congue turpis. Nullam viverra velit nisi, sed eleifend neque
                        condimentum at. Sed a vulputate ligula, sit amet viverra velit. Proin interdum ornare. Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Praesent non
                        gravida leo, quis ultrices mi. Aliquam erat volutpat. Donec sed orci. Quisque felis est, et
                        cursus diam facilisis quis. Integer fermentum mauris ut metus dignissim, sed ligula finibus.
                        Donec non sem tempus nulla lobortis elementum at a sapien. Sed ut elit. dignissim lobortis
                        varius.
                    </p>
                </template>
                <template #modal-footer>
                    <es-button
                        variant="link"
                        @click="buttonsModalVisible = false">
                        Cancel
                    </es-button>
                    <es-button
                        class="ml-100"
                        @click="buttonsModalVisible = false">
                        Submit
                    </es-button>
                </template>
            </es-modal>

            <es-modal
                id="no-header-modal"
                :visible="noHeaderModalVisible"
                class="px-200 py-150"
                :closable="false"
                :show-footer-separator="false"
                size="lg"
                @hidden="noHeaderModalVisible = false">
                <template #default>
                    <p
                        id="lorem-ipsum"
                        class="mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis lacus quis turpis commodo
                        tempus. Donec sodales enim in dolor blandit aliquet. Sed ac lectus ipsum. Curabitur et nisi
                        dapibus, ultricies lacus a, congue turpis. Nullam viverra velit nisi, sed eleifend neque
                        condimentum at. Sed a vulputate ligula, sit amet viverra velit. Proin interdum ornare. Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos. Praesent non
                        gravida leo, quis ultrices mi. Aliquam erat volutpat. Donec sed orci. Quisque felis est, et
                        cursus diam facilisis quis. Integer fermentum mauris ut metus dignissim, sed ligula finibus.
                        Donec non sem tempus nulla lobortis elementum at a sapien. Sed ut elit. dignissim lobortis
                        varius.
                    </p>
                </template>
                <template #modal-footer>
                    <es-button
                        variant="link"
                        @click="noHeaderModalVisible = false">
                        Cancel
                    </es-button>
                    <es-button
                        class="ml-100"
                        @click="noHeaderModalVisible = false">
                        Submit
                    </es-button>
                </template>
            </es-modal>
        </div>

        <div class="mb-500">
            <h2>EsModal props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-modal.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/modal.vue" />
    </div>
</template>
