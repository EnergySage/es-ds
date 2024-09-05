<script setup lang="ts">
import sassBreakpoints from '@energysage/es-ds-styles/scss/modules/breakpoints.module.scss';
import sassMaxWidths from '@energysage/es-ds-styles/scss/modules/max-widths.module.scss';

const breakpointTableLabels = ['Breakpoint', 'Max container width'];

const breakpointTableFields = [
    // { key: 'label', label: `` },
    { key: 'xs', label: 'Extra small (xs)' },
    { key: 'sm', label: 'Small (sm)' },
    { key: 'md', label: 'Medium (md)' },
    { key: 'lg', label: 'Large (lg)' },
    { key: 'xl', label: 'Extra large (xl)' },
    { key: 'xxl', label: 'Extra extra large (xxl)' },
];
const breakpointTableItems = [
    {
        // label: 'Breakpoint',
        xs: `< ${sassBreakpoints.sm}`,
        sm: `≥ ${sassBreakpoints.sm}`,
        md: `≥ ${sassBreakpoints.md}`,
        lg: `≥ ${sassBreakpoints.lg}`,
        xl: `≥ ${sassBreakpoints.xl}`,
        xxl: `≥ ${sassBreakpoints.xxl}`,
    },
    {
        // label: 'Max container width',
        xs: 'None',
        sm: sassMaxWidths.sm,
        md: sassMaxWidths.md,
        lg: sassMaxWidths.lg,
        xl: sassMaxWidths.xl,
        xxl: sassMaxWidths.xxl,
    },
];

const { $prism } = useNuxtApp();
const docCode = ref('');

if ($prism) {
    // eslint-disable-next-line import/no-self-import
    const docSource = await import('./layout.vue?raw');
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>
<template>
    <div>
        <h1>Layout</h1>
        <p>
            Based on
            <nuxt-link
                to="https://bootstrap-vue.org/docs/components/layout"
                target="_blank">
                Bootstrap Vue layout
            </nuxt-link>
        </p>
        <h2 class="mt-200">Responsive breakpoints</h2>
        <p>At each breakpoint above extra small (xs), the content is constrained to the max width listed below.</p>
        <ds-responsive-table>
            <ds-responsive-table-row
                v-for="field in breakpointTableFields"
                :key="field.key"
                zebra-stripes>
                <ds-responsive-table-column>
                    <template #name> &nbsp; </template>
                    <template #value>
                        <div>
                            <strong>{{ field.label }} </strong>
                        </div>
                    </template>
                </ds-responsive-table-column>
                <ds-responsive-table-column
                    v-for="(item, index) in breakpointTableItems"
                    :key="index">
                    <template #name>
                        {{ breakpointTableLabels[index] }}
                    </template>
                    <template #value>
                        {{ item[field.key] }}
                    </template>
                </ds-responsive-table-column>
            </ds-responsive-table-row>
        </ds-responsive-table>
        <h2 class="mt-200">Grid overview</h2>
        <b-container>
            <b-row>
                <b-col
                    cols="12"
                    class="bg-gray-400 text-center">
                    12 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="11"
                    class="bg-gray-400 text-center">
                    11 Columns
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="10"
                    class="bg-gray-400 text-center">
                    10 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-700 text-center text-gray-400">
                    2 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="9"
                    class="bg-gray-400 text-center">
                    9 Columns
                </b-col>
                <b-col
                    cols="3"
                    class="bg-gray-700 text-center text-gray-400">
                    3 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="8"
                    class="bg-gray-400 text-center">
                    8 Columns
                </b-col>
                <b-col
                    cols="4"
                    class="bg-gray-700 text-center text-gray-400">
                    4 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="7"
                    class="bg-gray-400 text-center">
                    7 Columns
                </b-col>
                <b-col
                    cols="5"
                    class="bg-gray-700 text-center text-gray-400">
                    5 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="6"
                    class="bg-gray-400 text-center">
                    6 Columns
                </b-col>
                <b-col
                    cols="6"
                    class="bg-gray-700 text-center text-gray-400">
                    6 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="4"
                    class="bg-gray-400 text-center">
                    4 Columns
                </b-col>
                <b-col
                    cols="4"
                    class="bg-gray-700 text-center text-gray-400">
                    4 Columns
                </b-col>
                <b-col
                    cols="4"
                    class="bg-gray-400 text-center">
                    4 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="3"
                    class="bg-gray-400 text-center">
                    3 Columns
                </b-col>
                <b-col
                    cols="3"
                    class="bg-gray-700 text-center text-gray-400">
                    3 Columns
                </b-col>
                <b-col
                    cols="3"
                    class="bg-gray-400 text-center">
                    3 Columns
                </b-col>
                <b-col
                    cols="3"
                    class="bg-gray-700 text-center text-gray-400">
                    3 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="2"
                    class="bg-gray-400 text-center">
                    2 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-700 text-center text-gray-400">
                    2 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-400 text-center">
                    2 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-700 text-center text-gray-400">
                    2 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-400 text-center">
                    2 Columns
                </b-col>
                <b-col
                    cols="2"
                    class="bg-gray-700 text-center text-gray-400">
                    2 Columns
                </b-col>
            </b-row>
            <b-row>
                <b-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </b-col>
                <b-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </b-col>
            </b-row>
        </b-container>
        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-ds-docs/atoms/layout.vue" />
    </div>
</template>
