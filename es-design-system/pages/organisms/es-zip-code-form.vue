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
                Narrow card example
            </h2>
            <p class="mb-200">
                This example remains stacked at every breakpoint. It shows how the form renders in a card
                kept at a smaller width by a specific grid column layout.
            </p>
            <b-row class="justify-content-center justify-content-lg-start">
                <b-col
                    sm="10"
                    md="8"
                    lg="4"
                    xl="3">
                    <es-card class="px-100">
                        <es-zip-code-form
                            input-id="narrow-card-example"
                            privacy-policy-link="https://www.energysage.com/privacy-policy/"
                            url="https://www.energysage.com/market/start/">
                            <template #buttonText>
                                See local offers
                            </template>
                        </es-zip-code-form>
                    </es-card>
                </b-col>
            </b-row>
        </div>

        <div class="mb-450">
            <h2>
                EsZipCodeForm slots
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>buttonText</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            <code>'Submit'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            The caption of the submit button.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>errorMessage</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            <code>'Please enter a 5-digit zip code.'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            The error message displayed when form validation fails.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>privacyExplanation</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            <code>'Your information is safe with us.'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            Text that will appear next to the Privacy Policy link. Intended to be a brief
                            description of our commitment to protecting customer information.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>privacyPolicyLinkText</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            <code>'Privacy Policy'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            The text for the Privacy Policy link.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>

        <div class="mb-450">
            <h2>
                EsZipCodeForm props
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>dark</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            <code>false</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            Renders the CTA with white text (suitable for display on a dark background.)
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>fieldName</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            <code>'zip_code'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            The name to use when submitting the ZIP code to the provided <code>url</code>.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>inputId</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            N/A - <strong>required.</strong>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            <code>id</code> attribute for the zip entry. Must be unique on the page.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>newTab</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            <code>false</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            Whether to open the URL in the <code>url</code> prop in a new tab.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>placeholder</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            <code>'ZIP code'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            Shown in the input as placeholder text. Also used as the
                            (visually hidden) label for the input.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>privacyPolicyLink</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            N/A - <strong>required.</strong>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            Link to the privacy policy.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>privacyPolicyNewTab</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            <code>false</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            Whether to open the privacy policy link in a new tab.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>stackUntil</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            <code>''</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            Breakpoint up to which form should be stacked. Valid values are '', 'sm', 'md', 'lg', 'xl',
                            and 'xxl'. '' (empty string) will cause the component to never stack. An out-of-range value
                            like '*' will cause the component to always stack.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            {{ docTableColumns[0] }}
                        </dt>
                        <dd>
                            <code>url</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[1] }}
                        </dt>
                        <dd>
                            N/A - <strong>required.</strong>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            {{ docTableColumns[2] }}
                        </dt>
                        <dd>
                            URL to submit the form to.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
            </ds-responsive-table>
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
            docTableColumns: [
                'Name',
                'Default',
                'Description',
            ],
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
