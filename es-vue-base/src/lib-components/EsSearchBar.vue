<template>
    <div class="align-items-center w-100 d-flex flex-column flex-lg-row justify-content-center position-relative">
        <form
            action="/search/"
            class="d-flex align-items-center mx-auto justify-content-center order-2 order-lg-1 w-100"
            method="get">
            <es-form-input
                :id="id"
                v-model="searchText"
                aria-label="Search bar"
                class="w-50 flex-grow-1"
                label-sr-only
                name="query"
                :placeholder="placeholder"
                :value="searchText"
                @keydown.enter="checkSearchText"
                v-bind="$attrs">
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
            </es-button>
        </form>
        <slot name="close" />
    </div>
</template>

<script lang="js">
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
