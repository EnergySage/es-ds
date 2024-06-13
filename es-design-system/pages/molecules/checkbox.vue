<template>
    <div>
        <h1>
            Checkbox
        </h1>
        <p class="mb-500">
            Uses
            <b-link
                href="https://bootstrap-vue.org/docs/components/form-checkbox"
                target="_blank">
                bootstrap-vue checkbox
            </b-link>
        </p>

        <div class="my-500">
            <h2>
                Basic example
            </h2>
            <div>
                <b-form-checkbox v-model="apple">
                    Apple
                </b-form-checkbox>
                <b-form-checkbox v-model="banana">
                    Banana
                </b-form-checkbox>
                <b-form-checkbox v-model="cherry">
                    Cherry
                </b-form-checkbox>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Disabled
            </h2>
            <div>
                <b-form-checkbox
                    v-model="apple"
                    disabled>
                    Apple
                </b-form-checkbox>
                <b-form-checkbox
                    v-model="banana"
                    disabled>
                    Banana
                </b-form-checkbox>
                <b-form-checkbox
                    v-model="cherry"
                    disabled>
                    Cherry
                </b-form-checkbox>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Indeterminate
            </h2>
            <b-form-checkbox
                v-model="selectAll"
                :indeterminate="selectAllIsIndeterminate"
                @change="handleSelectAllToggle">
                Select all
            </b-form-checkbox>
            <div class="ml-100">
                <b-form-checkbox
                    v-model="apple"
                    @change="handleOptionChange">
                    Apple
                </b-form-checkbox>
                <b-form-checkbox
                    v-model="banana"
                    @change="handleOptionChange">
                    Banana
                </b-form-checkbox>
                <b-form-checkbox
                    v-model="cherry"
                    @change="handleOptionChange">
                    Cherry
                </b-form-checkbox>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Helper text and required indicators
            </h2>
            <div>
                <b-form-checkbox
                    v-model="apple"
                    name="fruit">
                    <div>
                        Apple <span class="font-italic text-error-900">*</span>
                    </div>
                    <div class="font-size-sm text-gray-700">
                        Malus domestica
                    </div>
                </b-form-checkbox>
                <b-form-checkbox
                    v-model="banana"
                    name="fruit">
                    <div>
                        Banana <span class="font-italic text-error-900">*</span>
                    </div>
                    <div class="font-size-sm text-gray-700">
                        Musa acuminata
                    </div>
                </b-form-checkbox>
                <b-form-checkbox
                    v-model="cherry"
                    name="fruit">
                    <div>
                        Cherry <span class="font-italic text-error-900">*</span>
                    </div>
                    <div class="font-size-sm text-gray-700">
                        Prunus avium
                    </div>
                </b-form-checkbox>
            </div>
        </div>

        <ds-doc-source
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/checkbox.vue" />
    </div>
</template>

<script>
export default {
    name: 'CheckboxDocs',
    data() {
        return {
            docCode: '',
            apple: false,
            banana: true,
            cherry: false,
            selectAll: false,
        };
    },
    computed: {
        selectAllIsIndeterminate() {
            return (this.apple && this.banana && this.cherry) !== (this.apple || this.banana || this.cherry);
        },
    },
    async created() {
        if (this.$prism) {
            /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./checkbox.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        handleOptionChange() {
            this.selectAll = this.apple && this.banana && this.cherry;
        },
        handleSelectAllToggle() {
            if (!(this.apple && this.banana && this.cherry)) {
                this.apple = true;
                this.banana = true;
                this.cherry = true;
            } else {
                this.apple = false;
                this.banana = false;
                this.cherry = false;
            }
        },
    },
};
</script>
