<template>
    <es-modal
        id="reviewsModal"
        hide-footer
        :visible="visible"
        body-class="pt-0 pt-lg-200"
        size="xl"
        @hidden="$emit('hidden')">
        <template #modal-title>
            {{ developerName }} Reviews
        </template>
        <b-container
            fluid
            class="modal-container">
            <b-row>
                <b-col
                    class="p-0 pr-lg-200"
                    cols="12"
                    md="8"
                    order="2"
                    order-lg="1">
                    <es-review
                        v-for="review in reviews"
                        :id="review.id"
                        :key="review.id"
                        :reviewer-id="review.reviewer_id"
                        :user-id="userId"
                        class="mb-200"
                        :report-flag-visible="review.report_flag_visible"
                        :comment-limit="false"
                        :reviewer-name="review.reviewer_name"
                        :certified="review.certified"
                        :rating="review.rating"
                        :title="review.title"
                        :updated-comment="review.updated_comment"
                        :comment="review.comment"
                        :created="new Date(review.created)"
                        :modified="review.modified ? new Date(review.modified) : null"
                        :developer-name="developerName"
                        :response="review.developer_response ? review.developer_response.response_text : null"
                        :developer-logo="review.developer_response ? review.developer_response.developer_logo : null"
                        :response-date="review.developer_response ?
                            new Date(review.developer_response.modified) : null"
                        @editReview="$emit('editReview', review.id)"
                        @reportReview="$emit('reportReview', review.id)" />
                </b-col>
                <b-col
                    class="p-0 position-sticky sticky-mobile-col top-0"
                    cols="12"
                    md="4"
                    order="1"
                    order-lg="2">
                    <div class="position-sticky top-0">
                        <h2 class="d-flex align-items-end">
                            {{ avgReviewFormatted }}
                            <es-rating
                                width="32px"
                                height="32px"
                                class="mx-50"
                                :rating="avgRating" />
                            <span class="font-size-base font-weight-normal align-self-center">({{ reviews.length }})</span>
                        </h2>
                        <es-button
                            class="mt-lg-100 mb-100"
                            variant="dark"
                            @click="$emit('createReview')">
                            Write a review
                        </es-button>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </es-modal>
</template>
<script>
import { BContainer, BRow, BCol } from 'bootstrap-vue';
import EsButton from './EsButton.vue';
import EsModal from './EsModal.vue';
import EsRating from './EsRating.vue';
import EsReview from './EsReview.vue';

export default {
    name: 'EsReviewModal',
    components: {
        EsButton,
        EsModal,
        EsRating,
        EsReview,
        BContainer,
        BRow,
        BCol,
    },
    props: {
        /**
         * Reviews Array
         * See EsReview for expected schema
         */
        reviews: {
            type: Array,
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
         * Average review score
         */
        avgRating: {
            type: Number,
            required: true,
        },
        /**
         * Developer Name
         */
        developerName: {
            type: String,
            required: true,
        },
        /**
         * Show modal
         */
        visible: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        avgReviewFormatted() {
            return parseFloat(this.avgRating).toFixed(1);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';
// TODO: Should be in es-bs-base
.top-0 {
    top: 0;
}

.modal-container {
    padding-left: 15px !important;
    padding-right: 15px !important;
}

.font-size-base {
    font-size: $font-size-base;
}

.sticky-mobile-col {
    background: $modal-content-bg;
    z-index: $zindex-sticky;
}
</style>
