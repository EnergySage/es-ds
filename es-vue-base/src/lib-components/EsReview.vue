<template>
    <div
        :id="id"
        class="review-holder mr-3 mr-lg-5 p-3 p-lg-0"
        v-bind="$attrs">
        <div class="d-flex mb-2">
            <div class="d-flex flex-grow-1">
                <EsRating
                    :rating="rating"
                    :read-only="readOnly" />
            </div>
            <div
                v-if="certified"
                class="d-flex d-lg-none text-gray-800 align-items-center">
                Verified
                <IconVerified
                    class="text-gray-900 ml-1"
                    width="20px"
                    height="20px" />
            </div>
        </div>
        <div class="mb-2">
            <div class="title-holder mb-2">
                <h4
                    v-if="title"
                    class="font-weight-bold text-truncate"
                    data-testid="title-test">
                    {{ title }}
                </h4>
            </div>
            <EsViewMore
                v-if="commentLimit"
                class="comment-holder overflow-hidden"
                :content="comment"
                :length="commentLimit"
                @click="$emit('showMore')" />
            <template v-else>
                {{ comment }}
            </template>
        </div>
        <small class="d-flex align-items-center text-gray-800 text-nowrap">
            <div class="flex-grow-1 overflow-hidden">
                <div
                    class="d-flex align-items-center"
                    data-testid="subtext-test">
                    <span class="name-holder d-inline-block text-truncate pr-1">
                        <span class="d-none d-lg-inline-block">Posted by</span>
                        {{ reviewerName }}
                    </span>
                    <span class="date-holder d-inline-block">on {{ formattedDate }}</span>
                </div>
            </div>
            <div
                v-if="certified"
                class="d-none d-lg-block flex-grow-2 text-right ml-3">
                <IconVerified
                    class="text-gray-900"
                    width="16px"
                    height="16px" />
                Verified Shopper
            </div>
        </small>
    </div>
</template>

<script lang="js">
import EsRating from '@/src/lib-components/EsRating.vue';
import IconVerified from '@/src/lib-icons/verified.vue';
import EsViewMore from '@/src/lib-components/EsViewMore.vue';

export default {
    name: 'EsReview',
    components: {
        EsRating, EsViewMore, IconVerified,
    },
    props: {
        /**
         * ID
         */
        id: {
            type: [String, Number],
            required: true,
        },
        /**
         * Reviewer Name
         */
        reviewerName: {
            required: true,
            type: String,
        },
        /**
         * Certified
         */
        certified: {
            default: false,
            type: Boolean,
        },
        /**
         * Created Date
         */
        created: {
            default: () => new Date(),
            type: Date,
        },
        /**
         * Rating
         */
        rating: {
            required: true,
            type: Number,
            validator: (num) => num >= 0 && num <= 5,
        },
        /**
         * Review Title
         */
        title: {
            default: '',
            type: String,
        },
        /**
         * Review Comment
         */
        comment: {
            required: true,
            type: String,
        },
        /**
         * Review Comment Truncation Limit
         */
        commentLimit: {
            default: 225,
            type: [Number, Boolean],
        },
        /**
         * Disable changing the rating
         */
        readOnly: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        formattedDate() {
            // Displays DD/MM/YYYY
            return new Date(this.created).toLocaleDateString();
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.review-holder {
    .name-holder {
        max-width: 90%;
    }

    .title-holder {
        height: 20px;
    }

    .comment-holder {
        height: 121px;
    }
}

@include media-breakpoint-down(md) {
    .review-holder {
        border: 1px solid $border-color;
        border-radius: 0.75rem;

        .comment-holder {
            height: 165px;
        }
    }
}
</style>
