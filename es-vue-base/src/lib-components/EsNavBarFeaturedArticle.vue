<template>
    <div class="dropdown-cta-right">
        <div class="font-size-50">
            <es-nav-bar-link
                class="d-block cta-link"
                :href="link"
                :target="newTab ? '_blank' : null"
                :title="name">
                <img
                    :id="graphicId"
                    class="featured-article-image mb-100 w-100"
                    :alt="imageAlt"
                    loading="lazy"
                    :src="image500">
                <div class="eyebrow font-size-50 mb-50 text-orange">
                    {{ eyebrow }}
                </div>

                <p class="font-weight-bold">
                    {{ name }}
                </p>
            </es-nav-bar-link>
        </div>
    </div>
</template>

<script lang="js">
import EsNavBarLink from './EsNavBarLink.vue';

export default {
    name: 'EsNavBarFeaturedArticle',
    components: {
        EsNavBarLink,
    },
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
