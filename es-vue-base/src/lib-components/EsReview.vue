<template>
    <div
        :id="id"
        class="review-holder p-3 p-lg-0"
        v-bind="$attrs">
        <div class="d-flex mb-2 mb-lg-3">
            <div class="d-flex flex-grow-1">
                <template v-if="isReviewOwner">
                    <b-link
                        data-testid="edit-review"
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
                <div
                    v-if="updatedComment && commentLimit"
                    class="ml-auto ml-lg-3">
                    <es-badge
                        data-testid="badge-test"
                        variant="info"
                        @click="$emit('showMore')">
                        Updated
                    </es-badge>
                </div>
                <div
                    v-if="certified && !commentLimit"
                    class="d-lg-none d-flex flex-nowrap align-items-center ml-auto font-size-sm">
                    <div class="mr-2">
                        Verified
                    </div>
                    <IconVerified
                        class="text-gray-900"
                        width="16px"
                        height="16px" />
                </div>
            </div>
        </div>
        <div class="mb-3">
            <h4
                v-if="title"
                class="title font-weight-bold text-truncate mb-2"
                data-testid="title-test">
                {{ title }}
            </h4>
            <EsViewMore
                v-if="commentLimit"
                class="comment-holder overflow-hidden"
                :content="updatedComment || comment"
                :length="commentLimit"
                @click="$emit('showMore')" />
            <template v-else>
                <template v-if="!commentLimit && updatedComment">
                    <div data-testid="both-comments">
                        <span class="d-inline-block font-weight-bolder">Updated review: </span>
                        {{ updatedComment }}
                        <div
                            class="font-size-sm mt-2">
                            <span class="d-none d-lg-inline-block">Updated on </span>
                            {{ localeDate(modified) }}
                        </div>
                        <div class="mt-2">
                            <span class="d-inline-block font-weight-bolder">Previous review: </span>
                            {{ comment }}
                        </div>
                    </div>
                </template>
                <template v-else>
                    {{ updatedComment || comment }}
                </template>
            </template>
        </div>
        <div class="d-flex flex-nowrap">
            <small class="d-flex align-items-center text-gray-800 text-nowrap details-holder">
                <span
                    class="name-holder d-inline-block text-truncate pr-1"
                    data-testid="subtext-test">
                    <span class="d-none d-lg-inline-block">{{ displayDateText }}</span>
                    {{ reviewerName }}
                </span>
                <span class="date-holder">on {{ localeDate(displayDate) }}</span>
            </small>
            <div
                v-if="certified && !response && commentLimit"
                class="d-lg-none d-flex flex-nowrap align-items-center ml-auto font-size-sm">
                <div class="mr-2">
                    Verified
                </div>
                <IconVerified
                    class="text-gray-900"
                    width="16px"
                    height="16px" />
            </div>
        </div>
        <div
            v-if="certified"
            class="d-none d-lg-flex text-gray-800 mt-2 align-items-center font-size-sm">
            <IconVerified
                class="text-gray-900 mr-2"
                width="16px"
                height="16px" />
            Verified Shopper
        </div>
        <div
            v-if="response && commentLimit"
            class="d-flex flex-nowrap align-items-center font-size-sm mt-2 mt-lg-3">
            <b-link
                data-testid="view-response"
                @click="$emit('showMore')">
                View provider response
            </b-link>
            <div
                v-if="certified"
                class="d-lg-none d-flex flex-nowrap align-items-center ml-auto text-gray-800">
                <div class="mr-2">
                    Verified
                </div>
                <IconVerified
                    class="text-gray-900"
                    width="16px"
                    height="16px" />
            </div>
        </div>
        <div
            v-if="response && !commentLimit"
            data-testid="developer-response">
            <div
                class="mt-3 d-flex flex-nowrap align-items-lg-start align-items-center">
                <b-img
                    class="rounded logo p-0 mr-2 mr-lg-3"
                    height="64px"
                    width="64px"
                    :src="developerLogo"
                    :alt="`${developerName} logo`" />
                <div>
                    <p class="font-weight-bolder m-0 mb-lg-2">
                        <span class="d-sm-inline-block">Response from </span>
                        {{ developerName }}
                    </p>
                    <div
                        class="d-none d-lg-block">
                        {{ response }}
                        <p class="font-size-sm mt-3">
                            Responded on {{ localeDate(responseDate) }}
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="d-lg-none mt-2">
                {{ response }}
                <p class="font-size-sm mt-2">
                    Responded on {{ localeDate(responseDate) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="js">
import EsRating from '@/src/lib-components/EsRating.vue';
import IconVerified from '@/src/lib-icons/verified.vue';
import IconPencil from '@/src/lib-icons/pencil.vue';
import EsViewMore from '@/src/lib-components/EsViewMore.vue';
import EsBadge from '@/src/lib-components/EsBadge.vue';
import { BLink, BImg } from 'bootstrap-vue';

export default {
    name: 'EsReview',
    components: {
        EsRating, EsViewMore, IconVerified, IconPencil, BLink, EsBadge, BImg,

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
            type: [String, Number, null],
            required: false,
            default: null,
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
            required: false,
            type: [String, Number, null],
            default: null,
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
         * Modified Date
         */
        modified: {
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
         * Also indicates whether to show the modal view of component
         */
        commentLimit: {
            default: 225,
            type: [Number, Boolean],
        },
        /**
         * Developer Response
         */
        response: {
            required: false,
            type: String,
            default: null,
        },
        /**
         * Logo of responding developer
         */
        developerLogo: {
            required: false,
            type: String,
            default: '',
        },
        /**
         * Date developer created/updated
         * their response
         */
        responseDate: {
            required: false,
            type: String,
            default: '',
        },
        /**
         * Developer name
         */
        developerName: {
            required: false,
            type: String,
            default: '',
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
        displayDate() {
            return this.updatedComment && this.commentLimit ? this.modified : this.created;
        },
        displayDateText() {
            return this.updatedComment && this.commentLimit ? 'Updated by ' : 'Posted by ';
        },
        isReviewOwner() {
            if (!this.userId || !this.reviewerId) {
                return false;
            }
            return this.userId.toString() === this.reviewerId.toString();
        },
    },
    methods: {
        localeDate(date) {
            // Displays DD/MM/YYYY
            return new Date(date).toLocaleDateString();
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.review-holder {
    .details-holder {
        max-width: 70%;
    }
}

.title {
    @include media-breakpoint-down(md) {
        font-size: $font-size-base;
    }
}

@include media-breakpoint-down(md) {
    .review-holder {
        border: 1px solid $border-color;
        border-radius: 0.75rem;
    }

    .logo {
        height: 32px;
        width: 32px;
    }
}
</style>
