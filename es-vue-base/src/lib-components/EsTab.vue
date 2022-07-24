<template>
    <b-tab
        class="mt-3"
        :title="title">
        <slot />
    </b-tab>
</template>

<script lang="js">
import { BTab } from 'bootstrap-vue';

export default {
    name: 'EsTab',
    components: {
        BTab,
    },
    props: {
        /**
         * title
         */
        title: {
            type: String,
            default: 'Title',
        },
    },
};
</script>
