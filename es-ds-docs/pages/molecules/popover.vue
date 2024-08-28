<script setup lang="ts">
const directives = computed(() => {  return [
                { directive: 'topright', text: 'Top right' },
                { directive: 'bottomright', text: 'Bottom right' },
                { directive: 'leftbottom', text: 'Left bottom' },
                { directive: 'rightbottom', text: 'Right bottom' },
            ];
        })

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

const propTableRows = [
    [
        'triggers',
        '[String, Object]',
        'focus',
        'Specifies different triggers for the popover',
    ],
    [
        'placement',
        'String',
        'auto',
        'Specifies different placement options for the popover'
    ],
    [
        'show',
        'Boolean',
        'false',
        'When present, it allows the popover to be visible'
    ],
    [
        'variant',
        'String',
        'dark',
        'Defines variant of the popover - either dark or light'
    ],
     [
        'target',
        'String',
        'n/a',
        'Required. Target defines the variant(dark, light), with or without title, button and the placement of the popover',
    ],
];
const propTableWidths = {
    md: ['2','3','2','5'],
};


onMounted(async () => {
  if ($prism) {
    const compSource = await import('@energysage/es-ds-components/components/es-popover.vue?raw');
    const docSource = await import('./popover.vue?raw');
    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
  }
});

</script>

<template>
    <div>
        <div class="mb-100">
            <h1>
                Popover
            </h1>
            <p>
                Extended from <nuxt-link
                    href="https://v3.primevue.org/overlaypanel/"
                    target="_blank">
                    primevue OverlayPanel
                </nuxt-link>
            </p>
            <div class="my-500">
                <h2>
                    Dark variant
                </h2>
                <div
                    v-for="placement in directives"
                    :key="`dark-${placement.directive}`"
                    class="py-100">
                    <h3>
                        {{ placement.text }}
                    </h3>
                    <div>
                        <!-- eslint-disable vuejs-accessibility/label-has-for -->
                        <label>
                            With title
                            <nuxt-link
                                :id="`darkTitleTarget-${placement.directive}`"
                                class="p-0 text-gray-700"
                                tabindex="0">
                                <IconInfo
                                    width="16px"
                                    height="16px" />
                            </nuxt-link>
                        </label>
                        <es-popover
                            :placement="placement.directive"
                            :target="`darkTitleTarget-${placement.directive}`"
                            variant="dark">
                            <template #title>
                                My title
                            </template>
                            <p class="mb-0">
                                Install solar panels through this program and get $250 cash back.
                                <a
                                    class="mt-50 d-block"
                                    href="https://communitysolar.energysage.com/"
                                    target="_blank">Learn more</a>
                            </p>
                        </es-popover>
                    </div>
                    <div>
                        <label>
                            No title
                            <nuxt-link
                                :id="`darkNoTitleTarget-${placement.directive}`"
                                class="p-0 text-gray-700"
                                tabindex="0">
                                <IconInfo
                                    width="16px"
                                    height="16px" />
                            </nuxt-link>
                        </label>
                        <es-popover
                            :placement="placement.directive"
                            :target="`darkNoTitleTarget-${placement.directive}`"
                            variant="dark">
                            <p class="mb-0">
                                Install solar panels through this program and get $250 cash back.
                                <a
                                    class="mt-50 d-block"
                                    href="https://communitysolar.energysage.com/"
                                    target="_blank">Learn more</a>
                            </p>
                        </es-popover>
                    </div>
                    <div>
                        <label>
                            With button
                            <nuxt-link
                                :id="`darkButtonTarget-${placement.directive}`"
                                class="p-0 text-gray-700"
                                tabindex="0">
                                <IconInfo
                                    width="16px"
                                    height="16px" />
                            </nuxt-link>
                        </label>
                        <es-popover
                            :placement="placement.directive"
                            :target="`darkButtonTarget-${placement.directive}`"
                            variant="dark">
                            <template #title>
                                My title
                            </template>
                            <p class="mb-0">
                                Install solar panels through this program and get $250 cash back.
                                <button
                                    size="sm"
                                    class="mt-100 d-block"
                                    variant="dark-bg">
                                    Small button
                                </button>
                            </p>
                        </es-popover>
                    </div>
                </div>
            </div>
            <div class="bg-dark-blue p-100 my-450 rounded-lg text-white">
                <h2 class="text-white">
                    Light variant
                </h2>
                <p>
                    This popover is only to be used in a wizard like userflow with a dark background. If you have
                    long content on a page; outside of a wizard, we recommend that you utilize a modal instead.
                </p>
                <div
                    v-for="placement in directives"
                    :key="`light-${placement.directive}`"
                    class="py-100">
                    <h3 class="text-white">
                        {{ placement.text }}
                    </h3>
                    <div>
                        <!-- eslint-disable vuejs-accessibility/label-has-for -->
                        <label>
                            With title
                            <nuxt-link
                                :id="`lightTitleTarget-${placement.directive}`"
                                class="p-0 text-gray-700"
                                tabindex="0">
                                <IconInfo
                                    class="text-white"
                                    width="16px"
                                    height="16px" />
                            </nuxt-link>
                        </label>
                        <es-popover
                            :placement="placement.directive"
                            :target="`lightTitleTarget-${placement.directive}`"
                            variant="light">
                            <template #title>
                                My title
                            </template>
                            <p class="mb-0">
                                Install solar panels through this program and get $250 cash back.
                                <a
                                    class="mt-50 d-block"
                                    href="https://communitysolar.energysage.com/"
                                    target="_blank">Learn more</a>
                            </p>
                        </es-popover>
                    </div>
                    <div>
                        <label>
                            No title
                            <nuxt-link
                                :id="`lightNoTitleTarget-${placement.directive}`"
                                class="p-0 text-gray-700"
                                tabindex="0">
                                <IconInfo
                                    class="text-white"
                                    width="16px"
                                    height="16px" />
                            </nuxt-link>
                        </label>
                        <es-popover
                            :placement="placement.directive"
                            :target="`lightNoTitleTarget-${placement.directive}`"
                            variant="light">
                            <p class="mb-0">
                                Install solar panels through this program and get $250 cash back.
                                <a
                                    class="mt-50 d-block"
                                    href="https://communitysolar.energysage.com/"
                                    target="_blank">Learn more</a>
                            </p>
                        </es-popover>
                    </div>
                    <div>
                        <label>
                            With button
                            <nuxt-link
                                :id="`lightButtonTarget-${placement.directive}`"
                                class="p-0 text-gray-700"
                                tabindex="0">
                                <IconInfo
                                    class="text-white"
                                    width="16px"
                                    height="16px" />
                            </nuxt-link>
                        </label>
                        <es-popover
                            :placement="placement.directive"
                            :target="`lightButtonTarget-${placement.directive}`"
                            variant="light">
                            <template #title>
                                My title
                            </template>
                            <p class="mb-0">
                                Install solar panels through this program and get $250 cash back.
                                <button
                                    size="sm"
                                    class="mt-100 d-block">
                                    Small button
                                </button>
                            </p>
                        </es-popover>
                    </div>
                </div>
            </div>
        <div class="mb-500">
            <h2>
                EsPopover props
            </h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="propTableWidths" />
        </div>
         <ds-doc-source
                :comp-code="compCode"
                comp-source="es-ds-components/src/lib-components/es-popover.vue"
                :doc-code="docCode"
                doc-source="es-ds-docs/pages/molecules/popover.vue" />


        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "@energysage/es-ds-styles/scss/variables" as variables;

// TODO: Remove when gray scale is added to es-bs-base
.text-gray-700 {
    color: variables.$gray-700;
}
</style>
