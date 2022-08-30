<template>
    <svg
        :style="{
            height: height,
            width: width,
        }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20">
        <mask
            id="halfFull"
            style="mask-type:alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            :width="width"
            :height="height">
            <path
                d="m10 0 2.645 6.36 6.866.55-5.231 4.48 1.598 6.7L10 14.5l-5.878 3.59 1.598-6.7L.49 6.91l6.865-.55L10 0Z"
                fill="currentColor" />
        </mask>
        <g mask="url(#halfFull)">
            <path
                d="m10 1.302 2.066 4.967a1 1 0 0 0 .843.613l5.363.43-4.086 3.5a1 1 0 0 0-.322.992l1.249 5.233-4.592-2.804a1 1 0 0 0-1.042 0l-4.592 2.804 1.249-5.233a1 1 0 0 0-.322-.992l-4.086-3.5 5.362-.43a1 1 0 0 0 .844-.613L10 1.302Z"
                fill="none"
                stroke="currentColor" />
            <path
                d="M9.905 14.22V2.504c0-.547-.752-.697-.962-.192L7.377 6.077a.5.5 0 0 1-.421.307l-5.363.43a.5.5 0 0 0-.285.878l4.085 3.5a.5.5 0 0 1 .161.496L4.306 16.92a.5.5 0 0 0 .747.543l4.613-2.818a.5.5 0 0 0 .24-.427Z"
                fill="currentColor" />
        </g>
    </svg>
</template>
<script>
export default {
    name: 'IconStarHalf',
    props: {
        /**
         * Width
         */
        width: {
            type: String,
            default: '20px',
            required: false,
        },
        /**
         * Height
         */
        height: {
            type: String,
            default: '20px',
            required: false,
        },
    },
};
</script>
