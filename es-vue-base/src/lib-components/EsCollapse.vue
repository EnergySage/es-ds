<template>
    <div>
        <EsButton
            v-b-toggle="id"
            block
            class="collapse-holder pb-100 p-0 text-left font-weight-bold text-black d-flex align-items-center justify-content-between text-decoration-none text-body"
            inline
            variant="link">
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
            :visible="visible"
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
import { BCollapse, VBToggle } from 'bootstrap-vue';
import IconChevronDown from '../lib-icons/icon-chevron-down.vue';
import EsButton from './EsButton.vue';

export default {
    name: 'EsCollapse',
    components: {
        EsButton, BCollapse, IconChevronDown,
    },
    directives: {
        'b-toggle': VBToggle,
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
            userMutatedCollapse: false,
            expanded: this.visible,
        };
    },
    watch: {
        visible: {
            handler(newValue, oldValue) {
                console.log(`viiiisible changed to ${newValue}`);
                if (!this.userMutatedCollapse) {
                    console.log('User did not mutate collapse');
                    if (newValue !== this.expanded) {
                        console.log('Toggling');
                        this.$root.$emit('bv::toggle::collapse', this.id);
                    }
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.$root.$on('bv::collapse::state', (collapseId, isExpanded) => {
            if (collapseId === this.id) {
                console.log(`Matching collapse event: collapseId=${collapseId}, isExpanded=${isExpanded}`);
                if (isExpanded !== this.visible) {
                    console.log('Setting userMutatedCollapse to true');
                    this.userMutatedCollapse = true;
                }
                this.expanded = isExpanded;
            }
        });
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
