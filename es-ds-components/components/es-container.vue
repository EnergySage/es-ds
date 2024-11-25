<script setup lang="ts">
interface IProps {
    fluid?: boolean;
}
const props = withDefaults(defineProps<IProps>(), {
    fluid: false,
});
</script>

<template>
    <div :class="props.fluid ? 'container-fluid' : 'container'">
        <slot />
    </div>
</template>
