<template>
    <div class="horizontal-scroll-wrapper overflow-hidden">
        <div
            :id="id"
            :ref="id"
            :class="{
                'horizontal-scroll-container': true,
                'd-flex': true,
                'overflow-hidden': true,
                'no-snap': isClicked,
                active: isMoving,
            }"
            @mousedown="downEvent"
            @touchstart="downEvent"
            @mousemove="moveEvent"
            @touchmove="moveEvent"
            @mouseup="upEvent"
            @touchend="upEvent"
            @mouseleave="leaveEvent"
            @blur="leaveEvent">
            <slot />
        </div>
        <div
            v-if="dots"
            class="dots-holder list-unstyled w-100 mt-3 text-center">
            <b-link
                v-for="index in children.length"
                :key="index"
                :class="{
                    'mx-2': true,
                    'd-inline-block': true,
                    dot: true,
                    active: index === activeIndex,
                }"
                @click="dotClick(index)" />
        </div>
    </div>
</template>

<script lang="js">
import { BLink } from 'bootstrap-vue';

export default {
    name: 'EsHorizontalList',
    components: {
        BLink,
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
    },
    data() {
        return {
            isDown: false,
            isMoving: false,
            isClicked: false,
            children: [],
            activeIndex: 1,
            indexTimeout: null,
            startPosition: null,
            newPosition: null,
        };
    },
    mounted() {
        const scroller = this.$refs[this.id];
        this.children = scroller.children;
    },
    methods: {
        downEvent(event) {
            this.isClicked = false;

            const scroller = this.$refs[this.id];
            this.isDown = true;

            // Mobile devices do not have pageX
            const pageX = event.pageX || event.targetTouches?.[0].pageX;
            this.startPosition = pageX - scroller.offsetLeft;
            this.newPosition = scroller.scrollLeft;
        },
        dotClick(index) {
            // If we are in the middle of scrolling dont trigger click
            if (this.isScrolling) return;

            const scroller = this.$refs[this.id];
            const element = this.children.item(index - 1);

            this.activeIndex = index;
            scroller.scrollLeft = element.offsetLeft;
        },
        moveEvent(event) {
            // If the mouse/touch event is not down dont scroll on mouse move
            if (!this.isDown) return;
            this.isMoving = true;

            const scroller = this.$refs[this.id];

            const pageX = event.pageX || event.targetTouches?.[0].pageX;
            const offsetX = pageX - scroller.offsetLeft;

            scroller.scrollLeft = this.newPosition - (offsetX - this.startPosition);
        },
        upEvent(event) {
            const scroller = this.$refs[this.id];
            clearTimeout(this.indexTimeout);

            // If we are not currently drag scrolling treat it as a click
            if (!this.isMoving) {
                this.isClicked = true;

                const childIndex = Array.from(this.children).findIndex((node) => node.isEqualNode(event.target));

                this.activeIndex = childIndex + 1;
                scroller.scrollLeft = event.target.offsetLeft;
            } else {
                // After drag scrolling set the new active index(last block to the left)
                this.indexTimeout = setTimeout(() => {
                    const childIndex = Array.from(this.children).findIndex((element) => {
                        const scrollerRect = scroller.getBoundingClientRect();
                        const elementRect = element.getBoundingClientRect();

                        return !(elementRect.left > scrollerRect.right || elementRect.right < scrollerRect.left);
                    });

                    this.activeIndex = childIndex + 1;
                }, 500);
            }

            this.leaveEvent();
        },
        leaveEvent() {
            this.isDown = false;
            this.isMoving = false;
        },
    },
};
</script>
<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

.horizontal-scroll-container {
    cursor: grab;
    // Hack to allow last item in list to snap to the left
    padding-right: 100vw;
    scroll-behavior: smooth;
    scroll-snap-stop: always;
    scroll-snap-type: x mandatory;

    user-select: none;
    will-change: transform;

    // TODO: Safari Desktop does not support scroll-behavior: smooth currently
    // Also has very strange behavior with the padding-right hack
    @media not all and (min-resolution: 0.001dpcm) {
        @supports (-webkit-appearance: none) {
            /* stylelint-disable-next-line scss/selector-no-redundant-nesting-selector */
            & {
                padding-right: 0;
                scroll-behavior: unset;
            }
        }
    }

    &.active {
        cursor: grabbing;
    }

    > * {
        flex: 0 0 auto;
        scroll-snap-align: start;
    }

    &.no-snap {
        scroll-snap-type: none;

        > * {
            scroll-snap-align: none;
        }
    }
}

.dots-holder {
    .dot {
        background-color: $gray-400;
        border-radius: 50%;
        height: 14px;
        width: 14px;

        &:hover {
            opacity: 0.8;
        }

        &.active {
            background-color: $primary;
        }
    }
}
</style>
