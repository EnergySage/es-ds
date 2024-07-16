<template>
    <b-table-simple
        borderless
        responsive
        :striped="striped"
        :table-class="tableClass">
        <template v-if="$slots.default">
            <slot />
        </template>
        <b-tbody v-else>
            <template v-if="isSingleCol">
                <b-tr
                    v-for="(item, index) in computedItems"
                    :key="`${index}${item}`">
                    <b-td>
                        {{ item }}
                    </b-td>
                </b-tr>
            </template>
            <template v-else>
                <b-tr
                    v-for="item in computedItems"
                    :key="`${index}${item[0]}`">
                    <b-td class="col-sm-7">
                        {{ item[0] }}
                    </b-td>
                    <b-td class="col-sm-4">
                        <b>{{ item[1] }}</b>
                    </b-td>
                </b-tr>
            </template>
        </b-tbody>
    </b-table-simple>
</template>

<script lang="js">
import {
    BTableSimple, BTbody, BTr, BTd,
} from 'bootstrap-vue';

export default {
    name: 'EsDataTableSimple',
    components: {
        BTableSimple, BTbody, BTr, BTd,
    },
    props: {
        fields: {
            type: Array,
            default: null,
        },
        items: {
            type: Array,
            default: () => [],
        },
        tableClass: {
            type: [Array, String],
            default: null,
        },
        striped: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isSingleCol() {
            return !this.fields;
        },
        computedItems() {
            if (!this.items?.length && !this.$slots.default) {
                throw new Error('Neither items prop nor slot content is defined.');
            }

            if (!this.fields) {
                return this.items;
            }

            if (this.fields.length !== this.items.length) {
                throw new Error('The number of fields and items must be the same.');
            }

            // Map the fields with items.
            return this.fields.map((field, index) => [field, this.items[index]]);
        },
    },
};
</script>
