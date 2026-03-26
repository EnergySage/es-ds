<script setup lang="ts">
const LOREM_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Risus in hendrerit gravida rutrum. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Mi tempus imperdiet nulla malesuada pellentesque elit.';

const samplePageContent = Array(10).fill(LOREM_TEXT);

definePageMeta({
    layout: 'sticky-bar',
});
</script>

<template>
    <div>
        <h1>Sticky bar</h1>
        <p>
            The sticky bar is intended for use with navigation bars. When scrolling down, it will automatically disappear as soon as you scroll past the height of the nav bar itself. It will come back when you scroll up slightly.
        </p>
        <p v-for="(content, index) in samplePageContent" :key="index" class="my-400">
            {{ content }}
        </p>
    </div>
</template>
