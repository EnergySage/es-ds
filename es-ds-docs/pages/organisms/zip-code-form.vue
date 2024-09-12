<script setup>
const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
if ($prism) {
    const compSource = await import('@energysage/es-ds-components/components/es-zip-code-form.vue?raw');
    // eslint-disable-next-line import/no-self-import
    const docSource = await import('./zip-code-form.vue?raw');
    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}

const propTableRows = [
    [
        'constrained',
        'Boolean',
        'false',
        `Reduces the button padding and privacy text font size to better accommodate
            limited-width layouts.`,
    ],
    ['dark', 'Boolean', 'false', 'Renders the CTA with white text (suitable for display on a dark background).'],
    ['fieldName', 'String', "'zip_code'", 'The name to use when submitting the ZIP code to the provided url.'],
    ['inputId', 'String', 'n/a', 'Required. The id for the zip entry. Must be unique on the page.'],
    ['newTab', 'Boolean', 'false', 'Whether to open the URL in the url prop in a new tab.'],
    [
        'placeholder',
        'String',
        "'ZIP code'",
        'Shown in the input as placeholder text. Also used as the (visually hidden) label for the input.',
    ],
    ['showPrivacySection', 'Boolean', 'true', 'Whether to show the privacy section.'],
    [
        'privacyPolicyLink',
        'String',
        "''",
        'Link to the privacy policy. The link will not be shown if this is left blank.',
    ],
    ['privacyPolicyNewTab', 'Boolean', 'false', 'Whether to open the privacy policy link in a new tab.'],
    [
        'stackUntil',
        'String',
        "''",
        `The input will be stacked above the button until the provided breakpoint (e.g. md, lg, xl), at
            which point they will appear side by side. If no breakpoint is provided, the form will
            remain stacked on all breakpoints.`,
    ],
    ['url', 'String', 'n/a', 'URL to which the form will submit the provided zip code value.'],
    [
        'selectedProduct',
        'String',
        "''",
        'Specify which product of interest. Options include: solar-pv, heatpump, ev-charger',
    ],
    ['zipCodeValue', 'String', "''", 'The default zipcode value if passed to the zip code form'],
];

const slotTableRows = [
    ['buttonText', 'String', "'Submit'", 'The caption of the submit button.'],
    [
        'errorMessage',
        'String',
        "'Please enter a 5-digit zip code.'",
        'The error message displayed when form validation fails.',
    ],
    [
        'privacyExplanation',
        'String',
        "'Your information is safe with us.'",
        `Text that will appear next to the Privacy Policy link. Intended to be a brief
            description of our commitment to protecting customer information.`,
    ],
    ['privacyPolicyLinkText', 'String', "'Privacy Policy'", 'The text for the Privacy Policy link.'],
];
</script>

<template>
    <div>
        <h1>Zip code form</h1>
        <!-- TODO uncomment when these components exist in new DS -->
        <!-- <p class="mb-500">
            Intended for use inside
            <b-link to="/organisms/es-cta-banner">EsCtaBanner</b-link>,
            <b-link to="/organisms/es-cta-card">EsCtaCard</b-link>,
            and hero modules.
        </p> -->
        <p class="mb-500"></p>

        <div class="mb-500">
            <h2>Responsive example</h2>
            <p class="mb-200">
                The zip code form is wrapped in grid columns that constrain the width at certain breakpoints. The
                <code>stackUntil</code> prop is set to <code>lg</code> so the input and button begin displaying
                side-by-side at that breakpoint.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    class="d-flex justify-content-center"
                    sm="10"
                    md="8">
                    <es-zip-code-form
                        input-id="hero-example"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="lg"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText> See local offers </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2>Pre-populate zipcode example</h2>
            <p class="mb-200">
                Same as above, except the zip code form can accept an <code>initial zip code value</code>, facilitating
                the pre-population of zip codes from a form. This feature is beneficial for scenarios where a
                pre-determined zip code needs to be set, which users can subsequently modify. If the user does not
                alter the zip code, it will default to the initial value provided.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    class="d-flex justify-content-center"
                    sm="10"
                    md="8">
                    <es-zip-code-form
                        input-id="prepopulate-hero-example"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="lg"
                        zip-code-value="02150"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText> See local offers </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2>Dark responsive example</h2>
            <p class="mb-200">
                Same as above, except the zip code form is inside a container with a dark background and the
                <code>dark</code> prop is set to <code>true</code>.
            </p>
            <div class="bg-dark-blue rounded p-200">
                <b-row class="justify-content-center">
                    <b-col
                        class="d-flex justify-content-center"
                        sm="10"
                        md="8">
                        <es-zip-code-form
                            dark
                            input-id="dark-hero-example"
                            privacy-policy-link="https://www.energysage.com/privacy-policy/"
                            stack-until="lg"
                            url="https://www.energysage.com/market/start/">
                            <template #buttonText> See local offers </template>
                        </es-zip-code-form>
                    </b-col>
                </b-row>
            </div>
        </div>

        <div class="mb-500">
            <h2>Constrained responsive example</h2>
            <p class="mb-200">
                This form has <code>stackUntil</code> set to <code>sm</code> and appears within a smaller-width
                container. It has <code>constrained</code> set to <code>true</code>
                in order to make better use of the limited space. This reduces the horizontal padding on the submit
                button and reduces the size of the privacy text.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    class="d-flex justify-content-center"
                    sm="8"
                    md="6"
                    lg="5"
                    xl="6"
                    xxl="4">
                    <es-zip-code-form
                        constrained
                        input-id="hero-example"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="sm"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText> See local offers </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2>Side-by-side example with no privacy section</h2>
            <p class="mb-200">
                This form has <code>stackUntil</code> set to <code>xs</code> so it is always side-by-side. It also has
                the privacy section disabled by setting <code>showPrivacySection</code> to <code>false</code>.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    class="d-flex justify-content-center"
                    sm="10"
                    md="8">
                    <es-zip-code-form
                        constrained
                        input-id="side-by-side-example"
                        stack-until="xs"
                        :show-privacy-section="false"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText> See local offers </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2>Constrained stacked example</h2>
            <p class="mb-200">
                This example remains stacked at every breakpoint, in a limited-width container. This shows how the form
                would display within a card on the sidebar of a page.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    sm="8"
                    md="6"
                    lg="4"
                    xl="4"
                    xxl="3">
                    <es-zip-code-form
                        constrained
                        input-id="narrow-card-example"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        url="https://www.energysage.com/market/start/">
                        <template #buttonText> See local offers </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2>Product specific CTA</h2>
            <p class="mb-200">
                This example shows how to specify a product parameter that will be passed along when the form is
                submitted.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    class="d-flex justify-content-center"
                    sm="10"
                    md="8">
                    <es-zip-code-form
                        input-id="hero-example"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="lg"
                        url="https://www.energysage.com/onboarding/start/"
                        selected-product="heatpump">
                        <template #buttonText> See local heat pump offers </template>
                    </es-zip-code-form>
                </b-col>
            </b-row>
        </div>

        <div class="mb-500">
            <h2>EsZipCodeForm slots</h2>
            <ds-prop-table :rows="slotTableRows" />
        </div>

        <div class="mb-500">
            <h2>EsZipCodeForm props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-zip-code-form.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/zip-code-form.vue" />
    </div>
</template>
