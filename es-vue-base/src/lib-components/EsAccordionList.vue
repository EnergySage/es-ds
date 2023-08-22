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
            variant: this.variant,
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
         * Do not use at the same time as v-model.
         */
        initialExpandedId: {
            type: String,
            default: '',
        },
        /**
         * If v-model is used, this will contain a two-way binding to the id of the accordion that is expanded, if any.
         */
        value: {
            type: String,
            default: '',
        },
        /**
         * Used for styling purposes. At this time only two options are allowed: default and minimal.
         */
        variant: {
            type: String,
            validator: (value) => ['default', 'minimal'].includes(value),
            default: 'default',
        },
    },
    data() {
        return {
            // will take either prop as initial value, but value (from v-model) will supersede if present
            expandedIds: (this.value || this.initialExpandedId) ? [this.value || this.initialExpandedId] : [],
        };
    },
    watch: {
        /**
         * If the v-model value changes, update the internal state.
         */
        value(newValue) {
            this.toggleId(newValue);
        },
        /**
         * If the list of expanded ids changes, fire the input event in case v-model is present.
         * Assume only one id can be expanded at a time.
         * @emits input
         */
        expandedIds(newValue) {
            this.$emit('input', newValue.length ? newValue[0] : '');
        },
    },
    /**
     * Listen for @accordion-toggle event from children EsAccordion components.
     * They will inject the 'parent' object this component provides and call this.parent.$emit('accordion-toggle').
     * @emits input
     */
    created() {
        this.$on('accordion-toggle', (id) => {
            if (this.value) {
                // if we're using v-model, fire the input event and
                // have the change come via the value watch function
                this.$emit('input', id);
            } else {
                // if we're not using v-model, toggle the id directly
                this.toggleId(id);
            }
        });
    },
    methods: {
        toggleId(id) {
            if (!id) return;

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
        },
    },
};
</script>
