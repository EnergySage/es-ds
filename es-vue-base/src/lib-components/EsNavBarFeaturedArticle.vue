<template>
    <div class="dropdown-cta-right">
        <div class="font-size-50">
            <a
                class="d-block cta-link"
                :href="link"
                :target="newTab ? '_blank' : null"
                :title="name">
                <img
                    :id="graphicId"
                    class="featured-article-image mb-100 w-100"
                    alt=""
                    loading="lazy"
                    :src="image500">
                <div class="eyebrow font-size-50 mb-50 text-orange">
                    {{ eyebrow }}
                </div>

                <p class="font-weight-bold">
                    {{ name }}
                </p>
            </a>
        </div>
    </div>
</template>

<script lang="js">

export default {
    name: 'EsNavBarFeaturedArticle',
    props: {
        eyebrow: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        newTab: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
        },
        image500: {
            type: String,
            required: true,
        },
    },
    computed: {
        graphicId() {
            return this.name.replace(/\s/g, '-').replace(/[^a-zA-Z]/g, '');
        },
    },
};
</script>
