<template>
    <component
        :is="tag"
        class="es-card"
        :class="{ [variant]: true}"
        v-bind="$attrs">
        <slot />
    </component>
</template>

<script lang="js">
export default {
    name: 'EsCard',
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        variant: {
            type: String,
            default: 'display',
            required: false,
        },
    },
};
</script>
