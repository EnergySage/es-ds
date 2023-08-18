<template>
    <div
        class="EsAccordion border-bottom border-light"
        :class="{
            ['EsAccordion--' + variant]: true,
            'rounded-bottom': variant !== 'minimal',
        }">
        <header
            role="tab"
            class="position-relative">
            <component
                :is="headingTag"
                class="EsAccordion-heading mb-0 align-items-center d-flex font-weight-bold justify-content-between py-100 rounded-0 text-body text-body"
                :class="{
                    'bg-gray-200': isVisible && variant !== 'minimal',
                    'bg-white': !isVisible && variant !== 'minimal',
                    'EsAccordion-heading--visible': isVisible,
                    'font-size-100 px-100 px-sm-200': variant !== 'minimal',
                    'h3 px-0': variant === 'minimal',
                }">
                <slot name="title" />
                <icon-chevron-down class="EsAccordion-icon flex-shrink-0 ml-200" />
            </component>
            <button
                class="EsAccordion-button position-absolute w-100 h-100 border-0 bg-transparent"
                @click="handleClick">
                <span class="sr-only">{{ isVisible ? 'collapse' : 'expand' }}</span>
            </button>
        </header>
        <b-collapse
            :id="id"
            :visible="isVisible"
            role="tabpanel">
            <div
                class="EsAccordion-content pb-25"
                :class="{
                    'bg-white pt-100 px-100 px-sm-200': variant !== 'minimal',
                }">
                <slot />
            </div>
        </b-collapse>
    </div>
</template>

<script>
import { BCollapse } from 'bootstrap-vue';
import IconChevronDown from '../lib-icons/icon-chevron-down.vue';

export default {
    name: 'EsAccordion',
    components: {
        BCollapse,
        IconChevronDown,
    },
    /**
     * Receive the injected props that EsAccordionList provides.
     */
    inject: {
        /**
         * A array of ids for accordions that are expanded.
         */
        expandedIds: {
            type: Array,
            required: true,
        },
        /**
         * A reference to the parent EsAccordionList so we can emit events onto it directly.
         */
        parent: {
            type: Object,
            required: true,
        },
        /**
         * The styling variant to use.
         */
        variant: {
            type: String,
            required: true,
        },
    },
    props: {
        /**
         * A unique id used to keep track of which accordion is expanded.
         */
        id: {
            type: String,
            required: true,
        },
        headingTag: {
            type: String,
            default: 'h3',
        },
    },
    computed: {
        isVisible() {
            return this.expandedIds.includes(this.id);
        },
    },
    methods: {
        /**
         * Tell the parent EsAccordionList component (which keeps track of which
         * accordion is expanded) that this one wants to expand or collapse.
         * @event accordion-toggle
         */
        handleClick() {
            this.parent.$emit('accordion-toggle', this.id);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@energysage/es-bs-base/scss/includes';

/* rotate the chevron when expanded */
.EsAccordion-heading--visible {
    .EsAccordion-icon {
        transform: rotate(180deg);
    }
}

/* for smooth background color transition */
@media not prefers-reduced-motion {
    .EsAccordion-heading {
        /* use this instead of $transition-base so font size and padding don't animate weirdly on breakpoint change */
        transition: background-color .2s ease-in-out;
    }
}

/* first item needs rounded corners on top */
.EsAccordion--default:first-child {
    .EsAccordion-heading {
        border-radius: $border-radius $border-radius 0 0 !important;
    }
}

/* first item has border top */
.EsAccordion--minimal:first-child {
    border-top-style: solid;
    border-top-width: 1px;
}

/**
 * last item needs rounded corners on bottom of the button or content,
 * depending which is visible at the bottom of the list
 */
.EsAccordion:last-child {
    .EsAccordion-heading,
    .EsAccordion-content {
        border-radius: 0 0 $border-radius $border-radius !important;
    }
    /* if the last item is expanded, the button is no longer the last visible item */
    .EsAccordion-heading--visible {
        border-radius: 0 !important;
    }
}

/* align button to cover the heading tag */
.EsAccordion-button {
    top: 0;
}

/* only animate the chevron if the user doesn't prefer reduced motion */
@media not prefers-reduced-motion {
    .EsAccordion-icon {
        transition: $transition-base;
    }
}
</style>
