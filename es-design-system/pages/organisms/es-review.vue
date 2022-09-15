<template>
    <div>
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
            :visible="reviewsModalVisible"
            developer-name="Test Dev"
            @hidden="reviewsModalVisible = false"
            @createReview="createReview"
            @editReview="editReview" />
        <es-horizontal-list
            id="reviews"
            class="mb-5">
            <es-review
                v-for="review in reviews"
                :id="review.id"
                :key="review.id"
                :user-id="1"
                class="review-wrapper"
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
        </es-horizontal-list>
    </div>
</template>
<script>
import {
    EsReview, EsHorizontalList, EsButton, EsReviewModal,
} from '@energysage/es-vue-base';

export default {
    name: 'EsReviewDocs',
    components: {
        EsReview,
        EsHorizontalList,
        EsButton,
        EsReviewModal,
    },
    data() {
        return {
            reviewsModalVisible: false,
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
                    reviewer_name: 'Ryan Residential Really Long Name',
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
                }, {
                    id: 10,
                    reviewer_name: 'shrt',
                    reviewer_id: 4,
                    certified: true,
                    created: '2022-06-03T18:26:46.588897Z',
                    rating: 4,
                    title: 'Test',
                    comment: '123',
                    updated_comment: '',
                }, {
                    id: 15,
                    reviewer_name: 'test',
                    reviewer_id: 5,
                    certified: false,
                    created: '2022-06-09T14:10:30.290508Z',
                    rating: 5,
                    title: 'test',
                    comment: 'Comment',
                    updated_comment: 'Updated comment',
                }, {
                    id: 13,
                    reviewer_name: 'testers',
                    reviewer_id: 6,
                    certified: false,
                    created: '2022-06-09T14:05:08.901091Z',
                    rating: 5,
                    title: '',
                    comment: '',
                },
            ],
        };
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
    width: 450px;
}

@include media-breakpoint-down(md) {
    .review-wrapper {
        width: 325px;
    }
}
</style>
