<template>
    <div
        :id="id"
        class="review-holder p-100 p-lg-0"
        v-bind="$attrs">
        <div class="d-flex mb-50 mb-lg-100">
            <div class="d-flex flex-grow-1">
                <EsRating
                    :rating="rating"
                    :read-only="readOnly" />
                <template v-if="isReviewOwner">
                    <b-link
                        data-testid="edit-review"
                        class="d-flex"
                        @click="$emit('editReview', id)">
                        <IconPencil
                            class="ml-25"
                            width="20px"
                            height="20px" />
                    </b-link>
                </template>
                <template v-if="reportFlagVisible">
                    <b-link
                        data-testid="report-review"
                        class="d-flex"
                        @click="$emit('reportReview', id)">
                        <IconFlag
                            class="ml-1"
                            width="20px"
                            height="20px" />
                    </b-link>
                </template>
                <div
                    v-if="updatedComment && commentLimit"
                    class="ml-auto ml-lg-100">
                    <es-badge
                        data-testid="badge-test"
                        variant="info"
                        @click="$emit('showMore')">
                        Updated
                    </es-badge>
                </div>
                <div
                    v-if="certified && !commentLimit"
                    class="d-lg-none d-flex flex-nowrap align-items-center ml-auto font-size-75">
                    <div class="mr-50">
                        Verified
                    </div>
                    <IconVerified
                        class="text-gray-900"
                        width="16px"
                        height="16px" />
                </div>
            </div>
        </div>
        <div class="mb-100">
            <h4
                v-if="title"
                class="title font-weight-bold text-truncate mb-50"
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
                            v-if="modified"
                            class="font-size-75 text-gray-700 mt-50">
                            <span class="d-none d-lg-inline-block">Updated on </span>
                            {{ localeDate(modified) }}
                        </div>
                        <div class="mt-50">
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
            <small
                v-if="displayDate"
                class="d-flex align-items-center text-gray-700 text-nowrap details-holder">
                <span
                    class="name-holder d-inline-block text-truncate pr-25"
                    data-testid="subtext-test">
                    <span class="d-none d-lg-inline-block">{{ displayDateText }}</span>
                    {{ reviewerName }}
                </span>
                <span class="date-holder">on {{ localeDate(displayDate) }}</span>
            </small>
            <div
                v-if="certified && !response && commentLimit"
                class="d-lg-none d-flex flex-nowrap align-items-center ml-auto font-size-75">
                <div class="mr-50">
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
            class="d-none d-lg-flex text-gray-800 mt-50 align-items-center font-size-75">
            <IconVerified
                class="text-gray-900 mr-50"
                width="16px"
                height="16px" />
            Verified Shopper
        </div>
        <div
            v-if="response && commentLimit"
            class="d-flex flex-nowrap align-items-center font-size-75 mt-50 mt-lg-100">
            <b-link
                data-testid="view-response"
                @click="$emit('showMore')">
                View provider response
            </b-link>
            <div
                v-if="certified"
                class="d-lg-none d-flex flex-nowrap align-items-center ml-auto text-gray-800">
                <div class="mr-50">
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
            <b-row class="mt-100">
                <b-col
                    cols="12"
                    lg="1"
                    class="dev-logo-holder">
                    <b-row
                        align-v="center"
                        class="">
                        <b-col
                            v-if="developerLogo"
                            cols="2"
                            lg="12"
                            class="pr-0">
                            <b-img
                                class="rounded"
                                fluid
                                :src="developerLogo"
                                :alt="`${developerName} logo`" />
                        </b-col>
                        <b-col
                            :cols="developerLogo ? 10 : 12"
                            lg="12"
                            class="d-lg-none">
                            <span class="font-weight-bolder text-gray-900 m-0 mb-lg-50">
                                Response from {{ developerName }}
                            </span>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col
                    cols="12"
                    :lg="developerLogo ? 11 : 12"
                    class="pt-lg-0 pt-50 pl-lg-100">
                    <p class="d-none d-lg-block font-weight-bolder text-gray-900 m-0 mb-lg-50">
                        Response from {{ developerName }}
                    </p>
                    {{ response }}
                    <p class="font-size-75 text-gray-700 m-0 mt-50 mt-lg-100">
                        Responded on {{ localeDate(responseDate) }}
                    </p>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script lang="js">
import { BLink, BImg } from 'bootstrap-vue';
import IconVerified from '../lib-icons/icon-verified.vue';
import IconPencil from '../lib-icons/icon-pencil.vue';
import IconFlag from '../lib-icons/icon-flag.vue';
import EsRating from './EsRating.vue';
import EsViewMore from './EsViewMore.vue';
import EsBadge from './EsBadge.vue';

export default {
    name: 'EsReview',
    components: {
        EsRating, EsViewMore, IconVerified, IconPencil, IconFlag, BLink, EsBadge, BImg,

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
            default: null,
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
            type: Date,
            default: null,
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
         * Whether we want to show the report flag
         */
        reportFlagVisible: {
            required: false,
            type: Boolean,
            default: false,
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
            return (this.updatedComment && this.commentLimit) ? this.modified || null : this.created;
        },
        displayDateText() {
            if (this.updatedComment && this.commentLimit) {
                if (this.modified) {
                    return 'Updated by ';
                }
                return '';
            }
            return 'Posted by ';
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
            if (date) {
                // Displays DD/MM/YYYY
                return new Date(date).toLocaleDateString();
            }
            return '';
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

.dev-logo-holder {
    max-width: 300px;
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
}
</style>
