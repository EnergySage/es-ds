<template>
    <div>
        <h1>
            Video
        </h1>
        <p>
            Shows a YouTube video when the provided cover image is clicked.
        </p>
        <div>
            <b-row class="justify-content-center my-200 my-lg-450">
                <b-col md="8">
                    <es-video
                        alt-text="Community solar: Everything you want to know before you join"
                        cover-image-url="https://a-us.storyblok.com/f/1006156/1920x1080/d391440b19/energysage_thumbnail.png"
                        embed-url="https://www.youtube.com/embed/hgmZG3GLLNg" />
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
