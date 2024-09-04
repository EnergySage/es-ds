<script setup lang="ts">
import sassSpacers from '@energysage/es-ds-styles/scss/modules/spacers.module.scss';

const DEPRECATED_SPACERS = [1, 2, 3, 4, 5, 6, 450];
const generateAlias = (key) => `p-${key} m-${key}`;

const convertSpacerVariablesToTableEntries = (vars) =>
    Object.keys(vars)
        .map((key) => ({ key, value: vars[key] }))
        .map((item) => {
            const key = parseInt(item.key.replace(/s/, ''), 10);
            const alias = generateAlias(key);
            const em = Number(item.value.replace(/rem/, ''));
            const px = em * 16; // Assuming we'll never change base font-size
            return {
                alias,
                em,
                key,
                px,
            };
        });

const tableEntries = computed(() => convertSpacerVariablesToTableEntries(sassSpacers));
const spacers = computed(() => tableEntries.value.filter((spacer) => !DEPRECATED_SPACERS.includes(spacer.key)));
const deprecatedSpacers = computed(() =>
    tableEntries.value // filter out updated spacers
        .filter((spacer) => DEPRECATED_SPACERS.includes(spacer.key))
        // find the equivalent spacer from the updated naming scheme
        .map((entry) => {
            const newSpacer = spacers.value.find((spacer) => spacer.px === entry.px);
            return {
                ...entry,
                newKey: newSpacer ? newSpacer.key : 'n/a',
                newAlias: newSpacer ? generateAlias(newSpacer.key) : 'n/a',
            };
        })
        // eslint-disable-next-line no-nested-ternary
        .sort((a, b) => (a.px < b.px ? -1 : a.px > b.px ? 1 : 0)),
);

const { $prism } = useNuxtApp();
const docCode = ref('');

if ($prism) {
    // eslint-disable-next-line import/no-self-import
    const docSource = await import('./spacing.vue?raw');
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}
</script>

<template>
    <div>
        <h1>Spacing</h1>
        <p>
            Extended from
            <nuxt-link
                to="https://getbootstrap.com/docs/4.6/utilities/spacing/"
                target="_blank">
                bootstrap spacing
            </nuxt-link>
        </p>

        <div class="mb-500">
            <p>
                Each spacing class is named for the percentage of the base size (16px) that generates the associated
                pixel value.
            </p>
            <p>For example, 32px is 200% of 16px, so the classes are named <code>p-200 m-200</code>.</p>

            <ds-responsive-table>
                <ds-responsive-table-row
                    v-for="space in spacers"
                    :key="space.alias">
                    <ds-responsive-table-column md="3">
                        <template #name> Example </template>
                        <template #value>
                            <div
                                v-if="space.key > 0"
                                class="d-inline-block bg-soft-blue font-weight-semibold position-relative"
                                :class="[`pl-${space.key} pt-${space.key}`]">
                                <span
                                    class="spacer-example position-absolute"
                                    :class="{
                                        //'font-size-xs': space.key < 200,
                                        'spacer-example--outside': space.key < 150,
                                    }">
                                    {{ space.px }}
                                </span>
                            </div>
                            <div
                                v-else
                                class="font-weight-semibold">
                                {{ space.px }}
                            </div>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column md="3">
                        <template #name> Name </template>
                        <template #value>
                            <code>{{ space.alias }}</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column md="3">
                        <template #name> Size </template>
                        <template #value>
                            {{ `${space.px}px` }}
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column md="3">
                        <template #name> Multiplier </template>
                        <template #value>
                            {{ `${space.em}rem` }}
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>

        <es-collapse
            id="legacy-collapse"
            :is-programmatic-until-user-input="false">
            <template #title>
                <h2 class="mb-0">Legacy spacing</h2>
            </template>
            <p>
                The following class names remain for backward compatibility but should not be used. Please refactor any
                code that does use them, as they will be removed in a future version of ESDS.
            </p>

            <ds-responsive-table>
                <ds-responsive-table-row
                    v-for="space in deprecatedSpacers"
                    :key="space.alias">
                    <ds-responsive-table-column md="3">
                        <template #name> Old name </template>
                        <template #value>
                            <code>{{ space.alias }}</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column md="3">
                        <template #name> New name </template>
                        <template #value>
                            <code v-if="space.newAlias !== 'n/a'">
                                {{ space.newAlias }}
                            </code>
                            <span v-else>
                                {{ space.newAlias }}
                            </span>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column md="3">
                        <template #name> Size </template>
                        <template #value>
                            {{ `${space.px}px` }}
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column md="3">
                        <template #name> Multiplier </template>
                        <template #value>
                            {{ `${space.em}rem` }}
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </es-collapse>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-ds-docs/atoms/spacing.vue" />
    </div>
</template>

<style lang="scss" scoped>
.spacer-example {
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);

    &--outside {
        left: 24px;
        transform: translateY(-50%);
    }
}
</style>
