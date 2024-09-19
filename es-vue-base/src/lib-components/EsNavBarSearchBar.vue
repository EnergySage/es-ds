<template>
   <div class="align-items-center w-100 d-flex justify-content-center position-relative">
        <div class="d-flex align-items-center mx-auto justify-content-center w-100">
            <es-form-input
                class="mt-3 w-50"
                id="searchBar"
                v-model="searchText"
                label-sr-only
                :placeholder="label">
                <template #prefixIcon>
                    <icon-search />
                </template>
            </es-form-input>
            <es-button class="ml-50">
                {{ buttonText }}
            </es-button>
        </div>
        <slot name="close" />
    </div>
</template>

<script lang="js">
import EsNavBarLink from './EsNavBarLink.vue';

export default {
    name: 'EsNavBarSearchBar',
    components: {
        EsNavBarLink,
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
    data() {
        return {
            searchText: '',
        }
    },
};
</script>
