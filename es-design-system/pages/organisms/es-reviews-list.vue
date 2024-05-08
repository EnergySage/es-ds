<template>
    <div>
        <h1>
            Reviews list
        </h1>
        <div class="my-450">
            <es-button
                size="sm"
                class="mb-100"
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
                @editReview="editReview"
                @reportReview="reportReview" />

            <b-row>
                <b-col
                    v-for="(review, index) in reviews"
                    :key="review.id"
                    cols="12"
                    lg="4"
                    class="review-col mb-100 mb-lg-0 pl-200">
                    <es-review
                        :id="review.id"
                        :user-id="userIds[index]"
                        :reviewer-name="review.reviewer_name"
                        :reviewer-id="review.reviewer_id"
                        :certified="review.certified"
                        :created="new Date(review.created)"
                        :modified="review.modified ? new Date(review.modified) : null"
                        :rating="review.rating"
                        :title="review.title"
                        :comment="review.comment"
                        :updated-comment="review.updated_comment"
                        :response="review.developer_response ? review.developer_response.response_text : null"
                        :developer-logo="review.developer_response ? review.developer_response.developer_logo : null"
                        :response-date="review.developer_response ?
                            new Date(review.developer_response.modified) : null"
                        :report-flag-visible="review.report_flag_visible"
                        @showMore="reviewsModalVisible = true"
                        @editReview="editReview"
                        @reportReview="reportReview" />
                </b-col>
            </b-row>
        </div>
        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-review-list.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsReviewDocs',
    data() {
        return {
            reviewsModalVisible: false,
            userIds: ['1', 1, null, undefined, 33, '55'],
            reviews: [
                {
                    id: 16,
                    reviewer_name: 'Ryan Dev',
                    reviewer_id: 1,
                    report_flag_visible: true,
                    certified: false,
                    created: '2022-06-10T14:48:56.604194Z',
                    rating: 5,
                    title: 'Really Really Long Title Really Really Long Title',
                    comment: 'shrt',
                }, {
                    id: 11,
                    reviewer_name: 'Ryan Residential Super Duper Really Long Name',
                    reviewer_id: 2,
                    report_flag_visible: false,
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
                    report_flag_visible: true,
                    certified: true,
                    created: '2022-06-03T18:27:41.718753Z',
                    modified: '2023-01-06T18:27:41.718753Z',
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
                    developer_response: {
                        developer: 1,
                        response_text: `Lorem impsum natoque penatibus et magnis dis parturient montes nascetur
                ridiculus mus mauris vitae ultricies leo integer malesuada nunc vel risus commodo viverra maecenas
                accumsan lacus vel facilisis volutpat est velit egestas dui id ornare arcu odio ut sem nulla pharetra
                diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis`,
                        developer_logo: 'https://rlv.zcache.com/solar_panel_square_sticker-r15c14698abcb4bedb4728ed3d40d87a1_0ugmc_8byvr_540.jpg',
                        modified: '2022-08-10T14:48:56.604194Z',
                    },
                },
            ],
            docCode: '',
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-reviews-list.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.$prism.highlight(this);
        }
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
        reportReview() {
            // eslint-disable-next-line no-alert
            alert('user clicked report!');
        },
    },
};
</script>

<style lang="scss" scoped>
@use '~@energysage/es-bs-base/scss/variables' as variables;
@use "~@energysage/es-bs-base/scss/mixins/breakpoints" as breakpoints;

.review-col {
    border-left: 1px solid variables.$border-color;

    &:first-child {
        border-left: 0;
        padding-left: 1rem !important;
    }
}

@include breakpoints.media-breakpoint-down(md) {
    .review-col {
        border-left: 0;
        padding-left: 0 !important;

        &:first-child {
            padding-left: 0 !important;
        }
    }
}
</style>
