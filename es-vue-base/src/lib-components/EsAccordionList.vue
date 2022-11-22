<template>
    <div
        class="rounded"
        role="tablist">
        <slot />
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    name: 'EsAccordionList',
    /**
     * Provide the below items to children EsAccordion components that listen for them via inject.
     * Make expandedIds reactive as per https://vuejs.org/guide/components/provide-inject.html#working-with-reactivity.
     */
    provide() {
        return {
            expandedIds: computed(() => this.expandedIds),
            parent: this,
        };
    },
    props: {
    /**
     * True if we should allow multiple items to be expanded simultaneously,
     * false if we should only allow one (default accordion behavior).
     */
        allowMultipleExpand: {
            type: Boolean,
            default: false,
        },
        /**
         * The id of the accordion that should be expanded initially, if any.
         */
        initialExpandedId: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            expandedIds: this.initialExpandedId ? [this.initialExpandedId] : [],
        };
    },
    /**
     * Listen for @accordion-toggle event from children EsAccordion components.
     * They will inject the 'parent' object this component provides and call this.parent.$emit('accordion-toggle').
     */
    created() {
        this.$on('accordion-toggle', (id) => {
            const indexOfId = this.expandedIds.indexOf(id);
            if (indexOfId > -1) {
                // if id is expanded, remove it from array
                this.expandedIds.splice(indexOfId, 1);
            } else {
                // if id is not expanded, add it to the array
                // if we don't allow multiple expand, make sure it's the only item in the new array
                this.expandedIds = this.allowMultipleExpand
                    ? [...this.expandedIds, id]
                    : [id];
            }
        });
    },
};
</script>

<style></style>
