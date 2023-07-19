<template>
    <div>
        <h1>
            CTA Card
        </h1>
        <p class="mb-450">
            A card CTA to be used in sidebars, card lists, or in a main content area. Has optional slots for
            <code>image</code> and <code>cta</code>.
        </p>
        <div class="mb-450">
            <h2 class="mb-200">
                CTA with button, lazy image slot
            </h2>
            <es-cta-card
                :heading="heading"
                :heading-first="headingFirst"
                narrow
                :subtitle="subtitle">
                <template #cta>
                    <es-button>
                        Get quotes
                    </es-button>
                </template>
                <template #image>
                    <div class="d-flex justify-content-center mb-100">
                        <b-img
                            :width="imageWidth"
                            :height="imageHeight"
                            :lazy="true"
                            :src="image"
                            :alt="imageAltText" />
                    </div>
                </template>
            </es-cta-card>
        </div>
        <div class="mb-450">
            <h2 class="mb-200">
                Clickable card CTA, fluid image slot
            </h2>
            <es-cta-card
                context-domain="www.energysage.com"
                :heading="heading"
                :heading-first="headingFirst"
                narrow
                subtitle="Click here to get free quotes."
                url="https://www.energysage.com/">
                <template #image>
                    <div class="d-flex justify-content-center mb-100">
                        <b-img
                            fluid
                            :src="image"
                            :alt="imageAltText" />
                    </div>
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
                narrow
                :subtitle="subtitle">
                <template #cta>
                    <es-zip-code-form
                        button-text="Get quotes"
                        context-domain="www.energysage.com"
                        input-id="RSM-1"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        privacy-policy-text=""
                        stack-until="*"
                        url="https://www.energysage.com/market/start/" />
                </template>
            </es-cta-card>
        </div>
        <div class="mb-450">
            <h2 class="mb-200">
                Expanding CTA with zip entry
            </h2>
            <es-cta-card
                :heading="heading"
                :image="image"
                :image-alt-text="imageAltText"
                :image-height="imageHeight"
                :image-width="imageWidth"
                :subtitle="subtitle">
                <template #cta>
                    <es-zip-code-form
                        align="start"
                        button-text="Get quotes"
                        context-domain="www.energysage.com"
                        input-id="RSM-2"
                        privacy-policy-link="https://www.energysage.com/privacy-policy/"
                        stack-until="lg"
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
                            Renders the heading (but not the subtitle) above the image. Automatically disabled in
                            2-column configurations when the image is in left column.
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
                            <code>imageWidth</code> must also be set. Alternatively, if the <code>image</code> slot
                            is filled, none of the <code>image</code> props will apply.
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
                            Alt text for image. Not used if the <code>image</code> slot is filled.
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
                            Desired display height of image. Image will scale down (not crop) to fit the height and
                            width specified while maintaining aspect ratio.  Required if <code>image</code> prop is
                            included. Not used if the <code>image</code> slot is filled.
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
                            Desired display width of image. Image will scale down (not crop) to fit the height and
                            width specified while maintaining aspect ratio. Required if <code>image</code> prop is
                            included. Not used if the <code>image</code> slot is filled.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>lazy</code>
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
                            Whether to lazyload the image specified in the <code>image</code> prop. Not used if the
                            <code>image</code> slot is filled.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>newTab</code>
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
                            Whether to open the URL (if provided) in the <code>url</code> prop in a new tab. Does not
                            apply to the contents of the <code>cta</code> slot.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>narrow</code>
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
                            Indicates the CTA is displayed in a sidebar or other width-restricted layout, and should
                            never go into 2-column configuration.
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
                            <code>url</code>
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
                            If provided, the whole CTA is clickable and links to the given URL. Should be used if and
                            only if the <code>cta</code> slot is not used.
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
import { BImg } from 'bootstrap-vue';
import EsButton from '@energysage/es-vue-base/src/lib-components/EsButton.vue';
import EsZipCodeForm from '@energysage/es-vue-base/src/lib-components/EsZipCodeForm.vue';

export default {
    name: 'EsCtaDocs',
    components: {
        BImg,
        EsButton,
        EsZipCodeForm,
    },
    data() {
        return {
            heading: 'Check our marketplace',
            headingFirst: true,
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
