<template>
    <div class="align-items-center w-100 d-flex justify-content-center position-relative">
        <form
            action="/search/"
            class="d-flex align-items-center mx-auto justify-content-center w-100"
            method="get">
            <es-form-input
                aria-label="Search bar"
                class="w-50"
                id="searchBar"
                label-sr-only
                name="query"
                :placeholder="placeholder"
                :value="searchText"
                v-model="searchText"
                @keydown.enter="checkSearchText">
                <template #prefixIcon>
                    <icon-search />
                </template>
            </es-form-input>
            <es-button
                class="ml-50 mb-3"
                :disabled="!searchText"
                type="submit"
                :value="buttonText">
                {{ buttonText }}
                <!-- <input enterkeyhint="search" /> -->
            </es-button>
        </form>
        <slot name="close" />
    </div>
</template>

<script lang="js">
// import axios from 'axios';
import EsButton from './EsButton.vue';
import EsFormInput from './EsFormInput.vue';

export default {
    name: 'EsSearchBar',
    components: {
        EsButton,
        EsFormInput,
    },
    data() {
        return {
            searchText: '',
        }
    },
    methods: {
        checkSearchText(event) {
            if (!this.searchText) {
                event.preventDefault();
            }
        },
    },
    props: {
        buttonText: {
            type: String,
            default: 'Search',
        },
        placeholder: {
            type: String,
            default: 'Try "best solar panels"',
        },
    },
};
</script>
