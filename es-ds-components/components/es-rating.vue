<template>
     <Rating 
        v-model="roundedRating"
        :cancel="false" 
        :readonly="readOnly"
        data-testid="rating-test"
        :pt="{
            root: { 
                class: 'bg-transparent rounded-0 text-orange rating' 
            },   
                                         // OR { class: 'text-xl' }
        }"
    >
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
    </Rating>
</template>

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

const roundedRating = computed(() => {
    if (!props.rounded) {
        return props.rating;
    }
    // Rounds to nearest .5
return Math.round(props.rating);
});  

</script>

<style lang="scss">
.rating {
    height: auto !important;
    padding: 0 !important;
    align-items: center !important;
    display: inline-flex !important;
    text-align: center;
    width: auto;
    display: inline-flex !important;
}

</style>