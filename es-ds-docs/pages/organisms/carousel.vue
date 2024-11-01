<script setup lang="ts">
const SAMPLE_IMAGES = [
    'https://a-us.storyblok.com/f/1006159/810x471/e9dfa73446/renewable-energy-credits.jpg?cv=1729091549197',
    'https://a-us.storyblok.com/f/1006159/810x471/e9724bfe3d/how-many-solar-panels-can-i-fit-on-my-roof-1.jpg?cv=1729089091200',
    'https://a-us.storyblok.com/f/1006159/810x471/9d70141e04/how-many-solar-batteries-do-i-need.jpg?cv=1729027236346',
    'https://a-us.storyblok.com/f/1006159/810x471/f719b5918c/types-of-solar-panels.jpg?cv=1729027121520',
    'https://a-us.storyblok.com/f/1006159/810x471/2a88e73a6b/heat-pump-vs-oil.jpg?cv=1729171528536',
    'https://a-us.storyblok.com/f/1006159/810x471/d48ae4605e/des-1116-csm.jpg?cv=1729694782046',
    'https://a-us.storyblok.com/f/1006159/810x471/ca3650d4f7/hybrid-heat-pumps.jpg?cv=1730192379642',
    'https://a-us.storyblok.com/f/1006159/810x473/319bb5c48e/ev-charger-tax-credit-2024.jpg?cv=1729025549687',
    'https://a-us.storyblok.com/f/1006159/810x471/e19919aa39/heatpump_minisplits.jpg?cv=1729022439533',
    'https://a-us.storyblok.com/f/1006159/810x473/730730f571/solar-patio-cover.jpg?cv=1728483201600',
    'https://a-us.storyblok.com/f/1006159/810x473/dfbc056218/alternative-to-solar-panels.jpg?cv=1728482849234',
    'https://a-us.storyblok.com/f/1006159/810x473/a3a6b6d667/adding-solar-panels.jpg?cv=1728482273086',
];

const basicExampleItems = SAMPLE_IMAGES.map((image, index) => ({
    heading: `Item ${index + 1}`,
    url: image,
}));

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/components/es-carousel.vue?raw');
        // eslint-disable-next-line import/no-self-import
        const docSource = await import('./carousel.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});

const propTableRows = [
    [
        'autoPlay',
        'Boolean',
        'false',
        'If true, the carousel will automatically go to the next page after a set interval, determined by autoPlayInterval. The autoplay functionality can be stopped by pressing the Esc key.',
    ],
    [
        'autoPlayInterval',
        'Number',
        '2000',
        'If autoPlay is true, this determines the number of milliseconds between transitions.',
    ],
    [
        'breakpoints',
        'Object',
        '{}',
        'Allows you to specify how many items should be shown and how many items should scroll at each breakpoint. This object has optional keys of sm, md, lg, xl, and xxl. If a breakpoint is omitted, the values from the next-lowest defined breakpoint will be used. Each key points to an object where you can set numScroll (optional) and numVisible (required).',
    ],
    [
        'circular',
        'Boolean',
        'true',
        'Whether the carousel should stop paging at either end or start over from the beginning.',
    ],
    [
        'items',
        'Array',
        '[]',
        'Required. The items to display in the carousel. Use the template #item to style the items.',
    ],
    [
        'numScroll',
        'Number',
        '1',
        'The number of items to scroll on each page transition. This is also used as the default mobile value when using breakpoints.',
    ],
    [
        'numVisible',
        'Number',
        '1',
        'The number of items visible at any one time. This is also used as the default mobile value when using breakpoints.',
    ],
    ['showArrows', 'Boolean', 'true', 'Whether to show the arrows on either side of the carousel.'],
    ['showDots', 'Boolean', 'true', 'Whether to show the dots at the bottom of the carousel.'],
];

const eventTableRows = [['update', 'value (Number)', 'Emitted when the visible page of the carousel changes.']];
</script>

<template>
    <div>
        <h1>Carousel</h1>
        <p class="mb-500">
            Extended from
            <a
                href="https://v3.primevue.org/carousel/"
                target="_blank">
                PrimeVue Carousel
            </a>
        </p>

        <div class="my-500">
            <h2>Basic example</h2>
            <p class="mb-200">
                This example shows a responsive carousel with twelve items, rendered as cards with an image and
                subtitle. Mobile sees one card at a time, which then increases to two, three, and four as the viewport
                width increases.
            </p>
            <es-carousel
                :breakpoints="{
                    sm: {
                        numScroll: 2,
                        numVisible: 2,
                    },
                    lg: {
                        numScroll: 3,
                        numVisible: 3,
                    },
                    xxl: {
                        numScroll: 4,
                        numVisible: 4,
                    },
                }"
                :items="basicExampleItems">
                <template #item="{ item }">
                    <es-card class="text-center">
                        <nuxt-img
                            class="mb-50 w-100"
                            :src="item.url" />
                        <p class="font-weight-semibold mb-0">
                            {{ item.heading }}
                        </p>
                    </es-card>
                </template>
            </es-carousel>
        </div>

        <div class="my-500">
            <h2>Circular example</h2>
            <p>
                This example shows the same responsive carousel but with circular behavior turned on, meaning the user
                can continue paging in one direction forever and the items from the beginning of the list will be
                repeated once the end of the list is reached.
            </p>
            <p class="mb-200">
                Unless paging is done in a rapid-fire succession (the carousel needs a split second to add more hidden
                items after a page transition completes), the next set of items will always appear to come from the
                same direction as all previous items, even when circling back to the beginning of the list.
            </p>
            <es-carousel
                :breakpoints="{
                    sm: {
                        numScroll: 2,
                        numVisible: 2,
                    },
                    lg: {
                        numScroll: 3,
                        numVisible: 3,
                    },
                    xxl: {
                        numScroll: 4,
                        numVisible: 4,
                    },
                }"
                circular
                :items="basicExampleItems">
                <template #item="{ item }">
                    <es-card class="text-center">
                        <nuxt-img
                            class="mb-50 w-100"
                            :src="item.url" />
                        <p class="font-weight-semibold mb-0">
                            {{ item.heading }}
                        </p>
                    </es-card>
                </template>
            </es-carousel>
        </div>

        <div class="my-500">
            <h2>Circular autoplay with hidden arrows and dots</h2>
            <p>
                This example shows the same twelve items, but with autoplay turned on, circular behavior enabled, and
                the arrows and dots hidden.
            </p>
            <p class="mb-200">
                Pressing the Esc key will stop the autoplay. This is an accessibility feature for screen readers,
                because the contents of each new slide brought into view by autoplay are automatically read aloud, no
                matter where the user is on the page.
            </p>
            <es-carousel
                auto-play
                :breakpoints="{
                    sm: {
                        numVisible: 2,
                    },
                    lg: {
                        numVisible: 3,
                    },
                    xxl: {
                        numVisible: 4,
                    },
                }"
                circular
                :items="basicExampleItems"
                :show-arrows="false"
                :show-dots="false">
                <template #item="{ item }">
                    <es-card class="text-center">
                        <nuxt-img
                            class="mb-50 w-100"
                            :src="item.url" />
                        <p class="font-weight-semibold mb-0">
                            {{ item.heading }}
                        </p>
                    </es-card>
                </template>
            </es-carousel>
        </div>

        <div class="mb-500">
            <h2>EsCarousel props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <div class="mb-500">
            <h2>EsCarousel events</h2>
            <ds-prop-table
                :columns="['Name', 'Parameters', 'Description']"
                :rows="eventTableRows"
                :widths="{
                    md: ['3', '4', '5'],
                }" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-carousel.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/organisms/carousel.vue" />
    </div>
</template>
<style lang="scss" scoped>
.product-image {
    aspect-ratio: 1;
    margin-bottom: 0.75rem;
    object-fit: cover;
}
</style>
