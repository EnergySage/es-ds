<script setup lang="ts">
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

const propTableRows = [
    ['triggers', 'String', "'focus'", 'Specifies different triggers for the popover, space separated'],
    ['show', 'Boolean', 'false', 'When true, the popover will become visible'],
    ['variant', 'String', "'dark'", 'Defines variant of the popover - either dark or light'],
    ['target', 'String', 'n/a', 'Required. Defines which element makes the popover show when triggered'],
];
const propTableWidths = {
    md: ['2', '3', '2', '5'],
};

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-popover.vue?raw');
        // eslint-disable-next-line import/no-self-import
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
            <h1>Popover</h1>
            <p>
                Extended from
                <nuxt-link
                    href="https://v3.primevue.org/overlaypanel/"
                    target="_blank">
                    PrimeVue OverlayPanel
                </nuxt-link>
            </p>
            <div class="my-500">
                <h2>Dark variant</h2>
                <div>
                    <!-- eslint-disable vuejs-accessibility/label-has-for -->
                    <label>
                        With title
                        <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
                        <a
                            id="darkTitleTarget"
                            class="p-0 text-gray-700 cursor-pointer-hover"
                            tabindex="0">
                            <icon-info
                                width="16px"
                                height="16px" />
                        </a>
                    </label>
                    <es-popover
                        target="darkTitleTarget"
                        variant="dark">
                        <template #title> My title </template>
                        <p class="mb-0">
                            Install solar panels through this program and get $250 cash back.
                            <a
                                class="mt-50 d-block cursor-pointer-hover"
                                href="https://communitysolar.energysage.com/"
                                target="_blank"
                                >Learn more</a
                            >
                        </p>
                    </es-popover>
                </div>
                <div>
                    <label>
                        No title
                        <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
                        <a
                            id="darkNoTitleTarget"
                            class="p-0 text-gray-700 cursor-pointer-hover"
                            tabindex="0">
                            <icon-info
                                width="16px"
                                height="16px" />
                        </a>
                    </label>
                    <es-popover
                        target="darkNoTitleTarget"
                        variant="dark">
                        <p class="mb-0">
                            Install solar panels through this program and get $250 cash back.
                            <a
                                class="mt-50 d-block cursor-pointer-hover"
                                href="https://communitysolar.energysage.com/"
                                target="_blank"
                                >Learn more</a
                            >
                        </p>
                    </es-popover>
                </div>
                <div>
                    <label>
                        With button
                        <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
                        <a
                            id="darkButtonTarget"
                            class="p-0 text-gray-700 cursor-pointer-hover"
                            tabindex="0">
                            <icon-info
                                width="16px"
                                height="16px" />
                        </a>
                    </label>
                    <es-popover
                        target="darkButtonTarget"
                        variant="dark">
                        <template #title> My title </template>
                        <p class="mb-0">
                            Install solar panels through this program and get $250 cash back.
                            <es-button
                                size="sm"
                                class="mt-100 d-block"
                                variant="dark-bg">
                                Small button
                            </es-button>
                        </p>
                    </es-popover>
                </div>
            </div>
            <div class="bg-dark-blue p-100 my-450 rounded-lg text-white">
                <h2 class="text-white">Light variant</h2>
                <p>
                    This popover is only to be used in a wizard like userflow with a dark background. If you have long
                    content on a page; outside of a wizard, we recommend that you utilize a modal instead.
                </p>
                <div>
                    <!-- eslint-disable vuejs-accessibility/label-has-for -->
                    <label>
                        With title
                        <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
                        <a
                            id="lightTitleTarget"
                            class="p-0 text-gray-700 cursor-pointer-hover"
                            tabindex="0">
                            <icon-info
                                class="text-white"
                                width="16px"
                                height="16px" />
                        </a>
                    </label>
                    <es-popover
                        target="lightTitleTarget"
                        variant="light">
                        <template #title> My title </template>
                        <p class="mb-0">
                            Install solar panels through this program and get $250 cash back.
                            <a
                                class="mt-50 d-block cursor-pointer-hover"
                                href="https://communitysolar.energysage.com/"
                                target="_blank"
                                >Learn more</a
                            >
                        </p>
                    </es-popover>
                </div>
                <div>
                    <label>
                        No title
                        <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
                        <a
                            id="lightNoTitleTarget"
                            class="p-0 text-gray-700 cursor-pointer-hover"
                            tabindex="0">
                            <icon-info
                                class="text-white"
                                width="16px"
                                height="16px" />
                        </a>
                    </label>
                    <es-popover
                        target="lightNoTitleTarget"
                        variant="light">
                        <p class="mb-0">
                            Install solar panels through this program and get $250 cash back.
                            <a
                                class="mt-50 d-block cursor-pointer-hover"
                                href="https://communitysolar.energysage.com/"
                                target="_blank"
                                >Learn more</a
                            >
                        </p>
                    </es-popover>
                </div>
                <div>
                    <label>
                        With button
                        <!-- eslint-disable-next-line vuejs-accessibility/anchor-has-content -->
                        <a
                            id="lightButtonTarget"
                            class="p-0 text-gray-700 cursor-pointer-hover"
                            tabindex="0">
                            <icon-info
                                class="text-white"
                                width="16px"
                                height="16px" />
                        </a>
                    </label>
                    <es-popover
                        target="lightButtonTarget"
                        variant="light">
                        <template #title> My title </template>
                        <p class="mb-0">
                            Install solar panels through this program and get $250 cash back.
                            <es-button
                                size="sm"
                                class="mt-100 d-block">
                                Small button
                            </es-button>
                        </p>
                    </es-popover>
                </div>
            </div>
            <div class="mb-500">
                <h2>EsPopover props</h2>
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
@use '@energysage/es-ds-styles/scss/variables' as variables;

// TODO: Remove when gray scale is added to es-bs-base
.text-gray-700 {
    color: variables.$gray-700;
}

.cursor-pointer-hover {
    &:hover {
        cursor: pointer;
    }
}
</style>
