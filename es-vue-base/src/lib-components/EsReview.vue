<template>
    <div
        :id="id"
        class="review-holder mr-3 mr-lg-5 p-3 p-lg-0"
        v-bind="$attrs">
        <div class="d-flex mb-2">
            <div class="d-flex flex-grow-1">
                <template v-if="isReviewOwner">
                    <b-link
                        class="d-flex"
                        @click="$emit('editReview', id)">
                        <EsRating
                            :rating="rating"
                            :read-only="readOnly" />
                        <IconPencil
                            class="ml-1"
                            width="20px"
                            height="20px" />
                    </b-link>
                </template>
                <template v-else>
                    <EsRating
                        :rating="rating"
                        :read-only="readOnly" />
                </template>
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
        <div class="mb-3">
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
                :content="updatedComment || comment"
                :length="commentLimit"
                @click="$emit('showMore')" />
            <template v-else>
                {{ updatedComment || comment }}
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
import IconPencil from '@/src/lib-icons/pencil.vue';
import EsViewMore from '@/src/lib-components/EsViewMore.vue';
import { BLink } from 'bootstrap-vue';

export default {
    name: 'EsReview',
    components: {
        EsRating, EsViewMore, IconVerified, IconPencil, BLink,
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
         * Current user id
         */
        userId: {
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
         * User id of user left the review
         */
        reviewerId: {
            required: true,
            type: [String, Number],
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
         * Updated Comment
         *
         * Used in es-cdgm when a user changes
         * their original comment this field reflects
         * the updated comment and comment
         * retains the original.
         */
        updatedComment: {
            required: false,
            type: String,
            default: '',
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
        isReviewOwner() {
            return this.userId.toString() === this.reviewerId.toString();
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
        height: auto;
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
