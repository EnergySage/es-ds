<template>
    <div>
        <h1>
            CTA Banner
        </h1>
        <p class="mb-450">
            Full-width banner that may contain a heading, a subtitle, and a button or form CTA within the "cta" slot.
        </p>
        <div class="mb-450">
            <h2 class="mb-200">
                CTA with button
            </h2>
            <es-cta-banner
                dark
                :heading="heading"
                :subtitle="subtitle">
                <template #cta>
                    <es-button to="#">
                        Get quotes
                    </es-button>
                </template>
            </es-cta-banner>
        </div>
        <div class="mb-450">
            <h2 class="mb-200">
                CTA with zip entry
            </h2>
            <es-cta-banner
                :heading="heading"
                :subtitle="subtitle">
                <template #cta>
                    <es-zip-code-form
                        align="end"
                        button-text="Get quotes"
                        context-domain="www.energysage.com"
                        input-id="RSM-1"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="lg"
                        url="https://www.energysage.com/market/start/" />
                </template>
            </es-cta-banner>
        </div>
        <div class="mb-450">
            <h2>
                EsCta props
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>dark</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>false</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Renders the CTA with white text on a dark background.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>heading</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            None - <strong>required.</strong>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Heading copy
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>subtitle</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>''</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Additional copy to display below the heading (or below the image if
                            <code>headingFirst</code> is <code>true</code>).
                        </dd>
                    </dl>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsCtaBanner.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-cta-banner.vue" />
    </div>
</template>
<script>
import EsButton from '@energysage/es-vue-base/src/lib-components/EsButton.vue';
import EsZipCodeForm from '@energysage/es-vue-base/src/lib-components/EsZipCodeForm.vue';

export default {
    name: 'EsCtaDocs',
    components: {
        EsButton,
        EsZipCodeForm,
    },
    data() {
        return {
            heading: 'Check our marketplace',
            subtitle: 'Get free quotes.',
            compCode: '',
            docCode: '',
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
