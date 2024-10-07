<script setup>
definePageMeta({
    layout: 'full-width-component',
});

const propTableRows = [
    ['dark', 'Boolean', 'false', 'Renders the banner with white text on a dark background.'],
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
        `Accepts 'default' or 'wide'. The default variant has a smaller heading size and reduced padding.
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
        // eslint-disable-next-line import/no-self-import
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
                container. The second example has <code>dark</code> set to <code>true</code>.
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
                        dark
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
                dark
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
                dark
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
