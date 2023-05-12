<template>
    <div>
        <h1 class="mb-300">
            Support card
        </h1>
        <div class="mb-450">
            <h2>
                Default
            </h2>
            <es-support-card
                image-alt-text="Donec consequat auctor"
                :image-src="placeholderPersonImage"
                primary-cta-text="Lorem ipsum"
                primary-cta-url="https://www.energysage.com">
                <template #headline>
                    <span class="align-items-center d-flex text-success">
                        <icon-verified
                            class="mr-50"
                            height="22px"
                            width="22px" />
                    </span>
                    Lorem ipsum dolor sit
                </template>
                <template #description>
                    Praesent hendrerit lacus eu eros varius, quis tempor eros varius.
                    <span class="font-weight-bold">
                        Sed efficitur gravida odio id posuere.
                    </span>
                </template>
            </es-support-card>
        </div>
        <div class="mb-450">
            <h2>
                With secondary CTA
            </h2>
            <es-support-card
                image-alt-text="Donec consequat auctor"
                :image-src="placeholderPersonImage"
                primary-cta-text="Lorem ipsum"
                primary-cta-url="https://www.energysage.com"
                secondary-cta-text="Orci varius natoque"
                secondary-cta-url="mailto:media@energysage.com">
                <template #headline>
                    <span class="align-items-center d-flex text-success">
                        <icon-verified
                            class="mr-50"
                            height="22px"
                            width="22px" />
                    </span>
                    Lorem ipsum dolor sit
                </template>
                <template #description>
                    Praesent hendrerit lacus eu eros varius, quis tempor eros varius.
                    <span class="font-weight-bold">
                        Sed efficitur gravida odio id posuere.
                    </span>
                </template>
            </es-support-card>
        </div>
        <div class="mb-450">
            <h2>
                Props
            </h2>
            <ds-responsive-table>
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
                            The alternate text for the image. Used by default unless content is supplied to the
                            <code>image</code> slot.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>imageSrc</code>
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
                            The URL of the image to display. Used by default unless content is supplied to the
                            <code>image</code> slot.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>primaryCtaTarget</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'_blank'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Controls whether or not the link should open in a new window. Defaults to
                            opening in a new window.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>primaryCtaText</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            n/a
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Required. The text for the primary CTA button.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>primaryCtaUrl</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            n/a
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Required. The URL to which the primary CTA button should link.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>secondaryCtaTarget</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            <code>'_blank'</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Controls whether or not the link should open in a new window. Defaults to
                            opening in a new window.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>secondaryCtaText</code>
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
                            The text for the secondary CTA button, if any.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>secondaryCtaUrl</code>
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
                            The URL to which the secondary CTA button (if any) should link.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>
        <div class="mb-450">
            <h2>
                Slots
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>headline</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            n/a
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            The content to insert into the card's heading.
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
                            <code>&lt;b-img&gt;</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Optional. Replaces the default <code>&lt;b-img&gt;</code> tag that uses the
                            <code>imageSrc</code> and <code>imageAltText</code> props. Allows full customization
                            of the image component used, for example if a <code>&lt;nuxt-img&gt;</code> is desired.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <dl>
                        <dt>
                            Name
                        </dt>
                        <dd>
                            <code>description</code>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Default
                        </dt>
                        <dd>
                            n/a
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            The content to display in the card's main paragraph.
                        </dd>
                    </dl>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsSupportCard.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-support-card.vue" />
    </div>
</template>

<script>
import placeholderPersonImage from '@/assets/placeholder/icon-person.svg';

export default {
    name: 'EsSupportCardDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            placeholderPersonImage,
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-support-card.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsSupportCard.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
