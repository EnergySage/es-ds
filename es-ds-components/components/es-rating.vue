<script setup lang="ts">
import Rating from 'primevue/rating';

interface IProps {
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

const model = defineModel<number>();
model.value = props.rating;

// Rounds to nearest .5
const round = (value: number) => (value ? Math.round(value * 2) / 2 : 0);
const localRating = computed(() => (props.rounded ? round(model.value as number) : model.value || 0));

const showFocus = ref(false);
</script>

<template>
    <div
        v-if="readOnly"
        :aria-label="`${localRating} out of 5 stars`"
        class="bg-transparent rounded-0 text-orange rating">
        <div
            v-for="i in 5"
            :key="i"
            aria-hidden="true">
            <span v-if="i <= localRating">
                <icon-star-full
                    :width="width"
                    :height="height" />
            </span>
            <span v-else-if="i - 0.5 === localRating">
                <icon-star-half
                    :width="width"
                    :height="height" />
            </span>
            <span v-else>
                <icon-star-empty
                    :width="width"
                    :height="height" />
            </span>
        </div>
    </div>
    <div v-else>
        <rating
            v-model="model"
            :cancel="false"
            :readonly="readOnly"
            v-bind="$attrs"
            :pt="{
                root: {
                    class: 'bg-transparent rounded-0 text-orange rating reactive',
                },
                item: (options) => {
                    return {
                        class: [
                            {
                                reactiveStar: true,
                                focused: options.context.focused,
                            },
                        ],
                    };
                },
            }"
            @focus="showFocus = true"
            @blur="showFocus = false">
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
    </div>
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
    transition: all 0.15s ease-in-out;

    &:hover {
        transform: scale(1.5);
    }
    &.focused {
        transform: scale(1.5);
    }
}
</style>
