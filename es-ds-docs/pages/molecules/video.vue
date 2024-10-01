<script setup lang="ts">
const propTableRows = [
    ['alt-text', 'String', 'n/a', 'Required.'],
    ['cover-image-url', 'String', 'n/a', 'Required.'],
    ['embed-url', 'String', 'n/a', 'Required.'],
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
        <h1>
            Video
        </h1>
        <div class="my-500">
            <b-row>
                <!-- TODO: set explicit width & height on on es-video container to avoid CLS -->
                <b-col md="8">
                    <es-video
                        :alt-text="`
                            ME from EnergySage talking to you about how to decide if solar panels
                            are worth it for your needs
                        `"
                        cover-image-url="https://a-us.storyblok.com/f/1006159/1280x720/2cb0626421/are-solar-panels-worth-it_.jpg/m/810x0/filters:format(jpg):quality(70)"
                        embed-url="https://www.youtube.com/embed/srBDwFZqOi0" />
                </b-col>
            </b-row>
        </div>

        <div class="my-500">
            <b-row>
                <b-col md="8">
                    <es-video
                        alt-text="Heat Pump FAQs"
                        cover-image-url="https://a-us.storyblok.com/f/1006159/1280x720/72788401c8/heat-pump-faqs-2024.jpg/m/810x0/filters:format(jpg):quality(70)"
                        embed-url="https://www.youtube.com/embed/YHOIoxkX2kI" />
                </b-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2>Props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-form-input.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/text-input.vue" />

    </div>
</template>
