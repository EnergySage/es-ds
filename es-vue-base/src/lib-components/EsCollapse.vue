<template>
    <div>
        <EsButton
            block
            :aria-label="id"
            class="collapse-holder pb-3 p-0 text-left font-weight-bold text-black d-flex align-items-center justify-content-between text-decoration-none text-body"
            variant="link"
            @click="isExpanded = !isExpanded">
            <div>
                <slot name="title" />
            </div>
            <div>
                <IconChevronDown
                    :class="{
                        svg: true,
                        collapsed: isExpanded,
                    }"
                    width="30px"
                    height="30px" />
            </div>
        </EsButton>

        <b-collapse
            :id="id"
            :visible="isExpanded"
            :aria-labelledby="id"
            role="tabpanel"
            data-testid="collapse"
            v-on="$listeners">
            <slot />
        </b-collapse>

        <div
            v-if="border"
            :class="{
                'border-bottom': true,
                'bottom-spacer': true,
                expanded: isExpanded,
            }" />
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
            isExpanded: this.visible,
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

.bottom-spacer {
    padding-top: 2rem;

    &.expanded {
        padding-top: 3rem;
    }
}
</style>
