<template>
    <div>
        <h1>
            CTA banner
        </h1>
        <b-row class="mb-450">
            <b-col
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
            </b-col>
        </b-row>

        <div class="mb-450">
            <h2 class="mb-200">
                Default with zip code form
            </h2>
            <b-row class="justify-content-center">
                <b-col
                    sm="10"
                    md="8"
                    lg="12"
                    xl="10">
                    <es-cta-banner>
                        <template #heading>
                            Switch to solar and save
                        </template>
                        <template #cta>
                            <es-zip-code-form
                                input-id="no-image-with-zip-form"
                                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                                stack-until="lg"
                                url="https://www.energysage.com/market/start/">
                                <template #buttonText>
                                    Compare solar quotes
                                </template>
                            </es-zip-code-form>
                        </template>
                    </es-cta-banner>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2 class="mb-200">
                Dark with zip code form
            </h2>
            <b-row class="justify-content-center">
                <b-col
                    sm="10"
                    md="8"
                    lg="12"
                    xl="10">
                    <es-cta-banner dark>
                        <template #heading>
                            Easily find what solar<br>costs in your area
                        </template>
                        <template #cta>
                            <es-zip-code-form
                                dark
                                input-id="no-image-with-zip-form"
                                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                                stack-until="lg"
                                url="https://www.energysage.com/market/start/">
                                <template #buttonText>
                                    Compare solar quotes
                                </template>
                            </es-zip-code-form>
                        </template>
                    </es-cta-banner>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2>
                Dark with subtitle and button
            </h2>
            <p class="mb-200">
                This example also shows using the <code>lgFirst</code> and <code>lgSecond</code> props to
                change the default grid layout on desktop from 6 columns each to 8 and 4 columns, giving the
                heading and subtitle more room and preventing the button from being too wide.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    sm="10"
                    md="8"
                    lg="12"
                    xl="10">
                    <es-cta-banner
                        dark
                        lg-first="8"
                        lg-second="4">
                        <template #heading>
                            Check availability in your area
                        </template>
                        <template #subtitle>
                            Our installer network is growing every day. Explore options in your state.
                        </template>
                        <template #cta>
                            <es-button
                                class="w-100"
                                href="https://heatpumps.energysage.com/welcome">
                                Get heat pump quotes
                            </es-button>
                        </template>
                    </es-cta-banner>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2>
                EsCtaBanner slots
            </h2>
            <ds-prop-table
                :rows="slotTableRows"
                :widths="tableWidths" />
        </div>

        <div class="mb-450">
            <h2>
                EsCta props
            </h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="tableWidths" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsCtaBanner.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-cta-banner.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsCtaDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            propTableRows: [
                [
                    'dark',
                    'false',
                    'Renders the banner with white text on a dark background.',
                ],
                [
                    'lgFirst',
                    "'6'",
                    'The number of grid columns within which the heading and subtitle should render on desktop.',
                ],
                [
                    'lgSecond',
                    "'6'",
                    'The number of grid columns within which the CTA should render on desktop.',
                ],
            ],
            slotTableRows: [
                [
                    'heading',
                    "'Easily find what solar costs in your area'",
                    'The banner heading.',
                ],
                [
                    'subtitle',
                    'n/a',
                    'Optional. The text that should appear below the heading.',
                ],
                [
                    'cta',
                    'n/a',
                    'The call to action itself. Meant to be an EsButton or EsZipCodeForm.',
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
            const docSource = await import('!raw-loader!./es-cta-banner.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsCtaBanner.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
