
<script setup lang="ts">
import Carousel from 'primevue/carousel';

const responsiveOptions = ref([
// (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px)
    {
        breakpoint: '1199px',
        numVisible: 5,
        numScroll: 1
    },
    {
        breakpoint: '991px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '0px',
        numVisible: 1,
        numScroll: 1
    }
]);


const props = defineProps({
    autoscroll: {
        type: Boolean,
        default: false,
    },
    background: {
        type: Boolean,
        default: true,
    },
    dots: {
        type: Boolean,
        default: true,
    },
    items: {
        type: Array,
        default: [],
        required: true,
    },
});

</script>

<template>
    <Carousel
        :autoplayInterval="props.autoscroll ? 3000 : 0"
        circular
        :responsiveOptions="responsiveOptions"
        :showIndicators="dots"
        :value="items"
        :pt="{
            container: {
                class: 'd-flex',
            },
            indicator: {
                class: 'dot',
            },
            indicators: {
                class: 'd-flex justify-content-center',
                style: 'gap: 12px;',
            },
            itemsContent: {
                class: 'w-100 overflow-hidden',
            },
            itemsContainer: {
                class: 'd-flex',
            },
            item: {
                class: 'p-carousel-item m-1',
            },
            itemCloned: {
                class: 'p-carousel-item m-1',
            },
            previousButton: {
                style: 'border: unset; background: unset; color: #64748b;',
            },
            nextButton: {
                style: 'border: unset; background: unset; color: #64748b;',
            },
        }">
        <template #item="slotProps">
            <es-card >
                {{ slotProps.data }}
            </es-card>
        </template>
    </Carousel>
</template>

<style lang="scss" scoped>
@use "@energysage/es-ds-styles/scss/variables" as variables;
@use "@energysage/es-ds-styles/scss/mixins/breakpoints" as breakpoints;

:deep(.p-carousel-item) {
    flex: 1 0 100%;
}

@include breakpoints.media-breakpoint-up(sm) {
    :deep(.p-carousel-item) {
        flex: 1 0 calc(100% / 2);
    }
}

@include breakpoints.media-breakpoint-up(md) {
    :deep(.p-carousel-item) {
        flex: 1 0 calc(100% / 3);
    }
}

@include breakpoints.media-breakpoint-up(lg) {
    :deep(.p-carousel-item) {
        flex: 1 0 calc(100% / 4);
    }
}

@include breakpoints.media-breakpoint-up(xl) {
    :deep(.p-carousel-item) {
        flex: 1 0 calc(100% / 5);
    }
}

:deep(.dot) {
    list-style-type: none;

    &[data-p-highlight="true"] button {
        background-color: variables.$orange-800;
    }

    button {
        background-color: variables.$gray-100;
        border: none;
        border-radius: 50%;
        height: 0.875rem;
        width: 0.875rem;

        &:hover {
            opacity: 0.8;
        }
    }
}

</style>
