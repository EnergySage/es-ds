<script setup>
definePageMeta({
    layout: 'nav-search',
});

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');
const searchText = ref('');
const searchResultsText = ref('');

const results = ref({ hits: null, numResults: 0, numPages: 0, currentPage: 0 });

const compSource = await import('@energysage/es-ds-components/components/es-nav-bar.vue?raw');
const compSourceText = compSource.default;

// eslint-disable-next-line import/no-self-import
const docSource = await import('./nav-bar.vue?raw');

const scriptRegex = /\/\/ CUSTOM GLOBAL-NAV SCRIPT STARTS([\s\S]+)\/\/ CUSTOM GLOBAL-NAV SCRIPT ENDS/;
const navScriptSource = ref([...compSourceText.match(scriptRegex)[0]].join(''));

const searchButtonClicked = async () => {
    const searchResults = await search(searchText.value, results.value.currentPage);
    results.value.hits = searchResults.results;
    results.value.numResults = searchResults.numResults;
    results.value.numPages = searchResults.numPages;
    searchResultsText.value = searchText.value;
    /* eslint-disable-next-line no-console */
};

const changePage = (page) => {
    results.value.currentPage = page;
    searchButtonClicked();
}

const mockSearch = () => {
    searchText.value = 'best solar panels';
    searchButtonClicked();
};

onMounted(async () => {
    if ($prism) {
        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <h1>EsSearchBar</h1>
    <p>The search bar component can be used in the nav bar or standalone.</p>

    <div class="my-300">
        <es-search-bar
            v-bind="$attrs"
            v-model="searchText"
            @searchButtonClicked="searchButtonClicked">
        </es-search-bar>
    </div>
    <h2>Search results:</h2>
    <p v-if="searchResultsText !== ''">
        <strong>{{ results.numResults }}</strong> result{{ results.numResults !== 1 ? 's' : '' }} for "{{ searchResultsText }}"
    </p>
    <es-button
        v-if="searchResultsText !== '' && results.numResults === 0"
        inline
        variant="link"
        @click="mockSearch">
        Click to search for best solar panels
    </es-button>
    <hr />
    <b-row class="my-300">
        <b-col
            v-for="result in results.hits"
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
        <div class="d-flex align-items-center w-100 justify-content-center" v-if="results.numResults > 0">
            <es-button variant="link" @click="changePage(results.currentPage - 1)" :disabled="results.currentPage === 0"><icon-chevron-left /></es-button>
            <p class="m-0">{{ results.currentPage + 1 }} of {{ results.numPages }}</p>
            <es-button variant="link" @click="changePage(results.currentPage + 1)" :disabled="results.currentPage === results.numPages - 1"><icon-chevron-right /></es-button>
        </div>

    </b-row>

    <!-- print out EsNavBar's mounted() script here so the rip-the-nav utility can access it -->
    <!-- eslint-disable vue/no-v-html -->
    <pre
        class="d-none"
        v-html="navScriptSource" />
    <!-- eslint-enable vue/no-v-html -->

    <ds-doc-source
        :comp-code="compCode"
        comp-source="es-ds-components/components/es-search-bar.vue"
        :doc-code="docCode"
        doc-source="es-ds-docs/pages/organisms/nav-bar-search.vue" />
</template>
