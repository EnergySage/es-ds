<template>
    <div>
        <h1>
            CTA
        </h1>
        <p class="mb-450">
            Description
        </p>
        <div class="mb-450">
            <h2 class="mb-200">
                Clickable card CTA
            </h2>
            <es-cta-card
                context-domain="www.energysage.com"
                :heading="heading"
                :heading-first="headingFirst"
                :image="image"
                :image-alt-text="imageAltText"
                :image-height="imageHeight"
                :image-width="imageWidth"
                :subtitle="subtitle"
                url="https://www.energysage.com/" />
        </div>
        <div class="mb-450">
            <h2 class="mb-200">
                CTA with button
            </h2>
            <es-cta-card
                dark
                :heading="heading"
                :heading-first="headingFirst"
                :image="image"
                :image-alt-text="imageAltText"
                :image-height="imageHeight"
                :image-width="imageWidth"
                :subtitle="subtitle">
                <template #cta>
                    <es-button>
                        Get quotes
                    </es-button>
                </template>
            </es-cta-card>
        </div>
        <div class="mb-450">
            <h2 class="mb-200">
                CTA with zip entry
            </h2>
            <es-cta-card
                :heading="heading"
                :heading-first="headingFirst"
                :image="image"
                :image-alt-text="imageAltText"
                :image-height="imageHeight"
                :image-width="imageWidth"
                :subtitle="subtitle">
                <template #cta>
                    <es-zip-code-form
                        button-text="Get quotes"
                        context-domain="www.energysage.com"
                        input-id="RSM-1"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        privacy-policy-text=""
                        url="https://www.energysage.com/market/start/" />
                </template>
            </es-cta-card>
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
                            <code>buttonText</code>
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
                            Required if <code>showForm</code> is <code>true</code>.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>contextDomain</code>
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
                            Domain that this CTA is being used on. Used to determine whether the CTA will trigger
                            opening in a new tab. Required in SSG/SSR environments, where <code>window</code> is not
                            available. If not set in an SSG/SSR environment, CTA will always open in the same tab.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
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
                            <code>errorDescription</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'Please enter a 5-digit zip code.'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Validation error text for zip entry. Required if <code>showZipEntry</code> is
                            <code>true</code>.
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
                            <code>headingFirst</code>
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
                            Renders the heading (but not the subtitle) above the image. Automatically disabled on wide
                            views with image in left column.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>headingClass</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'h2'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Class override to render heading at a specific size or heading level. Does not affect
                            heading tag type, which is always a <code>div</code>.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>image</code>
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
                            URL for an image to include. If included, <code>imageHeight</code> and
                            <code>imageWidth</code> must also be set.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>imageAltText</code>
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
                            Alt text for image.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>imageHeight</code>
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
                            Desired display height of image. Required if <code>image</code> is included. Image will
                            scale down (not crop) to fit the height and width specified while maintaining aspect ratio.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>imageWidth</code>
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
                            Desired display width of image. Required if <code>image</code> is included. Image will
                            scale down (not crop) to fit the height and width specified while maintaining aspect ratio.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>inputId</code>
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
                            <code>id</code> attribute for the zip entry. Must be unique on the page. Required if
                            <code>showZipEntry</code> is <code>true</code>.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>showForm</code>
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
                            Whether to show a button (and zip entry if enabled) on the CTA. By default, the whole CTA
                            card is a clickable link.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>showPrivacyPolicy</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>true</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Whether to show the privacy policy link. If <code>showZipEntry</code> is not
                            <code>true</code>, the privacy policy will always be hidden.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>showZipEntry</code>
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
                            Whether to show the zip entry field. If enabled, <code>inputId</code> must be set with a
                            unique-per-page ID.
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
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>privacyPolicyLink</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'https://www.energysage.com/privacy-policy/'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Link to the privacy policy.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>privacyPolicyLinkText</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'Privacy Policy'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Text for the privacy policy link.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>privacyPolicyText</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'Your information is safe with us.'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Additional text to show before the privacy policy link. If set to a falsy value, a lock
                            icon will be displayed before the link instead.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>url</code>
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
                            URL to go to when the CTA is clicked, or to submit the form to if <code>showForm</code> is
                            <code>true</code>.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsCtaCard.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-cta-card.vue" />
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
            headingFirst: false,
            image: 'https://news.energysage.com/wp-content/uploads/2023/04/24184120/mfdp-callout.webp',
            imageAltText: '',
            imageHeight: '257px',
            imageWidth: '220px',
            subtitle: 'Get free quotes.',
            compCode: '',
            docCode: '',
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
