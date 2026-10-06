<script setup lang="ts">
const isDarkBackgroundActive = ref(false);
const showPhosphorName = ref(false);

const docCode = ref('');
const { $prism } = useNuxtApp();
onMounted(async () => {
    if ($prism) {
        const docSource = await import('./icons.vue?raw');

        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Icons</h1>

        <p>
            The base and rating star icons are from the open-source
            <a
                href="https://phosphoricons.com/"
                target="_blank"
                >Phosphor icon library</a
            >. All others were sourced elsewhere or created by our design team.
        </p>

        <div class="d-flex flex-wrap mb-100">
            <es-toggle
                v-model="isDarkBackgroundActive"
                class="mr-300">
                <template #label> View against dark background </template>
            </es-toggle>
            <es-toggle v-model="showPhosphorName">
                <template #label> Show Phosphor icon name </template>
            </es-toggle>
        </div>

        <div class="mb-300">
            <h2 class="mt-300">Base icons</h2>
            <p>
                The default size of base icons is 24px by 24px, but you can change that by passing in
                <code>height</code> and <code>width</code> props.
            </p>
            <ds-icon-list
                :icons="BASE_ICONS"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h3 class="mt-300">Base icons not yet transitioned to Phosphor</h3>
            <p>These are candidates for removal and are the subject of active conversations on the design team.</p>
            <ds-icon-list
                :icons="BASE_ICONS_NOT_PHOSPHOR"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">Rating stars</h2>
            <p>The default size of rating star icons is 20px by 20px.</p>
            <ds-icon-list
                :icons="RATING_STAR_ICONS"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">Marketing icons</h2>
            <p>The default size of marketing icons is 32px by 32px.</p>
            <ds-icon-list
                :icons="MARKETING_ICONS"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">Social icons</h2>
            <p>The default size of social icons is 32px by 32px.</p>
            <ds-icon-list
                :icons="SOCIAL_ICONS"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
            <p>The following icons are deprecated and have been renamed.</p>
            <ds-icon-list
                :icons="DEPRECATED_SOCIAL_ICONS"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">File icons</h2>
            <p>The default size of file icons is 56px by 73px.</p>
            <ds-icon-list
                :icons="FILE_ICONS"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">State icons</h2>
            <p>The default size of state icons is 24px by 24px.</p>
            <ds-icon-list
                :icons="STATE_ICONS"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <div class="mb-300">
            <h2 class="mt-300">Video play icon</h2>
            <p>
                The default size of the video play icon is 74px by 54px. It will take the text color of its container,
                but at 50% opacity. The triangle in the middle has a hardcoded white fill.
            </p>
            <ds-icon-list
                :icons="VIDEO_PLAY_ICONS"
                :is-dark-background-active="isDarkBackgroundActive"
                :show-phosphor-name="showPhosphorName" />
        </div>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-ds-docs/atoms/icons.vue" />
    </div>
</template>
