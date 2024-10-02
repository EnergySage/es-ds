<script setup>
const propTableRows = [
    ['imageFirst', 'Boolean', 'false', 'If true, reorders the elements so the image appears above the heading.'],
    [
        'horizontalPadding',
        'String',
        "'px-100'",
        'The padding on the left and right sides of the card. Defaults to 16px.',
    ],
    ['verticalSpacing', 'String', "'mb-150'", 'The vertical spacing between elements in the card. Defaults to 24px.'],
];

const slotTableRows = [
    ['heading', "'Easily find what solar costs in your area'", 'The card heading.'],
    ['image', 'n/a', 'Optional. The image for the card.'],
    ['subtitle', 'n/a', 'Optional. The paragraph(s) of text that should appear below the heading and/or image.'],
    ['cta', 'n/a', 'The call to action itself. Meant to be an EsButton, EsZipCodeForm, or a link.'],
];

const tableWidths = {
    md: ['3', '2', '3', '4'],
    lg: ['3', '2', '2', '5'],
};

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-cta-card.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./cta-card.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>CTA card</h1>
        <b-row class="mb-500">
            <es-col
                xl="10"
                xxl="8">
                <p>
                    A card that displays a heading, image, subtitle, and call to action. The call to action can be a
                    link, button, or zip code form. Image and subtitle are optional and can be omitted.
                </p>
                <p class="mb-0">
                    Intended for use within a width-constrained grid column layout on larger breakpoints, either on the
                    left rail of a page layout or side by side with other CTA cards.
                </p>
            </es-col>
        </b-row>

        <div class="mb-500">
            <h2 class="mb-200">Default with zip code form</h2>
            <b-row class="justify-content-center justify-content-lg-start">
                <es-col
                    sm="8"
                    md="6"
                    lg="4"
                    xxl="3">
                    <es-cta-card>
                        <template #heading> Easily find what solar costs in your area </template>
                        <template #image>
                            <nuxt-img
                                alt="Map showing quotes in your area"
                                class="w-100"
                                height="257px"
                                src="https://a-us.storyblok.com/f/1006159/220x257/18c519c201/mfdp-callout.webp/m/filters:quality(100)"
                                width="220px" />
                        </template>
                        <template #cta>
                            <es-zip-code-form
                                input-id="default-with-zip-form"
                                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                                url="https://www.energysage.com/market/start/">
                                <template #buttonText> See local offers </template>
                            </es-zip-code-form>
                        </template>
                    </es-cta-card>
                </es-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2 class="mb-200">Image first with button</h2>
            <b-row class="justify-content-center justify-content-lg-start">
                <es-col
                    sm="8"
                    md="6"
                    lg="4"
                    xl="5"
                    xxl="4">
                    <es-cta-card image-first>
                        <template #image>
                            <nuxt-img
                                alt="Heat pumps"
                                class="w-100"
                                height="150"
                                src="https://a-us.storyblok.com/f/1006156/159x150/af4d52baaa/heat-pump-icon.svg"
                                width="150" />
                        </template>
                        <template #heading> Upgrade your heating and cooling with a new heat pump </template>
                        <template #subtitle>
                            <p>100% free to use, 100% online</p>
                            <p>Access the lowest prices</p>
                            <p>Free, expert advice along the way</p>
                        </template>
                        <template #cta>
                            <es-button
                                class="w-100"
                                href="https://heatpumps.energysage.com/welcome">
                                Compare quotes
                            </es-button>
                        </template>
                    </es-cta-card>
                </es-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2 class="mb-200">Image first with link</h2>
            <b-row class="justify-content-center justify-content-lg-start">
                <es-col
                    sm="8"
                    md="6"
                    lg="5"
                    xl="5"
                    xxl="4">
                    <es-cta-card
                        image-first
                        horizontal-padding="px-200"
                        vertical-spacing="mb-50">
                        <template #image>
                            <nuxt-img
                                alt="Community solar"
                                class="mb-50 w-100"
                                height="150"
                                src="https://a-us.storyblok.com/f/1006156/159x150/acd049dd6f/community-solar-icon.svg"
                                width="150" />
                        </template>
                        <template #heading> Community solar </template>
                        <template #subtitle>
                            <p>Go solar without installing panels on your roof</p>
                        </template>
                        <template #cta>
                            <nuxt-link href="#">
                                Learn about community solar
                                <icon-arrow-right style="position: relative; top: -0.1em" />
                            </nuxt-link>
                        </template>
                    </es-cta-card>
                </es-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2 class="mb-200">No image with zip code form</h2>
            <b-row class="justify-content-center justify-content-lg-start">
                <es-col
                    sm="8"
                    md="6"
                    lg="4"
                    xl="5"
                    xxl="4">
                    <es-cta-card>
                        <template #heading> Easily find what solar costs in your area </template>
                        <template #cta>
                            <es-zip-code-form
                                input-id="no-image-with-zip-form"
                                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                                url="https://www.energysage.com/market/start/">
                                <template #buttonText> See local offers </template>
                            </es-zip-code-form>
                        </template>
                    </es-cta-card>
                </es-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2>EsCtaCard slots</h2>
            <ds-prop-table
                :columns="['Name', 'Default', 'Description']"
                :rows="slotTableRows"
                :widths="{
                    md: ['3', '4', '5'],
                    lg: ['2', '5', '5'],
                }" />
        </div>

        <div class="mb-500">
            <h2>EsCtaCard props</h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="tableWidths" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-cta-card.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/organisms/cta-card.vue" />
    </div>
</template>
