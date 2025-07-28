<script setup>
definePageMeta({
    layout: 'navigation',
});
</script>

<template>
    <h1>Navigation</h1>
    <p>
        Extended from
        <nuxt-link
            href="https://v3.primevue.org/megamenu/"
            target="_blank">
            PrimeVue Megamenu
        </nuxt-link>
    </p>
    <p>The nav bar is a specialized component intended for use outside the normal content container. See above.</p>

    <p
        v-for="index in 10"
        :key="index"
        class="my-800">
        Sample content to increase page length; for testing the sticky nav bar.
    </p>
</template>
