<template>
    <div>
        <h1>
            Slider
        </h1>
        <p class="pb-500">
            Extended from <b-link
                href="https://nightcatsama.github.io/vue-slider-component/"
                target="_blank">
                vue-slider-component
            </b-link>
        </p>
        <es-slider
            class="my-500"
            :starting-value="startingValue"
            :data="data"
            :marks="marks"
            :min="min"
            :max="max"
            :label-formatter="val => `$${val}`"
            :tooltip-formatter="val => `$${val}`" />
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsSlider.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-slider.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsSliderDocs',
    data() {
        return {
            startingValue: 100,
            data: [0, 25, 50, 75, 100, 250, 500, 750, 1000],
            marks: [0, 1000],
            min: 0,
            max: 1000,
            compCode: '',
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-slider.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsSlider.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        // changeEvent($event) {
        //     // eslint-disable-next-line no-alert
        //     alert($event);
        // },
    },
};
</script>
