<script setup lang="ts">
definePageMeta({
    layout: 'minimal',
});

const emitter = useEsdsEvents();

const LOREM_TEXT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Risus in hendrerit gravida rutrum. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Mi tempus imperdiet nulla malesuada pellentesque elit.';

const samplePageContent = Array(4).fill(LOREM_TEXT);

const esStickyBarProps = [
    [
        'initial-state',
        "'static' or 'absolute'",
        "'static'",
        `
        The default behavior will keep the nav as part of the normal page flow. Set it to 'absolute'
        if you want to float the nav on top of other page content.
        `,
    ],
    [
        'transparent-color',
        'string',
        "'transparent'",
        `
        If transparent-starting-at-breakpoint is set, this will be the transparent color used.
        Defaults to fully transparent, but use this to pass in a semi-transparent rgba() value
        if desired.
        `,
    ],
    [
        'transparent-starting-at-breakpoint',
        "'lg' or 'xl' or 'xxl' or ''",
        "''",
        `
        If set, the sticky bar will have a transparent background when scrolled to the
        top of the page on the specified breakpoint and above. This enables the nav to appear seamlessly
        integrated with a landing page hero section that has an image or background color other
        than white.
        `,
    ],
];

const esStickyBarEvents = [
    [ES_STICKY_BAR_FIXED_HIDE_EVENT_NAME, 'none', 'Fires when the fixed state of the sticky bar is hidden.'],
    [ES_STICKY_BAR_FIXED_SHOW_EVENT_NAME, 'none', 'Fires when the fixed state of the sticky bar is shown.'],
];

const isFixedStateShown = ref(false);

const handleFixedStateHidden = () => (isFixedStateShown.value = false);
const handleFixedStateShown = () => (isFixedStateShown.value = true);

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    emitter.on(ES_STICKY_BAR_FIXED_HIDE_EVENT_NAME, handleFixedStateHidden);
    emitter.on(ES_STICKY_BAR_FIXED_SHOW_EVENT_NAME, handleFixedStateShown);

    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-sticky-bar.vue?raw');
        const docSource = await import('./sticky-bar.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

onUnmounted(() => {
    emitter.off(ES_STICKY_BAR_FIXED_HIDE_EVENT_NAME, handleFixedStateHidden);
    emitter.off(ES_STICKY_BAR_FIXED_SHOW_EVENT_NAME, handleFixedStateShown);
});
</script>

<template>
    <div>
        <es-sticky-bar transparent-starting-at-breakpoint="lg">
            <es-container>
                <div class="d-flex justify-content-between py-100 py-lg-200">
                    <p class="mb-0">test content</p>
                    <p class="mb-0">test content</p>
                    <p class="mb-0">test content</p>
                </div>
            </es-container>
        </es-sticky-bar>
        <ds-main-layout>
            <h1>Sticky bar</h1>
            <p>
                The sticky bar is intended for use with site navigation. It has automatic hide and reveal behavior
                built in so it gets out of the user's way when they're trying to read the page content and comes back
                only when it's needed.
            </p>
            <p>
                It can be seen above at the top of the page where it says "test content". Try scrolling up and down the
                page to see how it behaves.
            </p>

            <h2 class="mt-300">Behavior</h2>
            <p>
                It will scroll away smoothly with the page content as the user scrolls down from the top of the page.
                If the user scrolls back up slightly, it will slide back into view, this time floating above the page
                content. If the user scrolls down again, it will slide out of view.
            </p>
            <p>
                On desktop, when scrolled to the top of the page, there is no shadow dividing the sticky bar from the
                rest of the page content. As soon as the nav bar becomes floating, there is a shadow. On mobile, there
                is always a shadow. This is because, in this example, we have set the
                <code>transparent-starting-at-breakpoint</code> prop to a value of <code>'lg'</code>.
            </p>

            <h2 class="mt-300">Usage</h2>
            <p>
                It should be placed at the top of the page outside of any containers that are relatively or absolutely
                positioned, as it needs to be able to control its own positioning relative to the browser viewport.
            </p>
            <p>
                You can place anything inside of it and it will adapt to the height of that content. It will also
                detect any changes to its height based on responsive breakpoints or other events and adjust its own
                positioning accordingly.
            </p>

            <h2 class="mt-300">Coordination with other fixed position elements</h2>
            <p>
                If there are other elements on a page that also need to be fixed to the top of the viewport, in order
                to prevent overlap with the sticky bar, they need to know two things: (1) whether the sticky bar is
                shown or hidden, and (2) the height of the sticky bar.
            </p>
            <p>
                Visibility is communicated via global events emitted through the <code>useEsdsEvents</code> composable.
                The text below is an example powered by these events and describes the current state. Try scrolling up
                and down and see how the text changes.
            </p>
            <p
                class="font-weight-semibold p-100 rounded-lg"
                :class="{ 'bg-success-50': isFixedStateShown, 'bg-gray-50': !isFixedStateShown }">
                {{ `fixed sticky bar is ${isFixedStateShown ? 'shown' : 'hidden'}` }}
            </p>
            <p>
                The height is communicated via the CSS variable <code>--es-sticky-bar-height</code> made available on
                the <code>&lt;html&gt;</code> tag. It will update dynamically on resize. The box below is an example
                that uses this CSS variable to exactly match the height of the sticky bar. Try switching between mobile
                and desktop breakpoints and see how the height changes.
            </p>
            <div
                class="bg-soft-blue font-size-75 p-100 rounded-lg"
                :style="{ height: 'var(--es-sticky-bar-height)' }"></div>

            <h2 class="mt-300">Additional sample paragraphs to test scrolling behavior</h2>
            <p
                v-for="(content, index) in samplePageContent"
                :key="index">
                {{ content }}
            </p>

            <div class="my-300">
                <h2>EsStickyBar props</h2>
                <ds-prop-table
                    :rows="esStickyBarProps"
                    :widths="{
                        md: ['3', '2', '2', '5'],
                    }" />
            </div>

            <div class="my-300">
                <h2>EsStickyBar global events</h2>
                <p>
                    These events are not emitted directly by the component, but are instead transmitted via the
                    <code>useEsdsEvents</code> composable and can be subscribed to via <code>on()</code> and
                    <code>off()</code> methods.
                </p>
                <ds-prop-table
                    :columns="['Name', 'Payload', 'Description']"
                    :rows="esStickyBarEvents"
                    :widths="{
                        md: ['4', '2', '6'],
                    }" />
            </div>

            <ds-doc-source
                :comp-code="compCode"
                comp-source="es-ds-components/components/es-sticky-bar.vue"
                :doc-code="docCode"
                doc-source="es-ds-docs/pages/molecules/sticky-bar.vue" />
        </ds-main-layout>
    </div>
</template>
