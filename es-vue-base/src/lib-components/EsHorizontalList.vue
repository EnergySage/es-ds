<template>
    <flickity
        :ref="id"
        :options="flickityOptions"
        @init="onInit">
        <slot />
    </flickity>
</template>

<script lang="js">
import Flickity from 'vue-flickity';

export default {
    name: 'EsHorizontalList',
    components: {
        Flickity,
    },
    props: {
        /**
         * Unique ID of the list
         */
        id: {
            type: String,
            required: true,
        },
        /**
         * Show dots under or not
         */
        dots: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Cell aligmment
        */
        align: {
            type: String,
            required: false,
            default: 'left',
            validator: (val) => ['center', 'left', 'right'].includes(val),
        },
    },
    data() {
        return {
            flickityOptions: {
                prevNextButtons: false,
                pageDots: this.dots,
                cellAlign: this.align,
            },
        };
    },
    methods: {
        onInit() {
            // On click of a slide scroll to that slide
            this.$refs[this.id].on('staticClick', (event, pointer, cellElement, cellIndex) => {
                if (typeof cellIndex === 'number') {
                    this.$refs[this.id].selectCell(cellIndex);
                }
            });
        },
    },
};
</script>
<style lang="scss">
@import '~@energysage/es-bs-extends/scss/includes';

.flickity-page-dots {
    .dot {
        background-color: $gray-400;
        height: 12px;
        opacity: 1;
        width: 12px;

        &.is-selected {
           background-color: $primary;
        }
    }
}
</style>
