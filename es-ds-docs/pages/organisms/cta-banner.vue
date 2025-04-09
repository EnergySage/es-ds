<script setup lang="ts">
definePageMeta({
    layout: 'full-width-component',
});

const propTableRows = [
    [
        'alignMobile',
        'String',
        "'center'",
        `Controls the text alignment on mobile. Can be 'left', 'center', or 'right'.`,
    ],
    [
        'background',
        'String',
        "'none'",
        `Sets the background of the banner. Can be 'none', 'blue-300-radial', or 'dark-blue'. The dark-blue
        option corresponds to what setting the dark prop to true did before.`,
    ],
    [
        'dark',
        'Boolean',
        'false',
        'DEPRECATED; use background instead. Renders the banner with white text on a dark background.',
    ],
    [
        'hasButton',
        'Boolean',
        'false',
        `If true, will give the heading (and subtitle, if any)
        more room on desktop, and reduce the width of the button container.`,
    ],
    [
        'variant',
        'String',
        "'default'",
        `Accepts 'default', 'stacked', or 'wide'. The default variant has a smaller heading size and reduced padding.
        The wide variant has a larger heading size and larger padding on desktop.`,
    ],
];

const slotTableRows = [
    ['heading', "'Easily find what solar costs in your area'", 'The banner heading.'],
    ['subtitle', 'n/a', 'Optional. The text that should appear below the heading.'],
    ['cta', 'n/a', 'The call to action itself. Meant to be an EsButton or EsZipCodeForm.'],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-cta-banner.vue?raw');

        const docSource = await import('./cta-banner.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>CTA banner</h1>

        <es-row class="mb-500">
            <es-col
                xl="10"
                xxl="8">
                <p>
                    Full-width banner that displays a heading, subtitle, and call to action. The call to action can be
                    a button or zip code form. Subtitle is optional and can be omitted.
                </p>
                <p class="mb-0">
                    Intended for use either within a full-width page layout or one slightly constrained to 10 columns
                    on large desktop breakpoints (shown in the examples below).
                </p>
            </es-col>
        </es-row>

        <div class="mb-500">
            <h2>Default with zip code form</h2>
            <p class="mb-200">
                This is the default layout, designed to show a zip code form and display nicely within a limited-width
                container. The second example has <code>background</code> set to <code>dark-blue</code>.
            </p>
            <es-row class="justify-content-center">
                <es-col
                    cols="12"
                    lg="8"
                    xl="7">
                    <es-cta-banner class="mb-200">
                        <template #heading> Switch to solar and save </template>
                        <template #cta>
                            <es-zip-code-form
                                constrained
                                input-id="no-image-with-zip-form"
                                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                                stack-until="md"
                                url="https://www.energysage.com/market/start/">
                                <template #buttonText> Compare quotes </template>
                            </es-zip-code-form>
                        </template>
                    </es-cta-banner>
                    <es-cta-banner background="dark-blue">
                        <template #heading> Easily find what solar costs in your area </template>
                        <template #cta>
                            <es-zip-code-form
                                constrained
                                dark
                                input-id="no-image-with-zip-form"
                                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                                stack-until="md"
                                url="https://www.energysage.com/market/start/">
                                <template #buttonText> Compare quotes </template>
                            </es-zip-code-form>
                        </template>
                    </es-cta-banner>
                </es-col>
            </es-row>
        </div>

        <div class="mb-500">
            <h2>Default with subtitle and button</h2>
            <p class="mb-200">
                By default, the <code>cta</code> section will display at a larger width to accommodate a zip code form.
                When using a button, set the <code>hasButton</code> prop to <code>true</code>, and the CTA section will
                reduce in width.
            </p>
            <es-row class="justify-content-center">
                <es-col
                    cols="12"
                    lg="8"
                    xl="7">
                    <es-cta-banner
                        background="dark-blue"
                        has-button>
                        <template #heading> Check availability in your area </template>
                        <template #subtitle>
                            Our installer network is growing every day. Explore options in your state.
                        </template>
                        <template #cta>
                            <es-button
                                class="px-100 text-nowrap"
                                href="https://heatpumps.energysage.com/welcome"
                                variant="dark-bg">
                                Get heat pump quotes
                            </es-button>
                        </template>
                    </es-cta-banner>
                </es-col>
            </es-row>
        </div>

        <div class="mb-500">
            <h2>Stacked with subtitle and zip code form</h2>
            <p class="mb-200">
                The stacked <code>variant</code> will always keep the heading and subtitle above the CTA section on all
                breakpoints. This is useful when the form's text input needs to be wider, as in the case of an email
                signup form (a nonfunctional form is shown below just for illustrative layout purposes). The example
                below also demonstrates using the <code>alignMobile</code> and <code>background</code> props.
            </p>
            <es-row class="justify-content-center">
                <es-col
                    cols="12"
                    lg="8"
                    xl="7">
                    <es-cta-banner
                        align-mobile="left"
                        background="blue-300-radial"
                        variant="stacked">
                        <template #heading> Subscribe to the EnergySage newsletter! </template>
                        <template #subtitle>
                            Plug in for monthly energy-saving tips, climate news, sustainability trends and more.
                        </template>
                        <template #cta>
                            <form class="w-100">
                                <div class="d-flex flex-column flex-md-row mb-100 mb-md-0 w-100">
                                    <es-form-input
                                        id="email-subscribe"
                                        class="flex-grow-1"
                                        label-sr-only
                                        placeholder="Enter your email address">
                                        <template #label> Enter your email address </template>
                                    </es-form-input>
                                    <es-button class="ml-md-100">
                                        Subscribe
                                        <icon-envelope class="ml-50" />
                                    </es-button>
                                </div>
                                <div class="align-items-center d-flex flex-wrap font-size-75 font-size-sm-100">
                                    <icon-lock-on
                                        class="flex-shrink-0 mr-50"
                                        height="1.125rem"
                                        width="1.125rem" />
                                    <span class="mr-25 text-nowrap"> Your information is safe with us. </span>
                                    <a
                                        href="https://www.energysage.com/privacy-policy/"
                                        target="_blank">
                                        Privacy Policy
                                    </a>
                                </div>
                            </form>
                        </template>
                    </es-cta-banner>
                </es-col>
            </es-row>
        </div>

        <div class="mb-500">
            <h2>Wide with zip code form</h2>
            <p class="mb-200">
                Set the <code>variant</code> prop to <code>'wide'</code> when the banner will display full width on a
                page. The <code>heading</code> text will appear larger on desktop, and the side padding will increase.
            </p>
            <es-cta-banner
                class="mb-200"
                variant="wide">
                <template #heading> Switch to solar and save </template>
                <template #cta>
                    <es-zip-code-form
                        input-id="no-image-with-zip-form"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="md"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText> Compare quotes </template>
                    </es-zip-code-form>
                </template>
            </es-cta-banner>
            <es-cta-banner
                background="dark-blue"
                variant="wide">
                <template #heading> Switch to solar and save </template>
                <template #cta>
                    <es-zip-code-form
                        dark
                        input-id="no-image-with-zip-form"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="md"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText> Compare quotes </template>
                    </es-zip-code-form>
                </template>
            </es-cta-banner>
        </div>

        <div class="mb-500">
            <h2>Wide with subtitle and button</h2>
            <p class="mb-200">
                By default, the <code>cta</code> section will display at a larger width to accommodate a zip code form.
                When using a button, set the <code>hasButton</code> prop to <code>true</code>, and the CTA section will
                reduce in width.
            </p>
            <es-cta-banner
                background="dark-blue"
                has-button
                variant="wide">
                <template #heading> Check availability in your area </template>
                <template #subtitle>
                    Our installer network is growing every day. Explore options in your state.
                </template>
                <template #cta>
                    <es-button
                        href="https://heatpumps.energysage.com/welcome"
                        variant="dark-bg">
                        Get heat pump quotes
                    </es-button>
                </template>
            </es-cta-banner>
        </div>

        <div class="mb-500">
            <h2>Deprecated dark prop</h2>
            <p class="mb-200">
                This example has the deprecated prop <code>dark</code> set to <code>true</code>, just to illustrate
                that it still works as the equivalent to setting <code>background</code> to <code>dark-blue</code>.
                This functionality will be removed in a future release, so we recommend refactoring away from
                <code>dark</code> in favor of <code>background</code>.
            </p>
            <es-row class="justify-content-center">
                <es-col
                    cols="12"
                    lg="8"
                    xl="7">
                    <es-cta-banner dark>
                        <template #heading> Easily find what solar costs in your area </template>
                        <template #cta>
                            <es-zip-code-form
                                constrained
                                dark
                                input-id="no-image-with-zip-form"
                                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                                stack-until="md"
                                url="https://www.energysage.com/market/start/">
                                <template #buttonText> Compare quotes </template>
                            </es-zip-code-form>
                        </template>
                    </es-cta-banner>
                </es-col>
            </es-row>
        </div>

        <div class="mb-500">
            <h2>EsCtaBanner slots</h2>
            <ds-prop-table
                :columns="['Name', 'Default', 'Description']"
                :rows="slotTableRows"
                :widths="{
                    md: ['3', '4', '5'],
                    lg: ['2', '5', '5'],
                }" />
        </div>

        <div class="mb-500">
            <h2>EsCtaBanner props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-cta-banner.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/organisms/cta-banner.vue" />
    </div>
</template>
