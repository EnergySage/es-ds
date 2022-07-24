<template>
    <div
        v-bind="$attrs"
        v-on="$listeners">
        <EsButton
            block
            :aria-label="id"
            class="collapse-holder text-left p-0 font-weight-bold text-black d-flex align-items-center justify-content-between text-decoration-none text-body"
            variant="link"
            @click="toggleCollapsed">
            <div>
                <slot name="title" />
            </div>
            <div>
                <ArrowExpandIcon
                    v-if="isCollapsed"
                    width="30px"
                    height="30px" />

                <ArrowCollapseIcon
                    v-else
                    width="30px"
                    height="30px" />
            </div>
        </EsButton>

        <b-collapse
            :id="id"
            :aria-labelledby="id"
            role="tabpanel"
            :visible="isCollapsed">
            <div class="pb-5">
                <slot />
            </div>
        </b-collapse>

        <div class="border-bottom" />
    </div>
</template>

<script lang="js">
import {
    BCollapse,
} from 'bootstrap-vue';
import EsButton from '@/src/lib-components/EsButton.vue';
import ArrowCollapseIcon from '@/src/lib-components/icons/chevron-down.vue';
import ArrowExpandIcon from '@/src/lib-components/icons/chevron-up.vue';

export default {
    name: 'EsCollapse',
    components: {
        EsButton, BCollapse, ArrowCollapseIcon, ArrowExpandIcon,
    },
    props: {
        /**
         * ID
         * (optional, defaults to 'myId')
         */
        id: {
            type: String,
            required: true,
        },
        /**
         * Open
         * Start open/closed
         */
        open: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            isCollapsed: this.open,
        };
    },
    methods: {
        toggleCollapsed() {
            this.isCollapsed = !this.isCollapsed;
        },
    },
};
</script>
