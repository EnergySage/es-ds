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
</script>

<template>
    <div>
        <h1>Video</h1>
        <div class="my-500">
            <b-row>
                <b-col md="8">
                    <es-video
                        alt-text="Bears, beets, Battlestar Galactica."
                        cover-image-url="/placeholders/810-455.jpg"
                        embed-url="https://www.youtube.com/embed/dQw4w9WgXcQ" />
                </b-col>
            </b-row>
        </div>

        <div class="my-500">
            <b-row>
                <b-col md="8">
                    <es-video
                        alt-text="The worst thing about prison was the Dementors."
                        cover-image-url="/placeholders/810-456.jpg"
                        embed-url="https://www.youtube.com/embed/djV11Xbc914" />
                </b-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2>Props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-video.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/video.vue" />
    </div>
</template>
