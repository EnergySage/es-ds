<script setup lang="ts">
const props = defineProps({
    inline: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <form
        :class="{ 'form-inline': props.inline }"
        v-bind="$attrs">
        <slot />
    </form>
</template>

<style lang="scss">
.form-inline {
    align-items: center;
    display: flex;
    flex-flow: row wrap;

    &.input-wrapper {
        justify-content: unset !important;
        display: flex;
        flex: 0 0 100%;
    }

    &.input-wrapper label {
        flex: 0 0 30%;
    }

    &.input-wrapper .input-holder {
        flex: 0 0 70%;
    }
}
</style>
