<script setup lang="ts">
const items = ref([
    {
        image_url:
            'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BDDP_STG/on/demandware.static/-/Sites-masterCatalog/default/Products/I-PUPEVCHAR-NEMA.jpg',
        model_name: 'Wallbox Pulsar Plus 40A',
        price: '$649.00',
        productUrl: 'https://equipment.energysage.com/ev-chargers/PUP1-U-1-5-N-002-A',
        subtitle: 'You may be eligible for rebates!',
    },
    {
        image_url:
            'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BDDP_STG/on/demandware.static/-/Sites-masterCatalog/default/Products/I-PUPEVCHAR-Hardwire.jpg',
        model_name: 'Wallbox Pulsar Plus 48A',
        price: '$699.00',
        productUrl: 'https://equipment.energysage.com/ev-chargers/PUP1-U-1-6-C-002-A',
        subtitle: 'You may be eligible for rebates!',
    },
    {
        image_url:
            'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BDDP_STG/on/demandware.static/-/Sites-masterCatalog/default/Products/I-CHARGFLEX-01-PGIN-0650-V1.jpg',
        model_name: 'ChargePoint Home Flex Level 2 EV Charger w/ NEMA 6-50, 23 ft cable',
        price: '$599.00',
        productUrl: 'https://equipment.energysage.com/ev-chargers/CPH50-NEMA6-50-L23',
        subtitle: 'You may be eligible for rebates!',
    },
    {
        image_url:
            'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BDDP_STG/on/demandware.static/-/Sites-masterCatalog/default/Products/I-FLOX5EVC-01-HI5C-FL01-V1.jpg',
        model_name: 'FLO Home X5 - Smart EV Charging Station - Carbon',
        price: '$995.00',
        productUrl: 'https://equipment.energysage.com/ev-chargers/FH-1-STA-X5-HI5C-FL1',
        subtitle: 'You may be eligible for rebates!',
    },
    {
        image_url:
            'https://edge.disstg.commercecloud.salesforce.com/dw/image/v2/BDDP_STG/on/demandware.static/-/Sites-masterCatalog/default/Products/I-CHARGFLEX-01-HARD-WIRE-V1.jpg',
        model_name: 'ChargePoint Home Flex - Hardwired',
        price: '$540.00',
        productUrl: 'https://equipment.energysage.com/ev-chargers/CPH50-HARDWIRE-L23',
        subtitle: 'You may be eligible for rebates!',
    },
]);

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

if ($prism) {
    /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
    const compSource = await import('@energysage/es-ds-components/components/es-carousel.vue?raw');
    const docSource = await import('./carousel.vue?raw');
    /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

    compCode.value = $prism.normalizeCode(compSource.default);
    docCode.value = $prism.normalizeCode(docSource.default);
    $prism.highlight();
}

const propTableRows = [
    [
        'autoscroll',
        'Boolean',
        'false',
        'Whether to automatically scroll the carousel. When true, the carousel will scroll every 3 seconds.',
    ],
    ['dots', 'Boolean', 'true', 'Whether to show the dots at the bottom of the carousel.'],
    [
        'items',
        'Array',
        '[]',
        'Required. The items to display in the carousel. Use the template #item to style the items.',
    ],
];
</script>

<template>
    <div>
        <h1>Carousel</h1>
        <p class="mb-500">
            Uses
            <a
                href="https://v3.primevue.org/carousel/"
                target="_blank">
                PrimeVue Carousel
            </a>
        </p>
        <h2>No dots</h2>

        <div class="my-500">
            <es-carousel
                :items="items"
                :dots="false">
                <template #item="{ item }">
                    <es-card
                        class="d-flex flex-column bg-soft-blue h-100"
                        :href="item.productUrl"
                        variant="interactive">
                        <nuxt-img
                            v-if="item.image_url"
                            alt=""
                            class="w-100 rounded product-image"
                            loading="lazy"
                            :src="item.image_url" />
                        <h3 class="flex-grow-1 font-size-300 mb-50 text-blue-900">{{ item.model_name }}</h3>
                        <div>
                            <p
                                v-if="item.price"
                                class="mb-100 mb-lg-50 text-blue-900">
                                {{ item.price }}
                            </p>
                            <p
                                v-if="item.subtitle"
                                class="mb-0 text-black font-size-50">
                                {{ item.subtitle }}
                            </p>
                        </div>
                    </es-card>
                </template>
            </es-carousel>
        </div>

        <h2>With dots</h2>

        <div class="my-500">
            <es-carousel :items="items">
                <template #item="{ item }">
                    <es-card
                        class="d-flex flex-column bg-soft-blue h-100"
                        :href="item.productUrl"
                        variant="interactive">
                        <img
                            v-if="item.image_url"
                            alt=""
                            class="w-100 rounded product-image"
                            loading="lazy"
                            :src="item.image_url" />
                        <h3 class="flex-grow-1 font-size-300 mb-50 text-blue-900">{{ item.model_name }}</h3>
                        <div>
                            <p
                                v-if="item.price"
                                class="mb-100 mb-lg-50 text-blue-900">
                                {{ item.price }}
                            </p>
                            <p
                                v-if="item.subtitle"
                                class="mb-0 text-black font-size-50">
                                {{ item.subtitle }}
                            </p>
                        </div>
                    </es-card>
                </template>
            </es-carousel>
        </div>

        <h2>With autoscroll</h2>

        <div class="my-500">
            <es-carousel
                :items="items"
                autoscroll>
                <template #item="{ item }">
                    <es-card
                        class="d-flex flex-column bg-soft-blue h-100"
                        :href="item.productUrl"
                        variant="interactive">
                        <img
                            v-if="item.image_url"
                            alt=""
                            class="w-100 rounded product-image"
                            loading="lazy"
                            :src="item.image_url" />
                        <h3 class="flex-grow-1 font-size-300 mb-50 text-blue-900">{{ item.model_name }}</h3>
                        <div>
                            <p
                                v-if="item.price"
                                class="mb-100 mb-lg-50 text-blue-900">
                                {{ item.price }}
                            </p>
                            <p
                                v-if="item.subtitle"
                                class="mb-0 text-black font-size-50">
                                {{ item.subtitle }}
                            </p>
                        </div>
                    </es-card>
                </template>
            </es-carousel>
        </div>

        <div class="mb-500">
            <h2>EsCarousel props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/src/lib-components/es-radio-button.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/radio-button.vue" />
    </div>
</template>
<style lang="scss" scoped>
.product-image {
    aspect-ratio: 1;
    margin-bottom: 0.75rem;
    object-fit: cover;
}
</style>
