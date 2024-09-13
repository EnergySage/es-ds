<script setup lang="ts">
const items = ref([
    {
        image_url: 'https://loremflickr.com/200/200?random=1',
        breed: 'Manx',
        age: 'Kitten',
        url: 'https://www.petfinder.com/search/cats-for-adoption/',
        subtitle: 'Adopt me!',
    },
    {
        image_url: 'https://loremflickr.com/200/200?random=2',
        breed: 'Maine Coon',
        age: 'Kitten',
        url: 'https://www.petfinder.com/search/cats-for-adoption/',
        subtitle: 'Adopt me!',
    },
    {
        image_url: 'https://loremflickr.com/200/200?random=3',
        breed: 'Ragamuffin',
        age: 'Adult',
        url: 'https://www.petfinder.com/search/cats-for-adoption/',
        subtitle: 'Adopt me!',
    },
    {
        image_url: 'https://loremflickr.com/200/200?random=4',
        breed: 'Ragdoll',
        age: 'Senior',
        url: 'https://www.petfinder.com/search/cats-for-adoption/',
        subtitle: 'Adopt me!',
    },
    {
        image_url: 'https://loremflickr.com/200/200?random=5',
        breed: 'Sphynx',
        age: 'Senior',
        url: 'https://www.petfinder.com/search/cats-for-adoption/',
        subtitle: 'Adopt me!',
    },
]);

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
                        :href="item.url"
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
                                v-if="item.age"
                                class="mb-100 mb-lg-50 text-blue-900">
                                {{ item.age }}
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
                        :href="item.url"
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
                                v-if="item.age"
                                class="mb-100 mb-lg-50 text-blue-900">
                                {{ item.age }}
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
                        :href="item.url"
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
                                v-if="item.age"
                                class="mb-100 mb-lg-50 text-blue-900">
                                {{ item.age }}
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
