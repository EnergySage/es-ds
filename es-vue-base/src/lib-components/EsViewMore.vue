<template>
    <div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="bodyContent" />
        <es-button
            v-if="isTruncated"
            inline
            variant="link"
            class="ml-50 p-0"
            @click="click">
            {{ buttonText }}
        </es-button>
    </div>
</template>

<script lang="js">
import truncate from 'html-truncate';
import EsButton from './EsButton.vue';

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
            default: 'Show more',
        },
        /**
         * Text for button to hide text
         */
        less: {
            type: String,
            required: false,
            default: 'Show less',
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
