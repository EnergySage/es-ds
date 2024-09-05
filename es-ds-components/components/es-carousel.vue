<script setup lang="ts">
import Carousel from 'primevue/carousel';

const responsiveOptions = ref([
    {
        // xl: 1200px
        breakpoint: '1199px',
        numVisible: 4,
        numScroll: 1,
    },
    {
        // lg: 992px
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 1,
    },
    {
        // md: 768px
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
    },
    {
        // sm: 576px
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
    },
]);

const props = defineProps({
    autoscroll: {
        type: Boolean,
        default: false,
    },
    dots: {
        type: Boolean,
        default: true,
    },
    items: {
        type: Array,
        default: () => [],
        required: true,
    },
});

const autoplayInterval = ref(props.autoscroll ? 3000 : 0);
const key = ref('');

const stopAutoplay = () => {
    if (props.autoscroll) {
        autoplayInterval.value = 0;
        key.value = 'stopAutoplay';
    }
};

onMounted(() => {
    document.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
            // Stop carousel when user presses Escape key, in lieu of pause button
            // https://www.w3.org/WAI/WCAG22/Techniques/general/G187.html
            stopAutoplay();
        }
    });
});
</script>

<template>
    <carousel
        :key="key"
        :autoplay-interval="autoplayInterval"
        circular
        :num-visible="4"
        :responsive-options="responsiveOptions"
        :show-indicators="dots"
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
                class: 'p-carousel-item p-1',
            },
            itemCloned: {
                class: 'p-carousel-item p-1',
            },
            previousButton: {
                style: 'border: unset; background: unset; color: #64748b;',
            },
            nextButton: {
                style: 'border: unset; background: unset; color: #64748b;',
            },
        }">
        <template #item="item">
            <slot
                name="item"
                :item="item.data" />
        </template>
    </carousel>
</template>

<style lang="scss" scoped>
@use '@energysage/es-ds-styles/scss/variables' as variables;
@use '@energysage/es-ds-styles/scss/mixins/breakpoints' as breakpoints;

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

:deep(.dot) {
    list-style-type: none;

    &[data-p-highlight='true'] button {
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
