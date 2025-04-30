<script setup lang="ts">
interface IProps {
    height?: string;
    width?: string;
}
withDefaults(defineProps<IProps>(), {
    height: '32px',
    width: '32px',
});
</script>

<template>
    <svg
        fill="none"
        :style="{
            height: height,
            width: width,
        }"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg">
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 .165a15.835 15.835 0 1 0 0 31.67 15.835 15.835 0 0 0 0-31.67ZM11.157 24.48h-3.8V13.058h3.8Zm-1.9-13.006a1.972 1.972 0 1 1 .052-3.944 1.981 1.981 0 1 1 0 3.944zm15.61 12.985H21.07v-6.108c0-1.533-.543-2.587-1.9-2.587a2.074 2.074 0 0 0-1.943 1.39 2.584 2.584 0 0 0-.133.92v6.385h-3.8s.051-10.35 0-11.401h3.8v1.625a3.801 3.801 0 0 1 3.433-1.901c2.441-.02 4.342 1.614 4.342 5.108v6.57z"
            fill="currentColor"
            style="stroke-width: 1.15468" />
    </svg>
</template>
