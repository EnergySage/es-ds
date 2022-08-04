<template>
    <div>
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
            console.log('down');
            this.isDown = true;

            const pageX = event.pageX || event.targetTouches?.[0].pageX;
            this.startPosition = pageX - scroller.offsetLeft;
            this.newPosition = scroller.scrollLeft;
        },
        dotClick(index) {
            if (this.isScrolling) return;

            const scroller = this.$refs[this.id];
            const element = this.children.item(index - 1);

            this.activeIndex = index;
            scroller.scrollLeft = element.offsetLeft;
        },
        moveEvent(event) {
            if (!this.isDown) return;
            this.isMoving = true;

            console.log('moved');
            const scroller = this.$refs[this.id];

            const pageX = event.pageX || event.targetTouches?.[0].pageX;
            const offsetX = pageX - scroller.offsetLeft;

            scroller.scrollLeft = this.newPosition - (offsetX - this.startPosition);
        },
        upEvent(event) {
            console.log('up');
            const scroller = this.$refs[this.id];

            if (!this.isMoving) {
                this.isClicked = true;

                const childIndex = Array.from(this.children).findIndex((node) => node.isEqualNode(event.target));

                this.activeIndex = childIndex + 1;
                scroller.scrollLeft = event.target.offsetLeft;
            } else {
                setTimeout(() => {
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
@import '~@energysage/es-bs-extends/scss/includes';

.horizontal-scroll-container {

    cursor: grab;
    scroll-behavior: smooth;
    scroll-snap-stop: always;
    scroll-snap-type: x mandatory;

    transform: scale(0.98);
    transition: all 0.2s;

    user-select: none;
    will-change: transform;

    &.active {
        cursor: grabbing;
        transform: scale(1);
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
            opacity: .8;
        }

        &.active {
            background-color: $primary;
        }
    }
}
</style>
