<template>
    <div>
        <h1>
            Video
        </h1>
        <p>
            Shows a YouTube video when the provided cover image is clicked.
        </p>

        <div class="my-450">
            <b-row>
                <b-col md="8">
                    <es-video
                        :alt-text="`
                            ME from EnergySage talking to you about how to decide if solar panels
                            are worth it for your needs
                        `"
                        cover-image-url="https://a-us.storyblok.com/f/1006159/1280x720/2cb0626421/are-solar-panels-worth-it_.jpg/m/810x0/filters:format(jpg):quality(70)"
                        embed-url="https://www.youtube.com/embed/srBDwFZqOi0?si=ibiP1eg1wBdQcEFm" />
                </b-col>
            </b-row>
        </div>

        <div class="my-450">
            <b-row>
                <b-col md="8">
                    <es-video
                        alt-text="Heat Pump FAQs"
                        cover-image-url="https://a-us.storyblok.com/f/1006159/1280x720/72788401c8/heat-pump-faqs-2024.jpg/m/810x0/filters:format(jpg):quality(70)"
                        embed-url="https://www.youtube.com/embed/YHOIoxkX2kI" />
                </b-col>
            </b-row>
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsVideo.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-video.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsVideoDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-video.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsVideo.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
