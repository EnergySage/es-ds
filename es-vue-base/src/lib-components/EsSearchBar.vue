<template>
    <div class="align-items-center w-100 d-flex flex-column flex-lg-row justify-content-center position-relative">
        <!--  d-flex flex-column -->
        <form
            action="/search/"
            class="d-flex align-items-center mx-auto justify-content-center order-2 order-lg-1 w-100"
            method="get">
            <es-form-input
                :id="id"
                v-model="searchText"
                aria-label="Search bar"
                class="w-50"
                label-sr-only
                name="query"
                :placeholder="placeholder"
                :value="searchText"
                @keydown.enter="checkSearchText">
                <template #label>
                    Search bar
                </template>
                <template #prefixIcon>
                    <icon-search />
                </template>
            </es-form-input>
            <es-button
                class="ml-50 mb-100"
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
    props: {
        /**
         * A unique id to keep track of which search form is being used.
         */
        id: {
            type: String,
            required: true,
        },
        buttonText: {
            type: String,
            default: 'Search',
        },
        placeholder: {
            type: String,
            default: 'Try "best solar panels"',
        },
    },
    data() {
        return {
            searchText: '',
        };
    },
    methods: {
        checkSearchText(event) {
            if (!this.searchText) {
                event.preventDefault();
            }
        },
    },
};
</script>
