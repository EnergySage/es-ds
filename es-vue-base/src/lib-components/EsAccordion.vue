<template>
    <div class="EsAccordion border-bottom border-light rounded-bottom">
        <header role="tab">
            <es-button
                class="EsAccordion-button h-auto align-items-center d-flex font-weight-bold justify-content-between px-100 px-sm-200 py-100 rounded-0 text-body text-left text-decoration-none w-100"
                :class="{
                    'bg-light': isVisible,
                    'bg-white': !isVisible,
                    'EsAccordion-button--visible': isVisible,
                }"
                variant="link"
                @click="handleClick">
                <slot name="title" />
                <icon-chevron-down class="EsAccordion-icon flex-shrink-0 ml-200" />
            </es-button>
        </header>
        <b-collapse
            :id="id"
            :visible="isVisible"
            role="tabpanel">
            <div class="EsAccordion-content bg-white px-100 px-sm-200 pb-25 pt-100">
                <slot />
            </div>
        </b-collapse>
    </div>
</template>

<script>
import { BCollapse } from 'bootstrap-vue';
import IconChevronDown from '../lib-icons/icon-chevron-down.vue';
import EsButton from './EsButton.vue';

export default {
    name: 'EsAccordion',
    components: {
        BCollapse,
        EsButton,
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
    },
    props: {
        /**
         * A unique id used to keep track of which accordion is expanded.
         */
        id: {
            type: String,
            required: true,
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
.EsAccordion-button--visible {
    .EsAccordion-icon {
      transform: rotate(180deg);
    }
}
/* first item needs rounded corners on top */
  .EsAccordion:first-child {
    .EsAccordion-button {
      border-radius: $border-radius $border-radius 0 0 !important;
    }
}
/**
 * last item needs rounded corners on bottom of the button or content,
 * depending which is visible at the bottom of the list
 */
.EsAccordion:last-child {
    .EsAccordion-button,
    .EsAccordion-content {
      border-radius: 0 0 $border-radius $border-radius !important;
    }
    /* if the last item is expanded, the button is no longer the last visible item */
    .EsAccordion-button--visible {
      border-radius: 0 !important;
    }
}
/* only animate the chevron if the user doesn't prefer reduced motion */
@media not prefers-reduced-motion {
    .EsAccordion-icon {
      transition: $transition-base;
    }
}
</style>
