<script setup lang="ts">
interface IProps {
    id: string;
    rating?: number;
    readOnly?: boolean;
    width?: string;
    height?: string;
    rounded?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
    rating: 0,
    readOnly: true,
    width: '20px',
    height: '20px',
    rounded: true, // Round rating to nearest .5
});

const model = defineModel<number>()
model.value = props.rating;

// Rounds to nearest .5
const round = (value: number) => value ? Math.round(value * 2) / 2 : 0;
const localRating = computed(() => props.rounded ? round(model.value as number) : model.value || 0);

// v-for index is non-deterministic, better to set it here
const ratingStars = [0,0,0,0,0].map((star, index) => {
    if (localRating.value >= index + 1) {
        return {
            fill: 1,
            index: index + 1,
        };
    }
    if (star >= 0) {
        return {
            fill: 0.5,
            index: index + 1,
        }
    }
    return {
        fill: 0,
        index: index + 1,
    };
});
</script>

<template>
    <div
        class="b-rating form-control align-items-center bg-transparent rounded-0 text-orange d-inline-flex border-0">
        <span
            v-for="star in ratingStars"
            :key="star.index"
            tabindex="-1"
            class="b-rating-star flex-grow-1 focused"
            :class="{
                'b-rating-star-empty': star.fill === 0,
                'b-rating-star-half': star.fill === .5,
                'b-rating-star-full': star.fill === 1,
            }">
            <label :for="`star-input-${star.index}`">
                <span class="b-rating-icon">
                    <icon-star-full
                        focusable="false"
                        aria-hidden="true"
                        :width="props.width"
                        :height="props.height" />
                    <span class="sr-only">{{ star.index }} Star</span>
                </span>
                <input
                    id="`star-input-${star.index}`"
                    class="sr-only"
                    type="radio"
                    value="{{ star.index }}" />
            </label>
        </span>
    </div>
</template>
