<template>
    <div>
        <h1>
            Review
        </h1>
        <div class="review-wrapper my-5 pr-5 border-right">
            <es-review
                :id="review.id"
                :key="review.id"
                user-id="3"
                :report-flag-visible="review.report_flag_visible"
                :reviewer-name="review.reviewer_name"
                :reviewer-id="review.reviewer_id"
                :certified="review.certified"
                :created="new Date(review.created)"
                :modified="review.modified ? new Date(review.modified) : null"
                :rating="review.rating"
                :title="review.title"
                :comment="review.comment"
                :updated-comment="review.updated_comment"
                :response="review.response"
                @showMore="showMore"
                @editReview="editReview"
                @reportReview="reportReview" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsReview.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/organisms/es-review.vue" />
    </div>
</template>
<script>

export default {
    name: 'EsReviewDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            review: {
                id: 12,
                reviewer_name: 'Ryan Smith',
                reviewer_id: 3,
                certified: true,
                created: '2022-06-03T18:27:41.718753Z',
                modified: '2023-01-06T18:27:41.718753Z',
                report_flag_visible: true,
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
                response: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Donec adipiscing tristique risus nec feugiat in. Est lorem ipsum
                dolor sit amet consectetur adipiscing. Eu nisl nunc mi ipsum faucibus vitae aliquet. Condimentum
                vitae sapien pellentesque habitant morbi tristique.`,
            },
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-review.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsReview.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
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
        showMore() {
            // eslint-disable-next-line no-alert
            alert('show more clicked!');
        },
    },
};
</script>
<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.review-wrapper {
    width: 470px;
}

@include media-breakpoint-down(md) {
    .review-wrapper {
        width: 100%;
    }
}
</style>
