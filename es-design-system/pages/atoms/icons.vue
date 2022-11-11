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
    </div>
</template>

<script>
import DsIconList from '@/components/ds-icon-list.vue';
import sassVariants from '@energysage/es-bs-base/scss/variables/_variants.scss';

export default {
    name: 'AtomsIcons',
    components: {
        DsIconList,
    },
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
    computed: {
        themeHexVal() {
            return this.variants[this.variantselected];
        },
    },
};
</script>
