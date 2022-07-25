<template>
    <b-form-rating
        v-bind="$attrs"
        :value="localRating"
        :readonly="readOnly"
        no-border
        inline
        :aria-valuenow="localRating"
        data-testid="rating-test"
        v-on="$listeners">
        <template #icon-empty>
            <IconStarEmpty
                :width="width"
                :height="height" />
        </template>
        <template #icon-half>
            <IconStarHalf
                :width="width"
                :height="height" />
        </template>
        <template #icon-full>
            <IconStarFull
                :width="width"
                :height="height" />
        </template>
    </b-form-rating>
</template>

<script lang="js">
import { BFormRating } from 'bootstrap-vue';
import IconStarFull from '@/src/lib-components/icons/star-full.vue';
import IconStarEmpty from '@/src/lib-components/icons/star-empty.vue';
import IconStarHalf from '@/src/lib-components/icons/star-half.vue';

export default {
    name: 'EsRating',
    components: {
        BFormRating,
        IconStarFull,
        IconStarEmpty,
        IconStarHalf,
    },
    props: {
        /**
         * Starting rating
         * 0-5; Avg will show half icons rounded down
         */
        rating: {
            type: Number,
            default: 0,
            validator: (num) => num >= 0 && num <= 5,
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
    },
    data() {
        return {
            localRating: this.rating,
        };
    },
};
</script>

<style lang="scss">
.b-rating {
    background: transparent;
    box-shadow: none !important;
    height: auto;
    padding: 0;
    max-width: 150px;

    .b-rating-star:first-child {
        padding-left: 0;
    }

    :focus {
        background: transparent !important;
    }
}
</style>
