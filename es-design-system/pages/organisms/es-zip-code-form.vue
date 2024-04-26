<template>
    <!-- TODO: remove the below rules from eslint, as they can cause trailing underlines on links -->
    <!-- eslint-disable vue/multiline-html-element-content-newline vue/singleline-html-element-content-newline -->
    <div>
        <h1>
            Zip code form
        </h1>
        <p class="mb-450">
            Intended for use inside
            <b-link to="/organisms/es-cta-banner">EsCtaBanner</b-link>,
            <b-link to="/organisms/es-cta-card">EsCtaCard</b-link>,
            and hero modules.
        </p>

        <div class="mb-450">
            <h2>
                Responsive example
            </h2>
            <p class="mb-200">
                The zip code form is wrapped in grid columns that constrain the width at certain breakpoints.
                The <code>stackUntil</code> prop is set to <code>lg</code> so the input and button begin displaying
                side-by-side at that breakpoint.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    sm="10"
                    md="8">
                    <es-zip-code-form
                        input-id="hero-example"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="lg"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText>
                            See local offers
                        </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2>Pre-populate zipcode example</h2>
            <p class="mb-200">
                Same as above, except the zip code form can accept an <code>initial zip code value</code>, facilitating
                the pre-population of zip codes from a form. This feature is beneficial for scenarios where a
                pre-determined zip code needs to be set, which users can subsequently modify. If the user does not
                alter the zip code, it will default to the initial value provided.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    sm="10"
                    md="8">
                    <es-zip-code-form
                        input-id="prepopulate-hero-example"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="lg"
                        zip-code-initial-value="02150"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText> See local offers </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2>
                Dark responsive example
            </h2>
            <p class="mb-200">
                Same as above, except the zip code form is inside a container with a dark background and the
                <code>dark</code> prop is set to <code>true</code>.
            </p>
            <div class="bg-gray p-100">
                <b-row class="justify-content-center">
                    <b-col
                        sm="10"
                        md="8">

                        <es-zip-code-form
                            dark
                            input-id="dark-hero-example"
                            privacy-policy-link="https://www.energysage.com/privacy-policy/"
                            stack-until="lg"
                            url="https://www.energysage.com/market/start/">
                            <template #buttonText>
                                See local offers
                            </template>
                        </es-zip-code-form>
                    </b-col>
                </b-row>
            </div>
        </div>

        <div class="mb-450">
            <h2>
                Constrained responsive example
            </h2>
            <p class="mb-200">
                This form has <code>stackUntil</code> set to <code>sm</code> and appears within a
                smaller-width container. It has <code>constrained</code> set to <code>true</code>
                in order to make better use of the limited space. This reduces the horizontal padding
                on the submit button and reduces the size of the privacy text.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    sm="8"
                    md="6"
                    lg="5"
                    xl="4"
                    xxl="3">
                    <es-zip-code-form
                        constrained
                        input-id="hero-example"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="sm"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText>
                            See local offers
                        </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2>
                Side-by-side example with no privacy section
            </h2>
            <p class="mb-200">
                This form has <code>stackUntil</code> set to <code>xs</code> so it is always side-by-side.
                It also has the privacy section disabled by setting
                <code>showPrivacySection</code> to <code>false</code>.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    sm="10"
                    md="8">
                    <es-zip-code-form
                        constrained
                        input-id="side-by-side-example"
                        stack-until="xs"
                        :show-privacy-section="false"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText>
                            See local offers
                        </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2>
                Constrained stacked example
            </h2>
            <p class="mb-200">
                This example remains stacked at every breakpoint, in a limited-width container. This shows how
                the form would display within a card on the sidebar of a page.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    sm="8"
                    md="6"
                    lg="4"
                    xl="3"
                    xxl="2">
                    <es-zip-code-form
                        constrained
                        input-id="narrow-card-example"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText>
                            See local offers
                        </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2>
                Product Specific CTA
            </h2>
            <p class="mb-200">
                This example shows how to specify a product.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    sm="10"
                    md="8">
                    <es-zip-code-form
                        input-id="hero-example"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="lg"
                        url="https://www.energysage.com/onboarding/start/"
                        selected-product="heatpump">
                        <template #buttonText>
                            See local heat pump offers
                        </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>

        </div>

        <div class="mb-450">
            <h2>
                EsZipCodeForm slots
            </h2>
            <ds-prop-table
                :rows="slotTableRows"
                :widths="slotTableWidths" />
        </div>

        <div class="mb-450">
            <h2>
                EsZipCodeForm props
            </h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="propTableWidths" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsZipCodeForm.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-zip-code-form.vue" />
    </div>
    <!-- eslint-enable vue/multiline-html-element-content-newline vue/singleline-html-element-content-newline -->
</template>

<script>
export default {
    name: 'EsZipCodeFormDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            propTableRows: [
                [
                    'constrained',
                    'false',
                    `Reduces the button padding and privacy text font size to better accommodate
                        limited-width layouts.`,
                ],
                [
                    'dark',
                    'false',
                    'Renders the CTA with white text (suitable for display on a dark background).',
                ],
                [
                    'fieldName',
                    "'zip_code'",
                    'The name to use when submitting the ZIP code to the provided url.',
                ],
                [
                    'inputId',
                    'n/a',
                    'Required. The id for the zip entry. Must be unique on the page.',
                ],
                [
                    'newTab',
                    'false',
                    'Whether to open the URL in the url prop in a new tab.',
                ],
                [
                    'placeholder',
                    "'ZIP code'",
                    'Shown in the input as placeholder text. Also used as the (visually hidden) label for the input.',
                ],
                [
                    'showPrivacySection',
                    'true',
                    'Whether to show the privacy section.',
                ],
                [
                    'privacyPolicyLink',
                    "''",
                    'Link to the privacy policy. The link will not be shown if this is left blank.',
                ],
                [
                    'privacyPolicyNewTab',
                    'false',
                    'Whether to open the privacy policy link in a new tab.',
                ],
                [
                    'stackUntil',
                    "''",
                    `The input will be stacked above the button until the provided breakpoint (e.g. md, lg, xl), at
                        which point they will appear side by side. If no breakpoint is provided, the form will
                        remain stacked on all breakpoints.`,
                ],
                [
                    'url',
                    'n/a',
                    'URL to which the form will submit the provided zip code value.',
                ],
                [
                    'selectedProduct',
                    'n/a',
                    'Specify which product of interest. Options include: solar-pv, heatpump, ev-charger',
                ],
            ],
            propTableWidths: {
                md: ['4', '2', '6'],
                lg: ['3', '4', '5'],
            },
            slotTableRows: [
                [
                    'buttonText',
                    "'Submit'",
                    'The caption of the submit button.',
                ],
                [
                    'errorMessage',
                    "'Please enter a 5-digit zip code.'",
                    'The error message displayed when form validation fails.',
                ],
                [
                    'privacyExplanation',
                    "'Your information is safe with us.'",
                    `Text that will appear next to the Privacy Policy link. Intended to be a brief
                        description of our commitment to protecting customer information.`,
                ],
                [
                    'privacyPolicyLinkText',
                    "'Privacy Policy'",
                    'The text for the Privacy Policy link.',
                ],
            ],
            slotTableWidths: {
                md: ['4', '3', '5'],
                lg: ['3', '4', '5'],
            },
        };
    },
    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-zip-code-form.vue');
            const compSource = await import(
                '!raw-loader!@energysage/es-vue-base/src/lib-components/EsZipCodeForm.vue'
            );
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
