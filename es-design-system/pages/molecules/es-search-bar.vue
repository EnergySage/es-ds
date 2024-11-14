<template>
    <div>
        <h1 class="mb-500">Search bar</h1>
        <h2>Basic example</h2>
        <es-search-bar
            id="searchBar1"
            class="my-500" />
        <h2>Example with open/close functionality</h2>
        <es-search-bar
            v-if="showSearchBar"
            id="searchBar2"
            class="my-500">
            <template #close>
                <es-button
                    class="position-absolute nav-button mb-3"
                    aria-label="Close search bar"
                    style="right: 0"
                    variant="link"
                    @click="toggleSearchBar()">
                    <icon-x
                        width="30px"
                        height="30px" />
                </es-button>
            </template>
        </es-search-bar>
        <es-button
            v-else
            variant="link"
            aria-label="Open search bar"
            class="nav-button nav-link icon-toggle d-flex flex-nowrap my-500 mx-auto"
            @click="toggleSearchBar()">
            <icon-search
                class="align-self-center search-icon"
                width="20px"
                height="20px" />
        </es-button>

        <div class="my-500">
            <h2>
                EsSearchBar slots
            </h2>
            <ds-prop-table
                :rows="slotTableRows"
                :widths="slotTableWidths" />
        </div>

        <div class="my-500">
            <h2>
                EsSearchBar props
            </h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="propTableWidths" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsSearchBar.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-search-bar.vue" />
    </div>
</template>

<script>
export default {
    name: 'EsSearchBarDocs',
    data() {
        return {
            compCode: '',
            docCode: '',
            showSearchBar: false,
            propTableRows: [
                [
                    'buttonText',
                    'Search',
                    'Text to display on the submit button.',
                ],
                [
                    'placeholder',
                    'Try "best solar panels"',
                    'Placeholder text to display in the search input.',
                ],
            ],
            propTableWidths: {
                md: ['4', '2', '6'],
                lg: ['3', '4', '5'],
            },
            slotTableRows: [
                [
                    'close',
                    'n/a',
                    'Slot for a close button or other content to be displayed to the right of the search bar.',
                ],
            ],
            slotTableWidths: {
                md: ['4', '3', '5'],
                lg: ['3', '4', '5'],
            },
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-search-bar.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsSearchBar.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        toggleSearchBar() {
            this.showSearchBar = !this.showSearchBar;
        },
    },
};
</script>
