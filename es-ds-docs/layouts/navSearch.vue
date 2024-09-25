<script setup>
import { search } from '~/utils/algolia';

const route = useRoute();
const searchText = ref('');
const numResults = ref(0);

const accountContent = getEsNavBarAccountContent();
const globalContent = getEsNavBarGlobalContent();

const results = ref(null);

const breadcrumbs = computed(() => {
    let pathSoFar = '';
    const paths = route.path.split('/');

    // Set removes dupes from path
    return [...new Set(paths)].map((path) => {
        pathSoFar += path ? `/${path}` : '';

        let text = 'Home';
        // Convert to CamelCase to be in line with component naming
        if (path) {
            text = path.replace(/-([a-z])/g, (g) => ` ${g[1]}`);
            text = text[0].toUpperCase() + text.slice(1);
        }
        return {
            text,
            to: pathSoFar || '/',
        };
    });
});

const searchButtonClicked = async () => {
    const searchResults = await search(searchText.value);
    results.value = searchResults.results;
    numResults.value = searchResults.numResults;
    /* eslint-disable-next-line no-console */
};

function getImageUrl(imageUrl) {
    console.log(imageUrl);
    return imageUrl.startsWith('https:') ? imageUrl : `https:${imageUrl}`;
}
</script>

<template>
    <div>
        <es-nav-bar
            v-model="searchText"
            :account-content="accountContent"
            :global-content="globalContent"
            show-search
            @searchButtonClicked="searchButtonClicked">
            <template #logo>
                <ds-es-logo />
            </template>
        </es-nav-bar>
        <div class="d-flex justify-content-center">
            <div class="ds-side-nav d-none d-xl-block flex-shrink-0 p-100">
                <ds-link-list />
            </div>
            <b-container class="pt-xl-100 mx-0">
                <b-row class="mb-100">
                    <b-col cols="12">
                        <es-breadcrumbs :items="breadcrumbs" />
                    </b-col>
                </b-row>
                <b-row>
                    <b-col
                        class="mb-300"
                        cols="12">
                        <div v-if="results">
                            <h2>Search results:</h2>
                            <p><strong>{{ numResults }}</strong> result{{ numResults !== 1 ? 's' : '' }} for "{{ searchText }}"</p>
                            <hr />
                            <b-row class="my-500">
                                <b-col
                                    v-for="result in results"
                                    :key="result.name"
                                    class="mb-200"
                                    cols="6"
                                    xxl="4">
                                    <es-card
                                        class="d-flex h-100"
                                        :href="`https://www.energysage.com/${result.full_slug}`"
                                        variant="interactive">
                                        <div>
                                            <h4>{{ result.name }}</h4>
                                            <p class="mb-2">{{ result.description }}</p>
                                            <p class="mb-0">Last updated: {{ new Date(result.published_at).toLocaleDateString() }}</p>
                                        </div>
                                        <nuxt-img
                                            v-if="result.image"
                                            :alt="result.name"
                                            class="w-50 rounded pl-2"
                                            loading="lazy"
                                            :src="result.image.startsWith('https:') ? result.image : `https:${result.image}`" />
                                    </es-card>
                                </b-col>
                            </b-row>
                        </div>
                        <slot />
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>
