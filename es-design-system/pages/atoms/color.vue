<template>
    <div>
        <h1>
            Colors
        </h1>
        <p>
            Below you will find our named color and variant definitions. They are meant
            to convey the meaning color using a defined naming convention. When working please
            use these color definitions and try to avoid introducing new unamed colors.
        </p>
        <b-row>
            <b-col cols="3">
                <h2>
                    Variants
                </h2>
                <DsColorTable
                    class="mb-4"
                    :colors="variants" />
            </b-col>
            <b-col cols="3">
                <h2>
                    Colors
                </h2>
                <DsColorTable
                    class="mb-4"
                    :colors="colors" />
            </b-col>
            <b-col cols="3">
                <h2>
                    Grays
                </h2>
                <DsColorTable
                    class="mb-4"
                    :colors="grays" />
            </b-col>
            <b-col cols="3">
                <h2>
                    Cyans
                </h2>
                <DsColorTable
                    class="mb-4"
                    :colors="cyans" />
            </b-col>
            <b-col cols="3">
                <h2>
                    Pinks
                </h2>
                <DsColorTable
                    class="mb-4"
                    :colors="pinks" />
            </b-col>
            <b-col cols="3">
                <h2>
                    Teals
                </h2>
                <DsColorTable
                    class="mb-4"
                    :colors="teals" />
            </b-col>
            <b-col cols="3">
                <h2>
                    Yellows
                </h2>
                <DsColorTable
                    class="mb-4"
                    :colors="yellows" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import DsColorTable from '@/components/ds-color-table.vue';
import sassColors from '@energysage/es-bs-base/scss/variables/_colors.scss';
import sassGrays from '@energysage/es-bs-base/scss/variables/_grays.scss';
import sassCyans from '@energysage/es-bs-base/scss/variables/_cyans.scss';
import sassPinks from '@energysage/es-bs-base/scss/variables/_pinks.scss';
import sassTeals from '@energysage/es-bs-base/scss/variables/_teals.scss';
import sassYellows from '@energysage/es-bs-base/scss/variables/_yellows.scss';
import sassVariants from '@energysage/es-bs-base/scss/variables/_variants.scss';

export default {
    name: 'AtomsColor',
    components: {
        DsColorTable,
    },
    data() {
        return {
            variants: sassVariants,
            grays: sassGrays,
            cyans: sassCyans,
            pinks: sassPinks,
            teals: sassTeals,
            yellows: sassYellows,
            colors: sassColors,
        };
    },
};
</script>
