<template>
    <!-- 0.001 is a hacky fix because aria-valuenow="0" does not work. -->
    <b-form-rating
        class="bg-transparent rounded-0 text-orange"
        v-bind="$attrs"
        :value="roundedRating || 0.001"
        :readonly="readOnly"
        no-border
        inline
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
import IconStarFull from '../lib-icons/icon-star-full.vue';
import IconStarEmpty from '../lib-icons/icon-star-empty.vue';
import IconStarHalf from '../lib-icons/icon-star-half.vue';

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
        /**
         * Round rating to nearest .5
         */
        rounded: {
            type: Boolean,
            default: true,
            required: false,
        },
    },
    data() {
        return {
            localRating: this.rating,
        };
    },
    computed: {
        roundedRating() {
            if (!this.rounded) {
                return this.localRating;
            }
            // Rounds to nearest .5
            return Math.round(this.localRating * 2) / 2;
        },
    },
};
</script>

<style lang="scss">
.b-rating {
    height: auto !important;
    padding: 0 !important;

    .b-rating-star {
        padding: 0 0.1em;

        &:first-child {
            padding-left: 0;
        }
    }
}
</style>
