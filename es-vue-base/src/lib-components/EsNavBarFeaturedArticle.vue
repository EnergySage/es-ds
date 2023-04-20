<template>
    <div class="dropdown-cta-right">
        <div class="font-size-50">
            <a
                class="d-block cta-link"
                :href="link"
                :title="name">
                <nav-energy-tips
                    width="253px"
                    height="190px"
                    class="featured-article-image mb-100 w-100" />
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
import NavEnergyTips from '../lib-assets/nav-energy-tips.vue';

export default {
    name: 'EsNavBarFeaturedArticle',
    components: {
        NavEnergyTips,
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
        name: {
            type: String,
            required: true,
        },
    },
};
</script>
