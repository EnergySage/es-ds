<template>
    <div>
        <h1>
            Icons
        </h1>
        <b-row>
            <b-col>
                <DsIconList
                    class="mb-4 pt-4"
                    :color="themeHexVal" />

                <hr class="mt-4 pt-4">

                <h2>
                    Variants
                </h2>
                <b-form-group label="Radios using options">
                    <b-form-radio-group
                        id="radio-group-1"
                        v-model="variantselected"
                        :options="themeColorOptions"
                        name="radio-theme-color" />
                </b-form-group>
            </b-col>
        </b-row>
        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/atoms/icons.vue" />
    </div>
</template>

<script>
import sassVariants from '@energysage/es-bs-base/scss/variables/_variants.scss';

export default {
    name: 'AtomsIcons',
    asyncData() {
        // Theme Colors
        const themeNames = Object.keys(sassVariants)
            .map((k) => k)
            .reduce((prev, cur) => {
                // eslint-disable-next-line no-param-reassign
                prev[cur] = cur;
                return prev;
            }, {});
        const themeColorOptions = Object.keys(themeNames).map((k) => ({
            text: k,
            value: k,
        }));
        const variants = Object.keys(themeNames)
            .map((k) => k)
            .reduce((prev, cur) => {
                // eslint-disable-next-line no-param-reassign
                prev[cur] = sassVariants[cur];
                return prev;
            }, {});
        return {
            variantselected: themeNames.primary,
            themeColorOptions,
            variants,
            themeNames,
        };
    },
    data() {
        return {
            docCode: '',
        };
    },
    computed: {
        themeHexVal() {
            return this.variants[this.variantselected];
        },
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./icons.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
