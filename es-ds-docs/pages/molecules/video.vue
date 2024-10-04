<script setup lang="ts">
const propTableRows = [
    ['alt-text', 'String', 'n/a', 'Required. A short description of the video'],
    ['cover-image-url', 'String', 'n/a', 'Required. The image shown before loading the video'],
    [
        'embed-url',
        'String',
        'n/a',
        'Required. The embed URL following the format https://www.youtube.com/embed/:video-id',
    ],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-video.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./video.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const showModal = ref(false);
</script>

<template>
    <div>
        <h1>Video</h1>

        <div class="my-500">
            <h2>Example 1</h2>
            <es-row>
                <es-col md="8">
                    <es-video
                        alt-text="EnergySage talking to you about how to decide if solar panels are worth it for your needs"
                        cover-image-url="https://a-us.storyblok.com/f/1006159/1280x720/2cb0626421/are-solar-panels-worth-it_.jpg/m/810x0/filters:format(jpg):quality(70)"
                        embed-url="https://www.youtube.com/embed/srBDwFZqOi0" />
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Example 2</h2>
            <es-row>
                <es-col md="8">
                    <es-video
                        alt-text="Heat Pump FAQs"
                        cover-image-url="https://a-us.storyblok.com/f/1006159/1280x720/72788401c8/heat-pump-faqs-2024.jpg/m/810x0/filters:format(jpg):quality(70)"
                        embed-url="https://www.youtube.com/embed/YHOIoxkX2kI" />
                </es-col>
            </es-row>
        </div>

        <div class="my-500">
            <h2>Video in modal</h2>
            <button @click="showModal = !showModal">Show/Hide modal</button>
            <es-modal
                id="simple-modal"
                hide-footer
                :visible="showModal"
                size="lg"
                @hidden="showModal = false">
                <template #modal-title> Modal example </template>
                <template #default>
                    <es-video
                        alt-text="Heat Pump FAQs"
                        cover-image-url="https://a-us.storyblok.com/f/1006159/1280x720/72788401c8/heat-pump-faqs-2024.jpg/m/810x0/filters:format(jpg):quality(70)"
                        embed-url="https://www.youtube.com/embed/YHOIoxkX2kI" />
                </template>
            </es-modal>
        </div>

        <div class="mb-500">
            <h2>EsVideo props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-video.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/video.vue" />
    </div>
</template>
