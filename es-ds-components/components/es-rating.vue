<script setup lang="ts">
import Rating from 'primevue/rating';

const props = defineProps({
    /**
     * Starting rating
     * 0-5; Avg will show half icons rounded down in read only mode
     */
    rating: {
        type: Number,
        default: 0,
        validator: (num: number) => num >= 0 && num <= 5,
    },
    /**
     * Disable changing the rating
     */
    readOnly: {
        type: Boolean,
        default: true,
    },
    /**
     * Icon width
     */
    width: {
        type: String,
        default: '20px',
        required: false,
    },
    /**
     * Icon height
     */
    height: {
        type: String,
        default: '20px',
        required: false,
    },
    /**
     * Round rating to nearest .5
     */
    rounded: {
        type: Boolean,
        default: true,
        required: false,
    },
});

const model = defineModel<number>()
model.value = props.rating;

// Rounds to nearest .5
const round = (value: number) => value ? Math.round(value * 2) / 2 : 0;
const localRating = computed(() => props.rounded ? round(model.value as number) : model.value || 0);
</script>

<template>
    <div
        v-if="props.readOnly"
        :aria-label="`${localRating} out of 5 stars`"
        class="bg-transparent rounded-0 text-orange rating">
        <div
            v-for="i in 5"
            :key="i"
            aria-hidden="true">
            <span v-if="i <= localRating">
                <icon-star-full
                    :width="props.width"
                    :height="props.height" />
            </span>
            <span v-else-if="i - 0.5 === localRating">
                <icon-star-half
                    :width="props.width"
                    :height="props.height" />
            </span>
            <span v-else>
                <icon-star-empty
                    :width="props.width"
                    :height="props.height" />
            </span>
        </div>
    </div>
    <rating
        v-else
        v-model="model"
        :cancel="false"
        :readonly="props.readOnly"
        v-bind="$attrs"
        :pt="{
            root: {
                class: 'bg-transparent rounded-0 text-orange rating reactive',
            },
            item: {
                class: 'reactiveStar',
            },
        }">
        <template #officon>
            <icon-star-empty
                :width="props.width"
                :height="props.height" />
        </template>
        <template #onicon>
            <icon-star-full
                :width="props.width"
                :height="props.height" />
        </template>
    </rating>
</template>

<style lang="scss">
.rating {
    height: auto !important;
    width: auto;
    padding: 0 !important;
    align-items: center !important;
    justify-content: center;
    display: inline-flex !important;
    text-align: center;
    width: auto;
    display: inline-flex !important;
    outline: 0;
}
.reactive {
    cursor: pointer !important;
}

.reactiveStar {
    &:hover,
    &[data-p-focused='true'] {
        transform: scale(1.5);
    }
}
</style>
