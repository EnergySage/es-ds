<template>
    <div width: 100%;>
        <h1>
            Layout
        </h1>
        <p>
            Extended from 
            <NuxtLink to="https://bootstrap-vue.org/docs/components/layout" target="_blank">
                bootstrap-vue layout
            </NuxtLink>
        </p>
        <h2 class="mt-200">
            Responsive Breakpoints
        </h2>
        <p>
            At each breakpoint above extra small (xs), the content is constrained to the max width listed below.
        </p>
        
        <ds-responsive-table>
            <ds-responsive-table-row
                v-for="item in breakpointTableItems"
                zebraStripes >
                <ds-responsive-table-column md="1.5"
                    v-for="field in breakpointTableFields">
                    <template #name>

                        <div 
                            v-if="field.label == ``">
                                &nbsp; 
                        </div>
                        <div v-else>
                            {{ field.label }} 
                        </div>
                    </template>
                    <template #value>
                        <div 
                            v-if="field.key == `label`">
                                <strong>{{ item[field.key] }} </strong>
                        </div>
                        <div v-else>
                            {{ item[field.key] }}
                        </div>
                    </template>
                </ds-responsive-table-column>
            </ds-responsive-table-row>
        </ds-responsive-table>

        <h2 class="mt-200">
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
            doc-source="es-ds-docs/atoms/layout.vue" />
    </div>
</template>
<script setup lang="ts">
import sassBreakpoints from '@energysage/es-bs-base/scss/modules/breakpoints.module.scss';
import sassMaxWidths from '@energysage/es-bs-base/scss/modules/max-widths.module.scss';

const  breakpointTableFields = [
                { key: 'label', label: `` },
                { key: 'xs', label: 'Extra small (xs)' },
                { key: 'sm', label: 'Small (sm)' },
                { key: 'md', label: 'Medium (md)' },
                { key: 'lg', label: 'Large (lg)' },
                { key: 'xl', label: 'Extra large (xl)' },
                { key: 'xxl', label: 'Extra extra large (xxl)' }];
const breakpointTableItems = [{
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
                }
            ];

const { $prism } = useNuxtApp();
const docCode = ref('');

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const docSource = await import('./layout.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>


<style lang="scss" scoped>
@use "@energysage/es-bs-base/scss/variables" as variables;

.bg-gray-light {
    background: variables.$gray-400;
    text-align: center;
}

.bg-gray-dark {
    background: variables.$gray-700;
    text-align: center;
    color: variables.$gray-400;
}
</style>
