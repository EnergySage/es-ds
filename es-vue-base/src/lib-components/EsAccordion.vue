<template>
    <div
        class="EsAccordion border-bottom border-light"
        :class="{
            ['EsAccordion--' + accordionVariant]: true,
            'rounded-bottom': accordionVariant === 'default',
        }">
        <header
            role="tab"
            class="position-relative">
            <component
                :is="headingTag"
                class="EsAccordion-heading mb-0 align-items-center d-flex font-weight-bold justify-content-between py-100 rounded-0 text-body text-body font-size-100 font-size-lg-300"
                :class="{
                    'bg-gray-200': isVisible && accordionVariant === 'default',
                    'bg-white': !isVisible && accordionVariant === 'default',
                    'EsAccordion-heading--visible': isVisible,
                    'px-100 px-sm-200': accordionVariant === 'default',
                    'px-0': accordionVariant === 'minimal',
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
                class="EsAccordion-content pb-25 pt-100"
                :class="{
                    'bg-white px-100 px-sm-200': accordionVariant === 'default',
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
         * A reference to the parent EsAccordionList so we can set styling variant directly in all children.
         */
        accordionVariant: {
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
        transition: $transition-base;
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
    border-top-width: 1px;
    border-top-style: solid;
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
