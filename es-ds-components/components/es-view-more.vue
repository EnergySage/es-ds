<script setup lang="ts">
// @ts-expect-error module has no types
import truncate from 'html-truncate';

const props = defineProps({
    /**
     * Full text content
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
});

const isClamped = ref(true);

const truncatedContent = computed(() => truncate(props.content, props.length));
const isTruncated = computed(() => truncatedContent.value !== props.content);
const buttonText = computed(() => (isClamped.value ? props.clamp : props.less));
const bodyContent = computed(() => {
    if (isClamped.value) {
        return truncatedContent.value;
    }
    return props.content;
});
</script>

<template>
    <div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="bodyContent" />
        <es-button
            v-if="isTruncated"
            inline
            variant="link"
            class="ml-50 p-0"
            @click="isClamped = !isClamped">
            {{ buttonText }}
        </es-button>
    </div>
</template>
