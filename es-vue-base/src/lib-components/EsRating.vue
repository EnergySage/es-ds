<template>
    <b-form-rating
        v-model="localRating"
        :aria-valuenow="localRating"
        v-bind="$attrs"
        :readonly="readOnly"
        no-border
        inline
        data-testid="rating-test"
        v-on="$listeners">
        <template #icon-empty>
            <StarEmptyIcon
                :width="width"
                :height="height" />
        </template>
        <template #icon-half>
            <StarHalfIcon
                :width="width"
                :height="height" />
        </template>
        <template #icon-full>
            <StarFullIcon
                :width="width"
                :height="height" />
        </template>
    </b-form-rating>
</template>

<script lang="js">
import { BFormRating } from 'bootstrap-vue';
import StarFullIcon from '@/src/lib-components/icons/star-full.vue';
import StarEmptyIcon from '@/src/lib-components/icons/star-empty.vue';
import StarHalfIcon from '@/src/lib-components/icons/star-half.vue';

export default {
    name: 'EsRating',
    components: {
        BFormRating,
        StarFullIcon,
        StarEmptyIcon,
        StarHalfIcon,
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
@import '~assets/scss/includes';

.b-rating {
    background: transparent;
    box-shadow: none;
    height: auto;
    padding: 0;

    .b-rating-star:first-child {
        padding-left: 0;
    }

    :focus {
        background: transparent !important;
    }
}
</style>
