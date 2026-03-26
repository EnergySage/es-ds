<script setup lang="ts">
const LOREM_TEXT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In tellus integer feugiat scelerisque varius. Risus in hendrerit gravida rutrum. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur adipiscing. Mi tempus imperdiet nulla malesuada pellentesque elit.';

const samplePageContent = Array(4).fill(LOREM_TEXT);

definePageMeta({
    layout: 'sticky-bar',
});

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-sticky-bar.vue?raw');

        // using the stickyBar layout here instead of the doc page because that's where we're using the component
        const docSource = await import('../../layouts/stickyBar.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Sticky bar</h1>
        <p>
            The sticky bar is intended for use with site navigation. It has automatic hide and reveal behavior built in
            so it gets out of the user's way when they're trying to read the page content and comes back only when it's
            needed.
        </p>
        <p>
            It can be seen above at the top of the page where it says "test content". Try scrolling up and down the
            page to see how it behaves.
        </p>

        <h2 class="mt-300">Behavior</h2>
        <p>
            It will scroll away smoothly with the page content as the user scrolls down from the top of the page. If
            the user scrolls back up slightly, it will slide back into view, this time floating above the page content.
            If the user scrolls down again, it will slide out of view.
        </p>
        <p>
            On desktop, when scrolled to the top of the page, there is no shadow dividing the sticky bar from the rest
            of the page content. As soon as the nav bar becomes floating, there is a shadow. On mobile, there is always
            a shadow.
        </p>

        <h2 class="mt-300">Usage</h2>
        <p>
            It should be placed at the top of the page outside of any containers that are relatively or absolutely
            positioned, as it needs to be able to control its own positioning relative to the browser viewport.
        </p>
        <p>
            You can place anything inside of it and it will adapt to the height of that content. It will also detect
            any changes to its height based on responsive breakpoints or other events and adjust its own positioning
            accordingly.
        </p>

        <h2 class="mt-300">Additional sample paragraphs to test scrolling behavior</h2>
        <p
            v-for="(content, index) in samplePageContent"
            :key="index">
            {{ content }}
        </p>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-sticky-bar.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/sticky-bar.vue" />
    </div>
</template>
