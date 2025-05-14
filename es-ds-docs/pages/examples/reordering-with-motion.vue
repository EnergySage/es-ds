<script setup lang="ts">
import { motion } from 'motion-v';

const sortOptions = [
    {
        label: 'Name',
    },
    {
        label: 'Price',
    },
    {
        label: 'Rating',
    },
];

const sortFunctions = [
    (a: any, b: any) => a.name.localeCompare(b.name),
    (a: any, b: any) => a.price.localeCompare(b.price),
    (a: any, b: any) => (a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0),
];

const items = [
    {
        icon: 'light-bulb',
        name: 'September',
        rating: 5,
        price: '$20,000',
    },
    {
        icon: 'image',
        name: 'June',
        rating: 5,
        price: '$30,000',
    },
    {
        icon: 'solar',
        name: 'August',
        rating: 4.5,
        price: '$60,000',
    },
    {
        icon: 'person',
        name: 'July',
        rating: 4.5,
        price: '$50,000',
    },
    {
        icon: 'calculator',
        name: 'October',
        rating: 4,
        price: '$10,000',
    },
    {
        icon: 'shopping-bag',
        name: 'March',
        rating: 3,
        price: '$80,000',
    },
];

const currentSortIndex = ref(0);
const displayItems = computed(() => items.slice().sort(sortFunctions[currentSortIndex.value]));

const spring = {
    type: 'spring',
    damping: 20,
    stiffness: 100,
};
</script>

<template>
    <div>
        <h1>Reordering with motion</h1>
        <p>
            Uses
            <nuxt-link
                href="https://motion.dev/docs/vue"
                target="_blank">
                Motion for Vue
            </nuxt-link>
        </p>
        <p>
            This example shows how to use the
            <nuxt-link
                href="https://motion.dev/docs/vue"
                target="_blank">
                Motion for Vue
            </nuxt-link>
            library to animate a reordering of a list of items. This can be helpful as compared to an instant reorder
            to make it clearer to users what has just happened, which items stayed in place, which items moved, and
            where they moved to.
        </p>
        <p>
            Try changing the "Sort by"
            <nuxt-link to="/molecules/segmented-control">segmented control</nuxt-link>
            below to see how it looks. This particular transition animation is one of many different
            <nuxt-link
                href="https://motion.dev/docs/vue-transitions"
                target="_blank"
                >transitions</nuxt-link
            >
            available with Motion for Vue, along with many
            <nuxt-link
                href="https://examples.motion.dev/vue"
                target="_blank"
                >different types of motion</nuxt-link
            >
            supported.
        </p>

        <div class="align-items-start align-items-sm-center d-flex flex-column flex-sm-row mb-200 mt-300">
            <p class="font-size-75 font-weight-bold mb-50 mb-sm-0 mr-50">Sort by:</p>
            <es-segmented-control
                v-model="currentSortIndex"
                label="Sort by"
                :options="sortOptions" />
        </div>

        <div>
            <motion.div
                v-for="item in displayItems"
                :key="item.name"
                class="align-items-center bg-gray-100 d-flex justify-content-between mb-100 px-100 px-md-200 py-100 py-md-150 rounded-lg"
                layout
                :transition="spring">
                <div class="align-items-center d-flex">
                    <icon-calculator
                        v-if="item.icon === 'calculator'"
                        height="48px"
                        width="48px" />
                    <icon-image
                        v-if="item.icon === 'image'"
                        height="48px"
                        width="48px" />
                    <icon-light-bulb
                        v-if="item.icon === 'light-bulb'"
                        height="48px"
                        width="48px" />
                    <icon-person
                        v-if="item.icon === 'person'"
                        height="48px"
                        width="48px" />
                    <icon-shopping-bag
                        v-if="item.icon === 'shopping-bag'"
                        height="48px"
                        width="48px" />
                    <icon-solar
                        v-if="item.icon === 'solar'"
                        height="48px"
                        width="48px" />
                    <div class="ml-100">
                        <h4 class="mb-0">{{ item.name }}</h4>
                        <es-rating :rating="item.rating" />
                    </div>
                </div>
                <div class="post3 mb-0">
                    {{ item.price }}
                </div>
            </motion.div>
        </div>
    </div>
</template>
