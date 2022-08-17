<template>
    <div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="bodyContent" />
        <EsButton
            v-if="isTruncated"
            variant="link"
            class="p-0"
            @click="click">
            {{ buttonText }}
        </EsButton>
    </div>
</template>

<script lang="js">

import EsButton from '@/src/lib-components/molecules/EsButton.vue';
import truncate from 'html-truncate';

export default {
    name: 'EsViewMore',
    components: {
        EsButton,
    },
    props: {
        /**
         * Content of the button
         */
        content: {
            type: String,
            required: true,
        },
        /**
         * Maximum character length of text before it is truncated
         */
        length: {
            type: Number,
            required: true,
        },
        /**
         * Text for button to show more text
         */
        clamp: {
            type: String,
            required: false,
            default: 'Show More',
        },
        /**
         * Text for button to hide text
         */
        less: {
            type: String,
            required: false,
            default: 'Show Less',
        },
    },
    data() {
        return {
            isClamped: true,
        };
    },
    computed: {
        bodyContent() {
            if (this.isClamped) {
                return this.truncatedContent;
            }
            return this.content;
        },
        truncatedContent() {
            return truncate(this.content, this.length);
        },
        isTruncated() {
            return this.truncatedContent !== this.content;
        },
        buttonText() {
            return this.isClamped ? this.clamp : this.less;
        },
    },
    methods: {
        click() {
            if (this.$listeners && this.$listeners.click) {
                /**
                     * click event.
                     *
                     * @event click
                */
                this.$emit('click');
            } else {
                this.isClamped = !this.isClamped;
            }
        },
    },
};
</script>
