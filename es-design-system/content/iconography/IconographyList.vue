<template>
    <b-container class="iconlist-holder m-0 p-0 w-100">
        <b-row class="mt-4 justify-content-center">
            <b-col cols="8">
                <b-form-input
                    v-model="iconName"
                    placeholder="Type to filter" />
            </b-col>
        </b-row>
        <b-row class="mt-3 align-items-center justify-content-center text-center">
            <b-col
                v-for="icon in filteredList"
                :key="icon.name"
                cols="3"
                class="border py-2 m-2">
                <div
                    class="icon-link d-flex flex-column align-items-center justify-content-center text-center w-100 h-100">
                    <component
                        :is="icon.component"
                        class="icon-holder" />
                    <div class="mt-2 small">
                        {{ icon.file }}
                        <br>
                        {{ icon.component }}
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import {
    BContainer, BRow, BCol, BLink, BFormInput,
} from 'bootstrap-vue';

export default {
    name: 'IconographyList',
    filters: {
        /**
         * @param { string } value unclean name
         * @returns { string } clean name
         */
        fileName(value) {
            if (!value) return '';
            return value.replace('./', '').replace('.vue', '');
        },
        /**
         * @param { string } value unclean name
         * @returns { string } clean name
         */
        pascalCase(value) {
            if (!value) return '';
            return `${value.replace('.vue', '')
                .replace(
                    /(\w)(\w*)/g,
                    (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
                ).replace(/[^a-z0-9]+/gi, '')}Icon`;
        },
    },
    components: {
        BContainer,
        BRow,
        BCol,
        BLink,
        BFormInput,
    },
    props: {
        /**
         * Fill color of each svg
         */
        variant: {
            type: String,
            default: 'primary',
        },
    },
    data() {
        return {
            iconName: '',
            allFiles: [],
        };
    },
    computed: {
        /**
         * Filters all available files to whatever is typed by the user
         *
         * @returns {Array} Array of filtered file names and data
         */
        filteredList() {
            const fileList = [];
            if (this.allFiles.length) {
                this.allFiles.keys().forEach((fileName) => {
                    if (!this.iconName || fileName.includes(this.iconName)) {
                        fileList.push({
                            file: this.$options.filters.fileName(fileName),
                            component: this.$options.filters.pascalCase(fileName),
                        });
                    }
                });
            }
            return fileList;
        },
    },
    mounted() {
        this.importComponentsFromFolder();
    },
    methods: {
        importComponentsFromFolder() {
            this.allFiles = require.context('../../components/svg/', true, /.vue/);

            this.allFiles.keys().forEach((fileName) => {
                const componentConfig = this.allFiles(fileName);
                // Register the component locally using component's name
                this.$options.components[componentConfig.default.name] = componentConfig.default;
            });
        },
    },
};
</script>
<style lang="scss" scoped>
// Make the link inherit the color from storybook args
.icon-link {
    color: currentColor;
}

.iconlist-holder {
     max-width: 100%;
}
</style>
