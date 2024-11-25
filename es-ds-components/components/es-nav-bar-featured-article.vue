<script lang="ts">
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
        imageAlt: {
            type: String,
            default: '',
        },
    },
    computed: {
        graphicId() {
            return this.name.replace(/\s/g, '-').replace(/[^a-zA-Z]/g, '');
        },
    },
};
</script>

<template>
    <div class="dropdown-cta-right">
        <es-nav-bar-link
            class="d-block cta-link text-gray-900 text-decoration-none"
            :href="link"
            :target="newTab ? '_blank' : null"
            :title="name">
            <nuxt-img
                :id="graphicId"
                class="featured-article-image mb-100 w-100 rounded"
                :alt="imageAlt"
                loading="lazy"
                :src="image500" />
            <div class="eyebrow mb-50 link-name">
                {{ eyebrow }}
            </div>

            <p class="font-weight-bold link-subheading">
                {{ name }}
            </p>
        </es-nav-bar-link>
    </div>
</template>
