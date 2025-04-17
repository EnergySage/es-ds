<script setup lang="ts">
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

const propTableRows = [
    [
        'delayDuration',
        'number',
        '0',
        'The delay in milliseconds between hover and the tooltip appearing. Only applies on non-touch devices.',
    ],
    [
        'side',
        'String',
        "'top'",
        "Specifies on which side of the trigger button the tooltip should attempt to appear. Can be 'top', 'right', 'bottom', or 'left'.",
    ],
    ['triggerClass', 'String', "''", 'Classes, if any, that should be applied to the trigger button.'],
    [
        'variant',
        'String',
        "'dark'",
        "Determines whether the tooltip appears with a darker or lighter background. Can be 'dark' or 'light'.",
    ],
];
const propTableWidths = {
    md: ['2', '3', '2', '5'],
};

const slotTableRows = [['trigger', 'n/a', 'Required. The icon and/or content to put inside the trigger button.']];

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-tooltip.vue?raw');

        const docSource = await import('./tooltip.vue?raw');
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <div class="mb-100">
            <h1>Tooltip</h1>
            <p>
                Extended from
                <nuxt-link
                    href="https://reka-ui.com/docs/components/tooltip"
                    target="_blank">
                    Reka UI Tooltip
                </nuxt-link>
            </p>
            <p>
                A tooltip opens on hover or focus of the trigger button and is useful when additional descriptive text
                would take up too much room on the page and may not be relevant to all users.
            </p>
            <p>
                Because the tooltip relies on hover to activate, and there is no hover on touch devices, this component
                will detect if a device supports touch and, if so, automatically render a
                <nuxt-link to="/molecules/popover">Popover</nuxt-link> instead.
            </p>
            <p>
                It is <strong>NOT </strong> recommended to insert a link or button inside a tooltip, as non-mouse users
                will be unable to access the link or button, and even mouse users may have trouble reaching it as the
                tooltip may disappear before they can move their cursor to the link or button. If you find yourself
                needing this use case, consider using <nuxt-link to="/molecules/popover">Popover</nuxt-link> instead.
            </p>

            <div class="my-500">
                <h2>Direction</h2>
                <p>
                    Using the <code>side</code> prop allows you to control on which side of the triggering element the
                    tooltip will attempt to appear. If there is not enough room on that side, the tooltip will switch
                    to the opposite side.
                </p>
                <p>
                    Positioned on top (default)
                    <es-tooltip trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the tooltip and it can be long or short as needed.
                        </p>
                    </es-tooltip>
                </p>
                <p>
                    Positioned on right
                    <es-tooltip
                        side="right"
                        trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the tooltip and it can be long or short as needed.
                        </p>
                    </es-tooltip>
                </p>
                <p>
                    Positioned on bottom
                    <es-tooltip
                        side="bottom"
                        trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the tooltip and it can be long or short as needed.
                        </p>
                    </es-tooltip>
                </p>
                <p>
                    Positioned on left
                    <es-tooltip
                        side="left"
                        trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the tooltip and it can be long or short as needed.
                        </p>
                    </es-tooltip>
                </p>
            </div>

            <div class="my-500">
                <h2>Headings</h2>
                <p>This example shows the recommended styling for headings within a tooltip.</p>
                <p>
                    This tooltip contains a heading
                    <es-tooltip trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <h3 class="font-size-100 mb-50 text-white">This is a heading</h3>
                        <p class="mb-0">
                            This is the body text for the tooltip and it can be long or short as needed.
                        </p>
                    </es-tooltip>
                </p>
            </div>

            <div class="my-500">
                <h2>Delay</h2>
                <p>
                    This example shows how to delay the appearance of the tooltip. Only applies on non-touch devices.
                </p>
                <p>
                    This tooltip will appear after 500ms
                    <es-tooltip
                        :delay-duration="500"
                        trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the tooltip and it can be long or short as needed.
                        </p>
                    </es-tooltip>
                </p>
            </div>

            <div class="bg-dark-blue p-100 my-450 rounded-lg text-white">
                <h2 class="text-white">Light variant</h2>
                <p>Use the light <code>variant</code> if the tooltip will appear against a dark background.</p>
                <p>
                    This tooltip only contains text
                    <es-tooltip
                        trigger-class="ml-25"
                        variant="light">
                        <template #trigger>
                            <icon-info
                                class="text-white"
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the tooltip and it can be long or short as needed.
                        </p>
                    </es-tooltip>
                </p>
                <p>
                    This tooltip contains a heading
                    <es-tooltip
                        trigger-class="ml-25"
                        variant="light">
                        <template #trigger>
                            <icon-info
                                class="text-white"
                                width="18px"
                                height="18px" />
                        </template>
                        <h3 class="font-size-100 mb-50">This is a heading</h3>
                        <p class="mb-0">
                            This is the body text for the tooltip and it can be long or short as needed.
                        </p>
                    </es-tooltip>
                </p>
            </div>

            <div class="mb-500">
                <h2>EsTooltip props</h2>
                <ds-prop-table
                    :rows="propTableRows"
                    :widths="propTableWidths" />
            </div>

            <div class="mb-500">
                <h2>EsTooltip slots</h2>
                <ds-prop-table
                    :columns="['Name', 'Default', 'Description']"
                    :rows="slotTableRows"
                    :widths="{
                        md: ['3', '4', '5'],
                    }" />
            </div>

            <ds-doc-source
                :comp-code="compCode"
                comp-source="es-ds-components/components/es-tooltip.vue"
                :doc-code="docCode"
                doc-source="es-ds-docs/pages/molecules/tooltip.vue" />
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
