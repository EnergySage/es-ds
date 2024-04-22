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
                primary-cta-text="Schedule a call"
                primary-cta-url="https://www.energysage.com">
                <template #headline>
                    <span class="align-items-center d-flex text-success">
                        <icon-verified
                            class="mr-50"
                            height="22px"
                            width="22px" />
                    </span>
                    We’re here to help
                </template>
                <template #description>
                    Our Energy Advisors provide expert, unbiased energy advice at no cost to you.
                    <strong>
                        No annoying sales pitches, and no spam calls.
                    </strong>
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
                primary-cta-text="Schedule a call"
                primary-cta-url="https://www.energysage.com"
                secondary-cta-text="Send an email"
                secondary-cta-url="mailto:media@energysage.com">
                <template #headline>
                    <span class="align-items-center d-flex text-success">
                        <icon-verified
                            class="mr-50"
                            height="22px"
                            width="22px" />
                    </span>
                    We’re here to help
                </template>
                <template #description>
                    Our Energy Advisors provide expert, unbiased energy advice at no cost to you.
                    <strong>
                        No annoying sales pitches, and no spam calls.
                    </strong>
                </template>
            </es-support-card>
        </div>
        <div class="mb-450">
            <h2>
                Constrained
            </h2>
            <p class="mb-200">
                The <code>constrained</code> prop is set to demonstrate a limited-width container.
                There are no differences on mobile viewports from the default example.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    cols="12"
                    lg="8"
                    xl="7">
                    <es-support-card
                        constrained
                        image-alt-text="Donec consequat auctor"
                        :image-src="placeholderPersonImage"
                        primary-cta-text="Schedule a call"
                        primary-cta-url="https://www.energysage.com"
                        secondary-cta-text="Send an email"
                        secondary-cta-url="mailto:media@energysage.com">
                        <template #headline>
                            <span class="align-items-center d-flex text-success">
                                <icon-verified
                                    class="mr-50"
                                    height="22px"
                                    width="22px" />
                            </span>
                            We’re here to help
                        </template>
                        <template #description>
                            Our Energy Advisors provide expert, unbiased energy advice at no cost to you.
                            <strong>
                                No annoying sales pitches, and no spam calls.
                            </strong>
                        </template>
                    </es-support-card>
                </b-col>
            </b-row>
        </div>
        <div class="mb-450">
            <h2>
                Props
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>constrained</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>false</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            When set to <code>true</code>, reduces padding on desktop viewports
                            to better accommodate a limited-width layout.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>imageAltText</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>''</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            The alternate text for the image. Used by default unless content is supplied to the
                            <code>image</code> slot.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>imageSrc</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>''</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            The URL of the image to display. Used by default unless content is supplied to the
                            <code>image</code> slot.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>primaryCtaTarget</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>'_blank'</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            Controls whether or not the link should open in a new window. Defaults to
                            opening in a new window.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>primaryCtaText</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            n/a
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            Required. The text for the primary CTA button.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>primaryCtaUrl</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            n/a
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            Required. The URL to which the primary CTA button should link.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>secondaryCtaTarget</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>'_blank'</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            Controls whether or not the link should open in a new window. Defaults to
                            opening in a new window.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>secondaryCtaText</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>''</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            The text for the secondary CTA button, if any.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>secondaryCtaUrl</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>''</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            The URL to which the secondary CTA button (if any) should link.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
            </ds-responsive-table>
        </div>
        <div class="mb-450">
            <h2>
                Slots
            </h2>
            <ds-responsive-table>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>headline</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            n/a
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            The content to insert into the card's heading.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>image</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            <code>&lt;b-img&gt;</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            Optional. Replaces the default <code>&lt;b-img&gt;</code> tag that uses the
                            <code>imageSrc</code> and <code>imageAltText</code> props. Allows full customization
                            of the image component used, for example if a <code>&lt;nuxt-img&gt;</code> is desired.
                        </template>
                    </ds-responsive-table-column>
                </ds-responsive-table-row>
                <ds-responsive-table-row>
                    <ds-responsive-table-column :md="columnWidths.md[0]">
                        <template #name>
                            Name
                        </template>
                        <template #value>
                            <code>description</code>
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[1]">
                        <template #name>
                            Default
                        </template>
                        <template #value>
                            n/a
                        </template>
                    </ds-responsive-table-column>
                    <ds-responsive-table-column :md="columnWidths.md[2]">
                        <template #name>
                            Description
                        </template>
                        <template #value>
                            The content to display in the card's main paragraph.
                        </template>
                    </ds-responsive-table-column>
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
export default {
    name: 'EsSupportCardDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            columnWidths: {
                md: ['3', '2', '7'],
            },
            placeholderPersonImage: 'https://a-us.storyblok.com/f/1006159/1200x1200/47efaeb0b3/jessica.png/m/280x280/filters:quality(100)',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-support-card.vue');
            // eslint-disable-next-line max-len
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsSupportCard.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
};
</script>
