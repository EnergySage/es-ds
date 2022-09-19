<template>
    <div>
        <b-row>
            <b-col>
                <h1>
                    Icons
                </h1>
                <DsIconList
                    class="mb-4 pt-4"
                    :color="themeHexVal" />

                <hr class="mt-4 pt-4">

                <h2>
                    Theme Colors
                </h2>
                <b-form-group label="Radios using options">
                    <b-form-radio-group
                        id="radio-group-1"
                        v-model="themeColorSelected"
                        :options="themeColorOptions"
                        name="radio-theme-color" />
                </b-form-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import DsIconList from '@/components/ds-icon-list.vue';
import sassThemeColors from '@energysage/es-bs-base/scss/variables/_theme-colors.scss';

export default {
    name: 'AtomsIcons',
    components: {
        DsIconList,
    },
    asyncData() {
        // Theme Colors
        const themeNames = Object.keys(sassThemeColors)
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
        const themeColors = Object.keys(themeNames)
            .map((k) => k)
            .reduce((prev, cur) => {
                // eslint-disable-next-line no-param-reassign
                prev[cur] = sassThemeColors[cur];
                return prev;
            }, {});
        return {
            themeColorSelected: themeNames.primary,
            themeColorOptions,
            themeColors,
            themeNames,
        };
    },
    computed: {
        themeHexVal() {
            return this.themeColors[this.themeColorSelected];
        },
    },
};
</script>
