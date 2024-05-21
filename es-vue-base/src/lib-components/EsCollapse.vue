<template>
    <div>
        <EsButton
            block
            :aria-expanded="expanded.toString()"
            :aria-controls="id"
            class="rounded-0 collapse-holder pb-0 p-0 text-left font-weight-bold text-black d-flex align-items-center justify-content-between text-decoration-none text-body"
            :class="{'border-top': border}"
            inline
            variant="link"
            @click="userClick">
            <div class="pt-100 pb-100">
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
            :class="{
                'border-bottom': border,
                'pb-100': (expanded && !border), // should match title-slot top-padding
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
    model: {
        prop: 'visible',
        event: 'userClick',
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
         * isProgrammaticUntilUserInput
         * Prioritize the visible prop over the user's interaction with the collapse.
         */
        isProgrammaticUntilUserInput: {
            type: Boolean,
            required: false,
            default: true,
        },
        border: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            userSpecifiedIsExpanded: null,
            isExpanded: null, // We use a second variable to track the expanded state so that we only emit the toggled
            // event when the user interacts with the collapse.
        };
    },
    computed: {
        expanded: {
            get() {
                if (this.isProgrammaticUntilUserInput && this.userSpecifiedIsExpanded !== null) {
                    return this.userSpecifiedIsExpanded;
                }
                return this.visible;
            },
            set() {
                // noop
            },
        },
    },
    watch: {
        userSpecifiedIsExpanded(newValue) {
            this.isExpanded = newValue;
            this.$emit('toggled', newValue);
        },
        visible(newValue) {
            if (!this.isProgrammaticUntilUserInput) {
                this.isExpanded = newValue;
            }
        },
    },
    methods: {
        userClick() {
            this.userSpecifiedIsExpanded = !this.expanded;
            this.$emit('userClick', !this.expanded);
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

// .bottom-spacer {
//     padding-top: 2rem;

//     &.expanded {
//         padding-top: 3rem;
//     }
// }
</style>
