<template>
    <div>
        <h1>
            Layout
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/layout">
                bootstrap-vue layout
            </b-link>
        </p>
        <h2 class="mt-4">
            Responsive Breakpoints
        </h2>
        <p>
            At each breakpoint above extra small (xs), the content is constrained to the max width listed below.
        </p>
        <b-table
            fixed
            :fields="breakpointTableFields"
            :items="breakpointTableItems"
            striped>
            <template #cell(label)="data">
                <strong>{{ data.item.label }}</strong>
            </template>
        </b-table>
        <h2 class="mt-4">
            Grid Overview
        </h2>
        <b-container>
            <b-row>
                <b-col
                    cols="12"
                    class="bg-gray-light">
                    12 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="11"
                    class="bg-gray-light">
                    11 Columns
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-dark">
                    1
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="10"
                    class="bg-gray-light">
                    10 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-dark">
                    2 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="9"
                    class="bg-gray-light">
                    9 Columns
                </b-col>
                <b-col
                    cols="3"
                    class="bg-gray-dark">
                    3 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="8"
                    class="bg-gray-light">
                    8 Columns
                </b-col>
                <b-col
                    cols="4"
                    class="bg-gray-dark">
                    4 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="7"
                    class="bg-gray-light">
                    7 Columns
                </b-col>
                <b-col
                    cols="5"
                    class="bg-gray-dark">
                    5 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="6"
                    class="bg-gray-light">
                    6 Columns
                </b-col>
                <b-col
                    cols="6"
                    class="bg-gray-dark">
                    6 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="4"
                    class="bg-gray-light">
                    4 Columns
                </b-col>
                <b-col
                    cols="4"
                    class="bg-gray-dark">
                    4 Columns
                </b-col>
                <b-col
                    cols="4"
                    class="bg-gray-light">
                    4 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="3"
                    class="bg-gray-light">
                    3 Columns
                </b-col>
                <b-col
                    cols="3"
                    class="bg-gray-dark">
                    3 Columns
                </b-col>
                <b-col
                    cols="3"
                    class="bg-gray-light">
                    3 Columns
                </b-col>
                <b-col
                    cols="3"
                    class="bg-gray-dark">
                    3 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="2"
                    class="bg-gray-light">
                    2 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-dark">
                    2 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-light">
                    2 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-dark">
                    2 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-light">
                    2 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-dark">
                    2 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="1"
                    class="bg-gray-light">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-dark">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-light">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-dark">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-light">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-dark">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-light">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-dark">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-light">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-dark">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-light">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-dark">
                    1
                </b-col>
            </b-row>
        </b-container>
        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/atoms/layout.vue" />
    </div>
</template>

<script>
import sassBreakpoints from '@energysage/es-bs-base/scss/variables/_breakpoints.scss';
import sassMaxWidths from '@energysage/es-bs-base/scss/variables/_max-widths.scss';

export default {
    name: 'AtomsLayout',
    data() {
        return {
            docCode: '',
            breakpointTableFields: [
                { key: 'label', label: '' },
                { key: 'xs', label: 'Extra small (xs)' },
                { key: 'sm', label: 'Small (sm)' },
                { key: 'md', label: 'Medium (md)' },
                { key: 'lg', label: 'Large (lg)' },
                { key: 'xl', label: 'Extra large (xl)' },
                { key: 'xxl', label: 'Extra extra large (xxl)' },
            ],
            breakpointTableItems: [
                {
                    label: 'Breakpoint',
                    xs: `< ${sassBreakpoints.sm}`,
                    sm: `≥ ${sassBreakpoints.sm}`,
                    md: `≥ ${sassBreakpoints.md}`,
                    lg: `≥ ${sassBreakpoints.lg}`,
                    xl: `≥ ${sassBreakpoints.xl}`,
                    xxl: `≥ ${sassBreakpoints.xxl}`,
                },
                {
                    label: 'Max container width',
                    xs: 'None',
                    sm: sassMaxWidths.sm,
                    md: sassMaxWidths.md,
                    lg: sassMaxWidths.lg,
                    xl: sassMaxWidths.xl,
                    xxl: sassMaxWidths.xxl,
                },
            ],
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./layout.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/bootstrap';
@import "~@energysage/es-bs-base/scss/variables";

.bg-gray-light {
    background: $gray-400;
    text-align: center;
}

.bg-gray-dark {
    background: $gray-700;
    text-align: center;
}
</style>
