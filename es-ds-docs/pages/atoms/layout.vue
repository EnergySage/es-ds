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

// Name, type, required, default value, description
const esColProps = [
    ['cols', 'string', 'n/a', 'Number of columns to span'],
    ['sm', 'string', 'n/a', 'Number of columns to span in the sm breakpoint and above'],
    ['md', 'string', 'n/a', 'Number of columns to span in the md breakpoint and above'],
    ['lg', 'string', 'n/a', 'Number of columns to span in the lg breakpoint and above'],
    ['xl', 'string', 'n/a', 'Number of columns to span in the xl breakpoint and above'],
    ['xxl', 'string', 'n/a', 'Number of columns to span in the xxl breakpoint and above'],
];

const { $prism } = useNuxtApp();
const docCode = ref('');

const esContainerCode = ref('');
const esColCode = ref('');
const esRowCode = ref('');

onMounted(async () => {
    if ($prism) {
        const docSource = await import('./layout.vue?raw');
        docCode.value = $prism.normalizeCode(docSource.default);

        const esContainerCodeSource = await import('@energysage/es-ds-components/components/es-container.vue?raw');
        esContainerCode.value = $prism.normalizeCode(esContainerCodeSource.default);

        const esColCodeSource = await import('@energysage/es-ds-components/components/es-col.vue?raw');
        esColCode.value = $prism.normalizeCode(esColCodeSource.default);

        const esRowCodeSource = await import('@energysage/es-ds-components/components/es-row.vue?raw');
        esRowCode.value = $prism.normalizeCode(esRowCodeSource.default);

        $prism.highlight();
    }
});
</script>
<template>
    <div>
        <h1>Layout</h1>
        <p>
            Based on
            <nuxt-link
                to="https://bootstrap-vue.org/docs/components/layout"
                target="_blank">
                Bootstrap Vue layout </nuxt-link
            >. <code>es-container</code>, <code>es-row</code>, and <code>es-col</code> are based on
            <code>b-container</code>, <code>b-row</code>, and <code>b-col</code> respectively, but support only a
            subset of props as documented below.
        </p>
        <p>
            The subset of props is sufficient to cover most of our existing use cases, and allow doing a global find
            and replace for <code>b-container</code> to <code>es-container</code>
            (for example) to migrate to the V3 design system.
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
                        <!-- @vue-expect-error -->
                        {{ item[field.key] }}
                    </template>
                </ds-responsive-table-column>
            </ds-responsive-table-row>
        </ds-responsive-table>
        <h2 class="mt-200">Grid overview</h2>
        <es-container>
            <es-row>
                <es-col
                    cols="12"
                    class="bg-gray-400 text-center">
                    12 Columns
                </es-col>
            </es-row>
            <es-row>
                <es-col
                    cols="11"
                    class="bg-gray-400 text-center">
                    11 Columns
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </es-col>
            </es-row>
            <es-row>
                <es-col
                    cols="10"
                    class="bg-gray-400 text-center">
                    10 Columns
                </es-col>
                <es-col
                    cols="2"
                    class="bg-gray-700 text-center text-gray-400">
                    2 Columns
                </es-col>
            </es-row>
            <es-row>
                <es-col
                    cols="9"
                    class="bg-gray-400 text-center">
                    9 Columns
                </es-col>
                <es-col
                    cols="3"
                    class="bg-gray-700 text-center text-gray-400">
                    3 Columns
                </es-col>
            </es-row>
            <es-row>
                <es-col
                    cols="8"
                    class="bg-gray-400 text-center">
                    8 Columns
                </es-col>
                <es-col
                    cols="4"
                    class="bg-gray-700 text-center text-gray-400">
                    4 Columns
                </es-col>
            </es-row>
            <es-row>
                <es-col
                    cols="7"
                    class="bg-gray-400 text-center">
                    7 Columns
                </es-col>
                <es-col
                    cols="5"
                    class="bg-gray-700 text-center text-gray-400">
                    5 Columns
                </es-col>
            </es-row>
            <es-row>
                <es-col
                    cols="6"
                    class="bg-gray-400 text-center">
                    6 Columns
                </es-col>
                <es-col
                    cols="6"
                    class="bg-gray-700 text-center text-gray-400">
                    6 Columns
                </es-col>
            </es-row>
            <es-row>
                <es-col
                    cols="4"
                    class="bg-gray-400 text-center">
                    4 Columns
                </es-col>
                <es-col
                    cols="4"
                    class="bg-gray-700 text-center text-gray-400">
                    4 Columns
                </es-col>
                <es-col
                    cols="4"
                    class="bg-gray-400 text-center">
                    4 Columns
                </es-col>
            </es-row>
            <es-row>
                <es-col
                    cols="3"
                    class="bg-gray-400 text-center">
                    3 Columns
                </es-col>
                <es-col
                    cols="3"
                    class="bg-gray-700 text-center text-gray-400">
                    3 Columns
                </es-col>
                <es-col
                    cols="3"
                    class="bg-gray-400 text-center">
                    3 Columns
                </es-col>
                <es-col
                    cols="3"
                    class="bg-gray-700 text-center text-gray-400">
                    3 Columns
                </es-col>
            </es-row>
            <es-row>
                <es-col
                    cols="2"
                    class="bg-gray-400 text-center">
                    2 Columns
                </es-col>
                <es-col
                    cols="2"
                    class="bg-gray-700 text-center text-gray-400">
                    2 Columns
                </es-col>
                <es-col
                    cols="2"
                    class="bg-gray-400 text-center">
                    2 Columns
                </es-col>
                <es-col
                    cols="2"
                    class="bg-gray-700 text-center text-gray-400">
                    2 Columns
                </es-col>
                <es-col
                    cols="2"
                    class="bg-gray-400 text-center">
                    2 Columns
                </es-col>
                <es-col
                    cols="2"
                    class="bg-gray-700 text-center text-gray-400">
                    2 Columns
                </es-col>
            </es-row>
            <es-row>
                <es-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-400 text-center">
                    1
                </es-col>
                <es-col
                    cols="1"
                    class="bg-gray-700 text-center text-gray-400">
                    1
                </es-col>
            </es-row>
        </es-container>

        <div class="mb-300 mt-300">
            <h2>EsContainer</h2>
            <p>Only input is a <code>slot</code></p>
        </div>

        <div class="mb-300">
            <h2>EsRow</h2>
            <p>Only input is a <code>slot</code></p>
        </div>

        <div class="mb-300">
            <h2>EsCol</h2>
            <ds-prop-table :rows="esColProps" />
        </div>

        <ds-doc-source
            comp-title="EsContainer source"
            :comp-code="esContainerCode"
            comp-source="es-ds-components/components/es-container.vue" />
        <ds-doc-source
            comp-title="EsRow source"
            :comp-code="esRowCode"
            comp-source="es-ds-components/components/es-row.vue" />
        <ds-doc-source
            comp-title="EsCol source"
            :comp-code="esColCode"
            comp-source="es-ds-components/components/es-col.vue" />
        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-ds-docs/atoms/layout.vue" />
    </div>
</template>
