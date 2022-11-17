<template>
    <!-- eslint-disable vue/no-v-html -->
    <div class="prism">
        <pre
            class="line-numbers"
            :class="`language-${lang}`">
            <code
                class="match-braces"
                :data-source="source"
                v-html="code" />
        </pre>
    </div>
</template>

<script>
export default {
    name: 'CodeBlock',
    props: {
        lang: {
            type: String,
            default: 'javascript',
        },
        code: {
            type: String,
            required: false,
            default: '',
        },
        source: {
            type: String,
            required: false,
            default: '',
        },
    },
};
</script>
