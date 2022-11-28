<template>
    <div>
        <h1>
            Slider
        </h1>
        <p class="pb-5">
            Extended from <b-link href="https://nightcatsama.github.io/vue-slider-component/">
                vue-slider-component
            </b-link>
        </p>
        <es-slider
            class="my-5"
            :starting-value="startingValue"
            :data="data"
            :marks="marks"
            :min="min"
            :max="max"
            @change="changeEvent" />
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsSlider.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-slider.vue" />
    </div>
</template>
<script>
import { EsSlider } from '@energysage/es-vue-base';

export default {
    name: 'EsSliderDocs',
    components: {
        EsSlider,
    },
    data() {
        return {
            startingValue: 0,
            data: [0, 25, 50, 75, 100],
            marks: [0, 100],
            min: 0,
            max: 100,
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const docSource = await import('!raw-loader!./es-slider.vue');
        const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsSlider.vue');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        this.docCode = this.$prism.normalizeCode(docSource.default);
        this.compCode = this.$prism.normalizeCode(compSource.default);
        this.$prism.highlight(this);
    },
    methods: {
        changeEvent($event) {
            // eslint-disable-next-line no-alert
            alert($event);
        },
    },
};
</script>
