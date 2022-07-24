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

import EsButton from '@/src/lib-components/EsButton.vue';
import truncate from 'truncate-html';

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
        /**
         * Choose whether to break on word or character
         */
        break: {
            type: String,
            required: false,
            default: 'character',
            validator: (val) => ['wordCount', 'wordFit', 'character'].includes(val),
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
            switch (this.break) {
            case 'character':
                return truncate(this.content, this.length);
            case 'wordCount':
                return truncate(this.content, this.length, { byWords: true });
            case 'wordFit':
                return truncate(this.content, this.wordBreakIndex, { byWords: true });
            default:
                return this.content;
            }
        },
        isTruncated() {
            return this.truncatedContent !== this.content;
        },
        buttonText() {
            return this.isClamped ? this.clamp : this.less;
        },
        // Calculates the amount of words that can fit within this.length
        wordBreakIndex() {
            let wordCount = 0;
            let totalWordLength = 0;
            const words = this.content.split(' ');
            // Iterate through word list until we hit a value that would overflow
            // our desired character count
            words.every((word) => {
                if (word.length + totalWordLength <= this.length) {
                    totalWordLength += word.length;
                    wordCount += 1;

                    // Accounts for the space between the previous word and new word
                    if (wordCount > 1) {
                        totalWordLength += 1;
                    }
                    return true;
                }
                return false;
            });

            // Must return at least 1 word for truncation to work properly
            return Math.max(1, wordCount);
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
