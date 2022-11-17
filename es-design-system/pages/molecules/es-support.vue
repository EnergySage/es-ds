<template>
    <div>
        <h1>
            Support
        </h1>
        <div class="my-5">
            <h2>
                Default(Warm)
            </h2>
            <es-support
                :link="link"
                :src="benr" />
            <h2 class="mt-5">
                Cool Variant
            </h2>
            <es-support
                variant="cool"
                :link="link"
                :src="benr" />
            <h2 class="mt-5">
                Custom Copy
            </h2>
            <es-support
                :link="link"
                :src="benr">
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
import { EsSupport } from '@energysage/es-vue-base';
import benr from '@/assets/imgs/benr.png';

export default {
    name: 'EsSupportDocs',
    components: {
        EsSupport,
    },
    data() {
        return {
            link: 'https://www.energysage.com',
            benr,
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const docSource = await import('!raw-loader!./es-support.vue');
        const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsSupport.vue');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        this.docCode = this.$prism.normalizeCode(docSource.default);
        this.compCode = this.$prism.normalizeCode(compSource.default);
        this.$prism.highlight(this);
    },
};
</script>
