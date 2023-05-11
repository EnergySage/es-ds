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
                image-alt-text="Energy advisor team"
                :image-src="eaMultiple"
                primary-cta-text="Schedule a call"
                primary-cta-url="https://www.energysage.com">
                <template #headline>
                    <span class="align-items-center d-flex text-success">
                        <icon-verified
                            class="mr-50"
                            height="22px"
                            width="22px" />
                    </span>
                    We're here to help
                </template>
                <template #description>
                    Our Energy Advisors provide expert, unbiased energy advice at no cost to you.
                    <span class="font-weight-bold">
                        No annoying sales pitches, and no spam calls.
                    </span>
                </template>
            </es-support-card>
        </div>
        <div class="mb-450">
            <h2>
                With secondary CTA
            </h2>
            <es-support-card
                image-alt-text="Energy advisor team"
                :image-src="eaMultiple"
                primary-cta-text="Schedule a call"
                primary-cta-url="https://www.energysage.com"
                secondary-cta-text="Send an email"
                secondary-cta-url="mailto:help@energysage.com">
                <template #headline>
                    <span class="align-items-center d-flex text-success">
                        <icon-verified
                            class="mr-50"
                            height="22px"
                            width="22px" />
                    </span>
                    We're here to help
                </template>
                <template #description>
                    Our Energy Advisors provide expert, unbiased energy advice at no cost to you.
                    <span class="font-weight-bold">
                        No annoying sales pitches, and no spam calls.
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
                            n/a
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Required. The alternate text for the image.
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
                            n/a
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            Description
                        </dt>
                        <dd>
                            Required. The URL of the image to display.
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
import eaMultiple from '@/assets/img/ea-multiple.png';

export default {
    name: 'EsSupportCardDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            eaMultiple,
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
