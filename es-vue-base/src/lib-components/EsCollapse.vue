<template>
    <div>
        <EsButton
            block
            :aria-expanded="expanded.toString()"
            :aria-controls="id"
            class="collapse-holder pb-100 p-0 text-left font-weight-bold text-black d-flex align-items-center justify-content-between text-decoration-none text-body"
            inline
            variant="link"
            @click="userSpecifiedIsExpanded = !expanded">
            <div>
                <slot name="title" />
            </div>
            <div>
                <IconChevronDown
                    :class="{
                        svg: true,
                        chevronExpanded: expanded,
                    }"
                    width="30px"
                    height="30px" />
            </div>
        </EsButton>

        <b-collapse
            :id="id"
            v-model="expanded"
            data-testid="collapse"
            v-on="$listeners">
            <slot />
        </b-collapse>

        <div
            v-if="border"
            :class="{
                'border-bottom': true,
                'bottom-spacer': true,
                expanded: expanded,
            }" />
    </div>
</template>

<script lang="js">
import { BCollapse } from 'bootstrap-vue';
import IconChevronDown from '../lib-icons/icon-chevron-down.vue';
import EsButton from './EsButton.vue';

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
         * Suggested open/closed state. Will be ignored if and when the user interacts with the collapse.
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
            userSpecifiedIsExpanded: null,
            visibleCopied: this.visible,
        };
    },
    computed: {
        expanded: {
            get() {
                if (this.userSpecifiedIsExpanded !== null) {
                    return this.userSpecifiedIsExpanded;
                }
                return this.visibleCopied;
            },
            set() {
                // noop
            },
        },
    },
};
</script>
<style lang="scss" scoped>
.svg {
    transition: transform .5s ease;
}

.chevronExpanded {
    transform: rotate(180deg);
}

.bottom-spacer {
    padding-top: 2rem;

    &.expanded {
        padding-top: 3rem;
    }
}
</style>
