<template>
    <div>
        <h1>
            CTA card
        </h1>
        <b-row class="mb-450">
            <b-col
                xl="10"
                xxl="8">
                <p>
                    A card that displays a heading, image, subtitle, and call to action. The call to action can be
                    a link, button, or zip code form. Image and subtitle are optional and can be omitted.
                </p>
                <p class="mb-0">
                    Intended for use within a width-constrained grid column layout on larger breakpoints, either on
                    the left rail of a page layout or side by side with other CTA cards.
                </p>
            </b-col>
        </b-row>

        <div class="mb-450">
            <h2 class="mb-200">
                Default with zip code form
            </h2>
            <b-row class="justify-content-center justify-content-lg-start">
                <b-col
                    sm="8"
                    md="6"
                    lg="4"
                    xl="3">
                    <es-cta-card>
                        <template #heading>
                            Easily find what solar costs in your area
                        </template>
                        <template #image>
                            <b-img
                                alt="Map showing quotes in your area"
                                class="w-100"
                                height="257px"
                                src="https://news.energysage.com/wp-content/uploads/2023/04/24184120/mfdp-callout.webp"
                                width="220px" />
                        </template>
                        <template #cta>
                            <es-zip-code-form
                                input-id="default-with-zip-form"
                                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                                url="https://www.energysage.com/market/start/">
                                <template #buttonText>
                                    See local offers
                                </template>
                            </es-zip-code-form>
                        </template>
                    </es-cta-card>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2 class="mb-200">
                Image first with button
            </h2>
            <b-row class="justify-content-center justify-content-lg-start">
                <b-col
                    sm="8"
                    md="6"
                    lg="4"
                    xxl="3">
                    <es-cta-card image-first>
                        <template #image>
                            <b-img
                                alt="Heat pumps"
                                class="w-100"
                                height="150"
                                src="https://a-us.storyblok.com/f/1006156/159x150/af4d52baaa/heat-pump-icon.svg"
                                width="150" />
                        </template>
                        <template #heading>
                            Upgrade your heating and cooling with a new heat pump
                        </template>
                        <template #subtitle>
                            <p>
                                100% free to use, 100% online
                            </p>
                            <p>
                                Access the lowest prices
                            </p>
                            <p>
                                Free, expert advice along the way
                            </p>
                        </template>
                        <template #cta>
                            <es-button
                                class="w-100"
                                href="https://heatpumps.energysage.com/welcome">
                                Compare quotes
                            </es-button>
                        </template>
                    </es-cta-card>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2 class="mb-200">
                Image first with link
            </h2>
            <b-row class="justify-content-center justify-content-lg-start">
                <b-col
                    sm="8"
                    md="6"
                    lg="5"
                    xl="4"
                    xxl="3">
                    <es-cta-card
                        image-first
                        horizontal-padding="px-200"
                        vertical-spacing="mb-50">
                        <template #image>
                            <b-img
                                alt="Community solar"
                                class="mb-50 w-100"
                                height="150"
                                src="https://a-us.storyblok.com/f/1006156/159x150/acd049dd6f/community-solar-icon.svg"
                                width="150" />
                        </template>
                        <template #heading>
                            Community solar
                        </template>
                        <template #subtitle>
                            <p>
                                Go solar without installing panels on your roof
                            </p>
                        </template>
                        <template #cta>
                            <b-link>
                                Learn about community solar
                                <icon-arrow-right style="position: relative; top: -0.1em;" />
                            </b-link>
                        </template>
                    </es-cta-card>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2 class="mb-200">
                No image with zip code form
            </h2>
            <b-row class="justify-content-center justify-content-lg-start">
                <b-col
                    sm="8"
                    md="6"
                    lg="4"
                    xxl="3">
                    <es-cta-card>
                        <template #heading>
                            Easily find what solar costs in your area
                        </template>
                        <template #cta>
                            <es-zip-code-form
                                input-id="no-image-with-zip-form"
                                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                                url="https://www.energysage.com/market/start/">
                                <template #buttonText>
                                    See local offers
                                </template>
                            </es-zip-code-form>
                        </template>
                    </es-cta-card>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2>
                EsCtaCard slots
            </h2>
            <ds-prop-table
                :rows="slotTableRows"
                :widths="tableWidths" />
        </div>

        <div class="mb-450">
            <h2>
                EsCtaCard props
            </h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="tableWidths" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsCtaCard.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-cta-card.vue" />
    </div>
</template>

<script>
import { BImg } from 'bootstrap-vue';

export default {
    name: 'EsCtaDocs',
    components: {
        BImg,
    },
    data() {
        return {
            compCode: '',
            docCode: '',
            propTableRows: [
                [
                    'imageFirst',
                    'false',
                    'If true, reorders the elements so the image appears above the heading.',
                ],
                [
                    'horizontalPadding',
                    "'px-100'",
                    'The padding on the left and right sides of the card. Defaults to 16px.',
                ],
                [
                    'verticalSpacing',
                    "'mb-150'",
                    'The vertical spacing between elements in the card. Defaults to 24px.',
                ],
            ],
            slotTableRows: [
                [
                    'heading',
                    "'Easily find what solar costs in your area'",
                    'The card heading.',
                ],
                [
                    'image',
                    'n/a',
                    'Optional. The image for the card.',
                ],
                [
                    'subtitle',
                    'n/a',
                    'Optional. The paragraph(s) of text that should appear below the heading and/or image.',
                ],
                [
                    'cta',
                    'n/a',
                    'The call to action itself. Meant to be an EsButton, EsZipCodeForm, or a link.',
                ],
            ],
            tableWidths: {
                md: ['3', '4', '5'],
                lg: ['2', '5', '5'],
            },
        };
    },
    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-cta-card.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsCtaCard.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
