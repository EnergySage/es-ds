
<script lang="js">
export default {
    name: 'EsSearchBar',
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

<template>
    <div class="align-items-center w-100 d-flex justify-content-center position-relative">
        <div class="d-flex align-items-center mx-auto justify-content-center w-100">
            <es-form-input
                id="searchBar"
                class="w-50"
                label-sr-only
                :placeholder="label"
                v-on="$listeners"
                v-bind="$attrs"
                @keyup.enter="$emit('searchButtonClicked')">
                <template #prefixIcon>
                    <icon-search />
                </template>
            </es-form-input>
            <es-button
                class="ml-50 mb-3"
                @click="$emit('searchButtonClicked')">
                {{ buttonText }}
            </es-button>
        </div>
        <slot name="close" />
    </div>
</template>
