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
                    v-if="isCollapsed"
                    width="30px"
                    height="30px" />

                <IconChevronUp
                    v-else
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
                class="pb-5">
                <slot />
            </div>
        </b-collapse>

        <div class="border-bottom" />
    </div>
</template>

<script lang="js">
import { BCollapse } from 'bootstrap-vue';
import EsButton from '@/src/lib-components/EsButton.vue';
import IconChevronUp from '@/src/lib-components/icons/chevron-down.vue';
import IconChevronDown from '@/src/lib-components/icons/chevron-up.vue';

export default {
    name: 'EsCollapse',
    components: {
        EsButton, BCollapse, IconChevronUp, IconChevronDown,
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
         * Visible
         * Start open/closed
         */
        visible: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            isCollapsed: this.visible,
        };
    },
};
</script>
