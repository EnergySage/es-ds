<template>
    <div>
        <h1>
            Colors
        </h1>
        <b-row>
            <b-col>
                <h2>
                    Base Colors
                </h2>
                <DsColorTable
                    class="mb-4"
                    :colors="colors" />
            </b-col>
            <b-col>
                <h2>
                    Base Grays
                </h2>
                <DsColorTable
                    class="mb-4"
                    :colors="grays" />
            </b-col>
            <b-col>
                <h2>
                    Theme Aliases
                </h2>
                <DsColorTable
                    class="mb-4"
                    :colors="themeColors" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import DsColorTable from '@/components/ds-color-table.vue';
import {
    BRow,
    BCol,
} from 'bootstrap-vue';
import sassColors from '@energysage/es-bs-extends/scss/variables/_colors.scss';
import sassGrays from '@energysage/es-bs-extends/scss/variables/_grays.scss';
import sassThemeColors from '@energysage/es-bs-extends/scss/variables/_theme-colors.scss';

export default {
    name: 'AtomsColor',
    components: {
        BRow,
        BCol,
        DsColorTable,
    },
    data() {
        return {
            colors: sassColors,
            grays: sassGrays,
            themeColors: sassThemeColors,
        };
    },
};
</script>
