
<script setup lang="ts">
import Carousel from 'primevue/carousel';

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);


defineProps({
    items: {
        type: Array,
        default: [],
        required: true,
    },
});

</script>

<template>
    <Carousel :value="items" :numVisible="3" circular :pt="{
            itemsContent: {
                style: 'overflow: hidden;',
            },
            itemsContainer: {
                class: 'd-flex',
            },
            item: {
                class: 'm-1',
            }
        }">
        <template #item="slotProps">
            <es-card :style="{ width: '400px' }" class="h-100 flex align-items-center justify-content-center">
                {{ slotProps.data }}
            </es-card>
        </template>
    </Carousel>
</template>

<style lang="scss" scoped>

</style>
