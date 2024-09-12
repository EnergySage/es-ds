<script setup>
definePageMeta({
    layout: 'full-width-component',
});

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

const placeholderImage = 'https://a-us.storyblok.com/f/1006156/110x110/d215996a95/default-installer-logo.png';

const propTableRows = [
    [
        'constrained',
        'Boolean',
        'false',
        'When set to `true`, reduces padding on desktop viewports to better accommodate a limited-width layout.',
    ],
    [
        'imageAltText',
        'String',
        "''",
        'The alternate text for the image. Used by default unless content is supplied to the `image` slot.',
    ],
    [
        'imageSrc',
        'String',
        "''",
        'The URL of the image to display. Used by default unless content is supplied to the `image` slot.',
    ],
    [
        'primaryCtaTarget',
        'String',
        "'_blank'",
        'Controls whether or not the link should open in a new window. Defaults to opening in a new window.',
    ],
    ['primaryCtaText', 'String', 'n/a', 'Required. The text for the primary CTA button.'],
    ['primaryCtaUrl', 'String', 'n/a', 'Required. The URL to which the primary CTA button should link.'],
    [
        'secondaryCtaTarget',
        'String',
        "'_blank'",
        'Controls whether or not the link should open in a new window. Defaults to opening in a new window.',
    ],
    ['secondaryCtaText', 'String', "''", 'The text for the secondary CTA button, if any.'],
    ['secondaryCtaUrl', 'String', "''", 'The URL to which the secondary CTA button (if any) should link.'],
];

const slotTableRows = [
    ['headline', 'n/a', "The content to insert into the card's heading."],
    [
        'image',
        '<nuxt-img>',
        'Optional. Replaces the default <nuxt-img> tag that uses the `imageSrc` and `imageAltText` props. Allows full customization of the image component used.',
    ],
    ['description', 'n/a', "The content to display in the card's main paragraph."],
];

onMounted(async () => {
    if ($prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const compSource = await import('@energysage/es-ds-components/components/es-support-card.vue?raw');
        const docSource = await import('./support-card.vue?raw');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1 class="mb-300">Support card</h1>
        <div class="mb-500">
            <h2>Default</h2>
            <es-support-card
                image-alt-text="Donec consequat auctor"
                :image-src="placeholderImage"
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
                    <strong> No annoying sales pitches, and no spam calls. </strong>
                </template>
            </es-support-card>
        </div>
        <div class="mb-500">
            <h2>With secondary CTA</h2>
            <es-support-card
                image-alt-text="Donec consequat auctor"
                :image-src="placeholderImage"
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
                    <strong> No annoying sales pitches, and no spam calls. </strong>
                </template>
            </es-support-card>
        </div>
        <div class="mb-500">
            <h2>Constrained</h2>
            <p class="mb-200">
                The <code>constrained</code> prop is set to demonstrate a limited-width container. There are no
                differences on mobile viewports from the default example.
            </p>
            <b-row class="justify-content-center">
                <b-col
                    cols="12"
                    lg="8"
                    xl="7">
                    <es-support-card
                        constrained
                        image-alt-text="Donec consequat auctor"
                        :image-src="placeholderImage"
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
                            <strong> No annoying sales pitches, and no spam calls. </strong>
                        </template>
                    </es-support-card>
                </b-col>
            </b-row>
        </div>
        <div class="mb-500">
            <h2>EsSupportCard props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>
        <div class="mb-500">
            <h2>EsSupportCard slots</h2>
            <ds-prop-table
                :rows="slotTableRows"
                :columns="['Name', 'Default', 'Description']"
                :widths="{ md: ['3', '2', '7'] }" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-support-card.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/organisms/support-card.vue" />
    </div>
</template>
