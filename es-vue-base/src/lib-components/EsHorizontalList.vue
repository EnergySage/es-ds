<template>
    <VueSlickCarousel
        v-bind="settings">
        <slot />
    </VueSlickCarousel>
</template>

<script lang="js">
import VueSlickCarousel from 'vue-slick-carousel';

export default {
    name: 'EsHorizontalList',
    components: {
        VueSlickCarousel,
    },
    props: {
        /**
         * Show dots under or not
         */
        dots: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Center the items horizontally
         */
        centered: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            // https://gs-shop.github.io/vue-slick-carousel/#/api
            settings: {
                dots: this.dots,
                centerMode: this.centered,
                // These are intentionally not props as they define specific design behavior
                arrows: false,
                swipeToSlide: true,
                focusOnSelect: true,
                variableWidth: true,
                adaptiveHeight: true,
                infinite: false,
            },
        };
    },
};
</script>

<style lang="scss">
@import '~assets/scss/includes';
@import '~vue-slick-carousel/dist/vue-slick-carousel';
@import '~vue-slick-carousel/dist/vue-slick-carousel-theme';

.slick-dots li button::before {
    color: $gray-400 !important;
    font-size: 12px;
}

.slick-dots .slick-active button::before {
    color: $primary !important;
}
</style>
