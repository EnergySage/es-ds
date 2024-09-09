<script setup lang="ts">
import Rating from 'primevue/rating';

const props = defineProps({
    /**
     * Starting rating
     * 0-5; Avg will show half icons rounded down
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
     * Icon Width
     */
    width: {
        type: String,
        default: '20px',
        required: false,
    },
    /**
     * Icon Height
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

const localRating = ref(props.rating);

const roundedRating = computed(() => {
    if (!props.rounded) {
        return localRating.value;
    }
    // Rounds to nearest .5
    return Math.round(localRating.value * 2) / 2;
});

const update = (value: number) => {
    localRating.value = value;
};
</script>

<template>
    <div
        v-if="readOnly"
        role="slider"
        aria-valuemin="1"
        aria-valuemax="5"
        :aria-valuenow="roundedRating"
        class="bg-transparent rounded-0 text-orange rating">
        <div
            v-for="i in 5"
            :key="i">
            <span
                v-if="i <= roundedRating"
                data-testid="rating-test">
                <icon-star-full
                    :width="width"
                    :height="height" />
            </span>
            <span
                v-else-if="i - 0.5 === roundedRating"
                data-testid="rating-test">
                <icon-star-half
                    :width="width"
                    :height="height" />
            </span>
            <span
                v-else
                data-testid="rating-test">
                <icon-star-empty
                    :width="width"
                    :height="height" />
            </span>
        </div>
    </div>
    <rating
        v-else
        role="slider"
        aria-valuemin="1"
        aria-valuemax="5"
        :aria-valuenow="roundedRating"
        :model-value="roundedRating"
        :cancel="false"
        :readonly="readOnly"
        v-bind="$attrs"
        data-testid="rating-test"
        :pt="{
            root: {
                class: 'bg-transparent rounded-0 text-orange rating reactive',
            },
            item: {
                class: 'reactiveStar',
            },
        }"
        @update:model-value="update">
        <template #officon>
            <icon-star-empty
                :width="width"
                :height="height" />
        </template>
        <template #onicon>
            <icon-star-full
                :width="width"
                :height="height" />
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
.reactiveStar:hover,
.reactiveStar[data-p-focused='true'] {
    transform: scale(1.5);
}
</style>
