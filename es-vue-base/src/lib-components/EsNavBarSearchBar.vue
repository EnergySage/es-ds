<template>
    <div class="align-items-center w-100 d-flex justify-content-center position-relative">
        <div class="d-flex align-items-center mx-auto justify-content-center w-100">
            <es-form-input
                id="searchBar"
                class="mt-3 w-50"
                v-bind="$attrs"
                label-sr-only
                :placeholder="label"
                v-on="$listeners">
                <template #prefixIcon>
                    <icon-search />
                </template>
            </es-form-input>
            <es-button
                class="ml-50"
                @click="$emit('searchButtonClicked')">
                {{ buttonText }}
            </es-button>
        </div>
        <slot name="close" />
    </div>
</template>

<script lang="js">
import EsButton from './EsButton.vue';
import EsFormInput from './EsFormInput.vue';
import IconSearch from '../lib-icons/icon-search.vue';

export default {
    name: 'EsNavBarSearchBar',
    components: {
        EsButton,
        EsFormInput,
        IconSearch
    },
    props: {
        label: {
            type: String,
            default: 'Try "best solar panels"',
        },
        buttonText: {
            type: String,
            default: 'Search',
        },
    },
};
</script>
