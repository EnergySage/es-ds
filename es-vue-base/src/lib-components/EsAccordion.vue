<template>
    <div
        class="es-accordion"
        :class="{
            [`es-accordion--${variant}`]: true,
            'expanded': isVisible
        }"
        role="tab">
        <header class="position-relative">
            <button
                class="es-accordion-button position-absolute w-100 h-100 border-0 bg-transparent"
                @click="handleClick">
                <span class="sr-only">{{ isVisible ? 'collapse' : 'expand' }}</span>
            </button>
            <component
                :is="headingTag"
                class="es-accordion-heading mb-0 align-items-center d-flex font-weight-bold justify-content-between py-100"
                :class="{
                    'es-accordion-heading--visible': isVisible,
                    'font-size-100 px-100 px-sm-200': variant !== 'minimal',
                    'h3 px-0': variant === 'minimal',
                }">
                <slot name="title" />
                <icon-chevron-down class="es-accordion-icon flex-shrink-0 ml-200" />
            </component>
        </header>
        <b-collapse
            :id="id"
            :visible="isVisible"
            role="tabpanel"
            tabindex="0">
            <div
                class="es-accordion-content pb-25"
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
