<!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
<template>
    <div>
        <h1>
            Video
        </h1>
        <p>
            Shows the embed video when the cover is clicked.
        </p>
        <div>
            <es-video
                :alt-text="altText"
                class="my-450 mb-200 mb-lg-0"
                :cover-image-url="placeholderEsThumbnail"
                :embed-url="embedUrl" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsVideo.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-video.vue" />
    </div>
</template>
<script>
import placeholderEsThumbnail from '@/assets/placeholder/energysage_thumbnail.png';

export default {
    name: 'EsVideoDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            altText: 'Community solar: Everything you want to know before you join',
            placeholderEsThumbnail,
            embedUrl: 'https://www.youtube.com/embed/hgmZG3GLLNg',
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
