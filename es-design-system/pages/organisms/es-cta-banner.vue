<template>
    <div>
        <h1>
            CTA banner
        </h1>
        <b-row class="mb-500">
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

        <div class="mb-500">
            <h2>
                Default with zip code form
            </h2>
            <p class="mb-200">
                This is the default layout, designed to show a zip code form and display nicely within a
                limited-width container. The second example has <code>dark</code> set to <code>true</code>.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    cols="12"
                    lg="8"
                    xl="7">
                    <es-cta-banner class="mb-200">
                        <template #heading>
                            Switch to solar and save
                        </template>
                        <template #cta>
                            <es-zip-code-form
                                constrained
                                input-id="no-image-with-zip-form"
                                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                                stack-until="md"
                                url="https://www.energysage.com/market/start/">
                                <template #buttonText>
                                    Compare quotes
                                </template>
                            </es-zip-code-form>
                        </template>
                    </es-cta-banner>
                    <es-cta-banner dark>
                        <template #heading>
                            Easily find what solar costs in your area
                        </template>
                        <template #cta>
                            <es-zip-code-form
                                constrained
                                dark
                                input-id="no-image-with-zip-form"
                                privacy-policy-link="https://www.energysage.com/privacy-policy/"
                                stack-until="md"
                                url="https://www.energysage.com/market/start/">
                                <template #buttonText>
                                    Compare quotes
                                </template>
                            </es-zip-code-form>
                        </template>
                    </es-cta-banner>
                </b-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2>
                Default with subtitle and button
            </h2>
            <p class="mb-200">
                By default, the <code>cta</code> section will display at a larger width to accommodate a zip code form.
                When using a button, set the <code>hasButton</code> prop to <code>true</code>, and the CTA section will
                reduce in width.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    cols="12"
                    lg="8"
                    xl="7">
                    <es-cta-banner
                        dark
                        has-button>
                        <template #heading>
                            Check availability in your area
                        </template>
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
                </b-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2>
                Wide with zip code form
            </h2>
            <p class="mb-200">
                Set the <code>variant</code> prop to <code>'wide'</code> when the banner will display full width on
                a page. The <code>heading</code> text will appear larger on desktop, and the side padding will
                increase.
            </p>
            <es-cta-banner
                class="mb-200"
                variant="wide">
                <template #heading>
                    Switch to solar and save
                </template>
                <template #cta>
                    <es-zip-code-form
                        input-id="no-image-with-zip-form"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="md"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText>
                            Compare quotes
                        </template>
                    </es-zip-code-form>
                </template>
            </es-cta-banner>
            <es-cta-banner
                dark
                variant="wide">
                <template #heading>
                    Switch to solar and save
                </template>
                <template #cta>
                    <es-zip-code-form
                        dark
                        input-id="no-image-with-zip-form"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="md"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText>
                            Compare quotes
                        </template>
                    </es-zip-code-form>
                </template>
            </es-cta-banner>
        </div>

        <div class="mb-500">
            <h2>
                Wide with subtitle and button
            </h2>
            <p class="mb-200">
                By default, the <code>cta</code> section will display at a larger width to accommodate a zip code form.
                When using a button, set the <code>hasButton</code> prop to <code>true</code>, and the CTA section will
                reduce in width.
            </p>
            <es-cta-banner
                dark
                has-button
                variant="wide">
                <template #heading>
                    Check availability in your area
                </template>
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
            <h2>
                EsCtaBanner slots
            </h2>
            <ds-prop-table
                :rows="slotTableRows"
                :widths="tableWidths" />
        </div>

        <div class="mb-500">
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
                    'hasButton',
                    'false',
                    `If true, will give the heading (and subtitle, if any) more room on desktop, and reduce the width
                        of the button container.`,
                ],
                [
                    'variant',
                    "'default'",
                    `Accepts 'default' or 'wide'. The default variant has a smaller heading size and reduced padding.
                        The wide variant has a larger heading size and larger padding on desktop.`,
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
