<script setup lang="ts">
const LOREM_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Risus in hendrerit gravida rutrum. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Mi tempus imperdiet nulla malesuada pellentesque elit.';

const samplePageContent = Array(10).fill(LOREM_TEXT);
</script>

<template>
    <div>
        <h1>Sticky bar</h1>
        <es-sticky-bar>
            <es-container>
                <p class="py-100 py-lg-200 mb-0">
                    test content
                </p>
            </es-container>
        </es-sticky-bar>
        <p v-for="(content, index) in samplePageContent" :key="index" class="my-400">
            {{ content }}
        </p>
    </div>
</template>
