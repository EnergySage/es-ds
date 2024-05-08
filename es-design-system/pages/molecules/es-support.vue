<template>
    <div>
        <h1>
            Support
        </h1>
        <div class="my-500">
            <h2>
                Default
            </h2>
            <es-support
                :link="link"
                :src="placeholderPersonImage" />
            <h2 class="mt-500">
                Custom copy
            </h2>
            <es-support
                :link="link"
                :src="placeholderPersonImage">
                <template #title>
                    Need help with your quotes?
                </template>
                <template #linkCopy>
                    Schedule a free call with Jessica, your EnergySage specialist.
                </template>
            </es-support>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsSupport.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-support.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsSupportDocs',
    data() {
        return {
            link: 'https://www.energysage.com',
            compCode: '',
            docCode: '',
            placeholderPersonImage: 'https://a-us.storyblok.com/f/1006159/1200x1200/47efaeb0b3/jessica.png/m/280x280/filters:quality(100)',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-support.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsSupport.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
