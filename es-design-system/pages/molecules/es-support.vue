<template>
    <div>
        <h1>
            Support
        </h1>
        <div class="my-450">
            <h2>
                Default(Warm)
            </h2>
            <es-support
                :link="link"
                :src="placeholderPersonImage" />
            <h2 class="mt-450">
                Cool Variant
            </h2>
            <es-support
                variant="cool"
                :link="link"
                :src="placeholderPersonImage" />
            <h2 class="mt-450">
                Custom Copy
            </h2>
            <es-support
                :link="link"
                :src="placeholderPersonImage">
                <template #title>
                    Custom title
                </template>
                <template #linkCopy>
                    Link Copy
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
import placeholderPersonImage from '@/assets/placeholder/icon-person.svg';

export default {
    name: 'EsSupportDocs',
    data() {
        return {
            link: 'https://www.energysage.com',
            compCode: '',
            docCode: '',
            placeholderPersonImage,
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
