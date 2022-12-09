<template>
    <div>
        <div class="my-5">
            <es-button
                size="sm"
                class="mb-3"
                variant="dark"
                @click="reviewsModalVisible = true">
                View All Reviews
            </es-button>
            <es-review-modal
                :reviews="reviews"
                :avg-rating="3.5"
                :user-id="1"
                :visible="reviewsModalVisible"
                developer-name="Test Dev"
                @hidden="reviewsModalVisible = false"
                @createReview="createReview"
                @editReview="editReview" />

            <div class="review-list d-lg-flex my-5">
                <div
                    v-for="(review, index) in reviews"
                    :key="review.id"
                    class="review-wrapper pr-lg-5 mr-lg-4 mb-3 mb-lg-0">
                    <es-review
                        :id="review.id"
                        :user-id="userIds[index]"
                        :reviewer-name="review.reviewer_name"
                        :reviewer-id="review.reviewer_id"
                        :certified="review.certified"
                        :created="new Date(review.created)"
                        :rating="review.rating"
                        :title="review.title"
                        :comment="review.comment"
                        :updated-comment="review.updated_comment"
                        @showMore="reviewsModalVisible = true"
                        @editReview="editReview" />
                </div>
            </div>
        </div>
        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-review-list.vue" />
    </div>
</template>
<script>
import {
    EsReview, EsButton, EsReviewModal,
} from '@energysage/es-vue-base';

export default {
    name: 'EsReviewDocs',
    components: {
        EsReview,
        EsButton,
        EsReviewModal,
    },
    data() {
        return {
            reviewsModalVisible: false,
            userIds: ['1', 1, null, undefined, 33, '55'],
            reviews: [
                {
                    id: 16,
                    reviewer_name: 'Ryan Dev',
                    reviewer_id: 1,
                    certified: false,
                    created: '2022-06-10T14:48:56.604194Z',
                    rating: 5,
                    title: 'Really Really Long Title Really Really Long Title',
                    comment: 'shrt',
                }, {
                    id: 11,
                    reviewer_name: 'Ryan Residential Super Duper Really Long Name',
                    reviewer_id: 2,
                    certified: true,
                    created: '2022-06-03T18:27:41.718753Z',
                    rating: 3,
                    title: 'testers',
                    comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex.
                Nullam vestibulum ex mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi
                molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum.
                Mauris vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus
                et magnis dis parturient montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus.
                Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet
                sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                Donec eleifend elit quam.`,
                }, {
                    id: 12,
                    reviewer_name: 'Ryan Smith',
                    reviewer_id: 3,
                    certified: true,
                    created: '2022-06-03T18:27:41.718753Z',
                    rating: 5,
                    title: 'My Title',
                    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut bibendum.',
                    updated_comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex.
                Nullam vestibulum ex mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi
                molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum.
                Mauris vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus
                et magnis dis parturient montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus.
                Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet
                sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                Donec eleifend elit quam.`,
                },
            ],
            docCode: '',
        };
    },
    async created() {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
        const docSource = await import('!raw-loader!./es-reviews-list.vue');
        /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

        this.docCode = this.$prism.normalizeCode(docSource.default);
        this.$prism.highlight(this);
    },
    methods: {
        createReview() {
            // eslint-disable-next-line no-alert
            alert('create review triggered');
        },
        editReview() {
            // eslint-disable-next-line no-alert
            alert('owner clicked edit!');
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.review-wrapper {
    border-right: 1px solid $border-color;
    width: 470px;

    &:last-child {
        border-right: 0;
    }
}

@include media-breakpoint-down(md) {
    .review-wrapper {
        border-right: 0;
        width: 100%;
    }
}
</style>
