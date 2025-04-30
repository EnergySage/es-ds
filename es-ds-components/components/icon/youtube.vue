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
        <g
            fill-rule="evenodd"
            clip-rule="evenodd"
            fill="currentColor">
            <path
                d="m13.93 19.226 5.601-3.055-5.602-3.362v6.519z"
                style="stroke-width: 1.1513"
                transform="translate(-.068 -.068)" />
            <path
                d="M16.068.28a15.789 15.789 0 1 0 0 31.577 15.789 15.789 0 0 0 0-31.578zm10.798 14.872v1.934a18.336 18.336 0 0 1-.407 4.076c0 .508-.305.916-.61 1.222-.41.408-.918.61-1.428.714-1.018.305-2.75.508-6.417.508h-1.63c-8.761 0-8.862-.305-9.78-1.018l-.203-.204-.713-1.019a17.827 17.827 0 0 1-.408-4.38V15.05c0-1.427.103-2.751.408-4.075.102-.51.306-.917.713-1.223.306-.407.814-.61 1.324-.713 1.02-.305 2.852-.508 6.418-.508h1.63c8.76 0 8.862.305 9.78 1.017l.203.204c.305.306.61.714.713 1.122a17.822 17.822 0 0 1 .305 4.278z"
                style="stroke-width: 1.1513"
                transform="translate(-.068 -.068)" />
        </g>
    </svg>
</template>
