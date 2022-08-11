<template>
    <div>
        <EsButton
            block
            :aria-label="id"
            class="collapse-holder text-left p-0 mb-3 font-weight-bold text-black d-flex align-items-center justify-content-between text-decoration-none text-body"
            variant="link"
            @click="isCollapsed = !isCollapsed">
            <div>
                <slot name="title" />
            </div>
            <div>
                <IconChevronDown
                    :class="{
                        svg: true,
                        collapsed: isCollapsed,
                    }"
                    width="30px"
                    height="30px" />
            </div>
        </EsButton>

        <b-collapse
            :id="id"
            :visible="isCollapsed"
            :aria-labelledby="id"
            role="tabpanel"
            data-testid="collapse"
            v-on="$listeners">
            <div
                class="pb-3 pb-lg-4 mb-lg-2">
                <slot />
            </div>
        </b-collapse>

        <div
            v-if="border"
            class="border-bottom" />
    </div>
</template>

<script lang="js">
import { BCollapse } from 'bootstrap-vue';
import EsButton from '@/src/lib-components/EsButton.vue';
import IconChevronDown from '@/src/lib-icons/chevron-down.vue';

export default {
    name: 'EsCollapse',
    components: {
        EsButton, BCollapse, IconChevronDown,
    },
    props: {
        /**
         * ID
         */
        id: {
            type: String,
            required: true,
        },
        /**
         * Visible
         * Start open/closed
         */
        visible: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Border
         * Show the border or not
         */
        border: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            isCollapsed: this.visible,
        };
    },
};
</script>
<style lang="scss" scoped>
.svg {
    transition: transform .5s ease;
}

.collapsed {
    transform: rotate(180deg);
}
</style>
