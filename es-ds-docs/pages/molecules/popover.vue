<script setup lang="ts">
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

const propTableRows = [
    [
        'collisionPadding',
        'number or object',
        '0',
        'The distance in pixels from the viewport edges where collision detection should occur. Accepts a number (same for all sides), or a partial padding object, for example: { top: 20, left: 20 }.',
    ],
    ['show', 'boolean or undefined', 'undefined', 'The controlled open state of the popover.'],
    [
        'side',
        'String',
        "'top'",
        "Specifies on which side of the trigger button the popover should attempt to appear. Can be 'top', 'right', 'bottom', or 'left'.",
    ],
    ['triggerClass', 'String', "''", 'Classes, if any, that should be applied to the trigger button.'],
    [
        'triggerDescription',
        'String',
        "'More information'",
        'A description of the trigger button that will be read out to screen readers upon reaching the button.',
    ],
    [
        'variant',
        'String',
        "'dark'",
        "Determines whether the popover appears with a darker or lighter background. Can be 'dark' or 'light'.",
    ],
];
const propTableWidths = {
    md: ['3', '2', '2', '5'],
};

const slotTableRows = [
    ['trigger', 'n/a', 'Required. The icon and/or content to put inside the trigger button.'],
    [
        'cta',
        'n/a',
        'Optional. Use to enable a link or button to appear at the bottom of the popover content and take up the full width of the popover.',
    ],
];

const showControlledPopover: Ref<boolean | undefined> = ref(undefined);

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
            <h1>Popover</h1>
            <p>
                Extended from
                <nuxt-link
                    href="https://reka-ui.com/docs/components/popover"
                    target="_blank">
                    Reka UI Popover
                </nuxt-link>
            </p>
            <p>
                A popover is opened on tap or click and displays a speech-bubble-like popup with some additional
                information. For keyboard users and screen readers, it acts like a modal dialog in that it traps focus
                until you close it. This is ideal for accessibility — especially when the popover contains interactive
                elements like a link or button — so that users can browse the full contents of the popover before
                continuing down the page.
            </p>

            <div class="my-500">
                <h2>Direction</h2>
                <p>
                    Using the <code>side</code> prop allows you to control on which side of the triggering element the
                    popover will attempt to appear. If there is not enough room on that side, the popover will switch
                    to the opposite side.
                </p>
                <p>
                    Positioned on top (default)
                    <es-popover trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the popover and it can be long or short as needed.
                        </p>
                    </es-popover>
                </p>
                <p>
                    Positioned on right
                    <es-popover
                        side="right"
                        trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the popover and it can be long or short as needed.
                        </p>
                    </es-popover>
                </p>
                <p>
                    Positioned on bottom
                    <es-popover
                        side="bottom"
                        trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the popover and it can be long or short as needed.
                        </p>
                    </es-popover>
                </p>
                <p>
                    Positioned on left
                    <es-popover
                        side="left"
                        trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the popover and it can be long or short as needed.
                        </p>
                    </es-popover>
                </p>
            </div>

            <div class="my-500">
                <h2>Headings and CTAs</h2>
                <p>
                    These examples show the recommended styling for headings and how to insert a link or button into
                    the bottom of the popover. Since the popover has padding on the right side to make room for the
                    close button, the <code>cta</code> slot allows you to insert a link or button at the bottom of the
                    popover that can go full width without that padding.
                </p>
                <p>
                    This popover contains a heading and a link
                    <es-popover trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <h3 class="font-size-100 mb-50 text-white">This is a heading</h3>
                        <p class="mb-50">
                            This is the body text for the popover and it can be long or short as needed.
                        </p>
                        <template #cta>
                            <a
                                class="text-white"
                                href="https://www.energysage.com/"
                                target="_blank">
                                Learn about EnergySage
                            </a>
                        </template>
                    </es-popover>
                </p>
                <p>
                    This popover contains a heading and a button
                    <es-popover trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <h3 class="font-size-100 mb-50 text-white">This is a heading</h3>
                        <p>This is the body text for the popover and it can be long or short as needed.</p>
                        <template #cta>
                            <es-button
                                class="w-100"
                                href="https://www.energysage.com/"
                                outline
                                target="_blank"
                                variant="dark-bg">
                                About EnergySage
                            </es-button>
                        </template>
                    </es-popover>
                </p>
            </div>

            <div class="my-500">
                <h2>Collision padding</h2>
                <p>
                    This example shows how to tell the popover that there is a sticky element it should treat as the
                    edge of visibility and flip the popover to the opposite side when reached. This is useful when
                    there is a sticky navbar or CTA banner on the page and you want to ensure the popover remains
                    visible and doesn't appear partially hidden underneath it.
                </p>
                <p>
                    This popover will flip when it gets 100px away from the top of the viewport
                    <es-popover
                        :collision-padding="{ top: 100 }"
                        trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the popover and it can be long or short as needed.
                        </p>
                    </es-popover>
                </p>
            </div>

            <div class="my-500">
                <h2>External control</h2>
                <p>
                    This example shows how to control the visibility of the popover from an external source. It can
                    still be opened and closed via the trigger button and via click/tap outside, but the buttons also
                    have the ability to show and hide the popover.
                </p>
                <div>
                    This popover is controlled by the show/hide buttons
                    <es-popover
                        :show="showControlledPopover"
                        trigger-class="ml-25">
                        <template #trigger>
                            <icon-info
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the popover and it can be long or short as needed.
                        </p>
                    </es-popover>
                    <p class="mt-100">
                        <es-button
                            class="mb-50 mr-50"
                            outline
                            size="sm"
                            @click="showControlledPopover = true">
                            Show popover
                        </es-button>
                        <es-button
                            class="mb-50 mr-50"
                            outline
                            size="sm"
                            @click="showControlledPopover = false">
                            Hide popover
                        </es-button>
                    </p>
                </div>
            </div>

            <div class="bg-dark-blue p-100 my-450 rounded-lg text-white">
                <h2 class="text-white">Light variant</h2>
                <p>Use the light <code>variant</code> if the popover will appear against a dark background.</p>
                <p>
                    This popover only contains text
                    <es-popover
                        trigger-class="ml-25"
                        variant="light">
                        <template #trigger>
                            <icon-info
                                class="text-white"
                                width="18px"
                                height="18px" />
                        </template>
                        <p class="mb-0">
                            This is the body text for the popover and it can be long or short as needed.
                        </p>
                    </es-popover>
                </p>
                <p>
                    This popover contains a heading and a link
                    <es-popover
                        trigger-class="ml-25"
                        variant="light">
                        <template #trigger>
                            <icon-info
                                class="text-white"
                                width="18px"
                                height="18px" />
                        </template>
                        <h3 class="font-size-100 mb-50">This is a heading</h3>
                        <p class="mb-50">
                            This is the body text for the popover and it can be long or short as needed.
                        </p>
                        <template #cta>
                            <a
                                href="https://www.energysage.com/"
                                target="_blank">
                                Learn about EnergySage
                            </a>
                        </template>
                    </es-popover>
                </p>
                <p>
                    This popover contains a heading and a button
                    <es-popover
                        trigger-class="ml-25"
                        variant="light">
                        <template #trigger>
                            <icon-info
                                class="text-white"
                                width="18px"
                                height="18px" />
                        </template>
                        <h3 class="font-size-100 mb-50">This is a heading</h3>
                        <p>This is the body text for the popover and it can be long or short as needed.</p>
                        <template #cta>
                            <es-button
                                class="w-100"
                                href="https://www.energysage.com/"
                                outline
                                target="_blank">
                                About EnergySage
                            </es-button>
                        </template>
                    </es-popover>
                </p>
            </div>

            <div class="mb-500">
                <h2>EsPopover props</h2>
                <ds-prop-table
                    :rows="propTableRows"
                    :widths="propTableWidths" />
            </div>

            <div class="mb-500">
                <h2>EsPopover slots</h2>
                <ds-prop-table
                    :columns="['Name', 'Default', 'Description']"
                    :rows="slotTableRows"
                    :widths="{
                        md: ['3', '4', '5'],
                    }" />
            </div>

            <ds-doc-source
                :comp-code="compCode"
                comp-source="es-ds-components/components/es-popover.vue"
                :doc-code="docCode"
                doc-source="es-ds-docs/pages/molecules/popover.vue" />

            <es-collapse class="mt-500">
                <template #title>
                    <h2 class="mb-0">Migration from 3.0 and earlier</h2>
                </template>
                <p>To upgrade EsPopover to 3.1 and later, there are a few changes to make.</p>
                <p>
                    Previously, the triggering element had to be separate from EsPopover with an id that was passed
                    into the
                    <code>target</code> prop. Now, the triggering button will be generated by EsPopover, and all you
                    need to do is pass in the contents (e.g. an info icon) into the <code>trigger</code> slot.
                </p>
                <p>
                    For accessibility reasons, the <code>triggers</code> prop is no longer available to specify whether
                    the popover should appear on focus, hover, mouseover, etc. of the triggering element. It will now
                    only appear on click/tap of the triggering button. If you need hover functionality, first consider
                    whether it's really necessary (as hover has accessibility pitfalls). If it is necessary, the
                    <nuxt-link to="/molecules/tooltip">Tooltip</nuxt-link> component is available for hover needs.
                </p>
                <p>
                    There is no change for the popover contents; you can continue to pass that into the default slot of
                    EsPopover.
                </p>
            </es-collapse>
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
