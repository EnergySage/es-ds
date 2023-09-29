<template>
    <div>
        <h1>
            Collapse
        </h1>
        <p>
            Extended from <b-link href="https://bootstrap-vue.org/docs/components/collapse">
                bootstrap-vue collapse
            </b-link>
        </p>
        <div class="mt-450 mb-450">
            <h2>
                Default
            </h2>
            <p>
                A normal EsCollapse component. Click it to toggle showing its contents!
            </p>
            <EsCollapse
                id="defaultCollapse"
                class="ml-450 mr-450 mt-450">
                <template #title>
                    <h2 class="mb-0">
                        My Title
                    </h2>
                </template>
                <!-- eslint-disable max-len -->
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex mi, ut suscipit libero condimentum id.
                    Pellentesque eu diam vel nisi molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris
                    vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare.
                    Maecenas quis turpis sit amet sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                    Donec eleifend elit quam.
                </p>
                <!-- eslint-enable max-len -->
            </EsCollapse>
        </div>

        <div class="mt-450 mb-450">
            <h2>
                Programmatic, with user override
            </h2>
            <p>
                An EsCollapse component that takes a "visible" prop. Click the checkbox to toggle showing its
                contents! If you click the collapse itself, the "visible" prop will no longer be honored.
            </p>
            <form class="ml-450 mr-450 mt-450">
                <label for="suggestedVisibleInput">
                    <input
                        id="suggestedVisibleInput"
                        v-model="suggestedVisible"
                        type="checkbox">
                    Toggle collapse programmatically (will be honored until a manual expand or collapse)
                </label>
            </form>
            <EsCollapse
                id="testId"
                :visible="suggestedVisible"
                class="p-450"
                @shown="shownEvent"
                @toggled="toggledEvent">
                <template #title>
                    <h2 class="mb-0">
                        My Title
                    </h2>
                </template>
                <!-- eslint-disable max-len -->
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex mi, ut suscipit libero condimentum id.
                    Pellentesque eu diam vel nisi molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris
                    vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare.
                    Maecenas quis turpis sit amet sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                    Donec eleifend elit quam.
                </p>
                <!-- eslint-enable max-len -->
            </EsCollapse>
        </div>

        <div class="mt-450 mb-450">
            <h2>
                Programmatic, with Priority
            </h2>
            <p>
                An EsCollapse component that takes a "visible" prop with "is-programmatic-until-user-input" true. Click
                the checkbox to toggle showing its contents! Unlike the previous example, if you click the collapse
                itself, the "visible" prop will continue to be honored.
            </p>
            <form class="ml-450 mr-450 mt-450">
                <label for="visible">
                    <input
                        id="visible"
                        v-model="visible"
                        type="checkbox">
                    Toggle collapse programmatically (will always be honored)
                </label>
            </form>
            <EsCollapse
                id="testId"
                v-model="visible"
                :is-programmatic-until-user-input="false"
                class="p-450"
                @shown="shownEvent"
                @toggled="toggledEventInSuggestedVisibleExample">
                <template #title>
                    <h2 class="mb-0">
                        My Title
                    </h2>
                </template>
                <!-- eslint-disable max-len -->
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex mi, ut suscipit libero condimentum id.
                    Pellentesque eu diam vel nisi molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris
                    vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare.
                    Maecenas quis turpis sit amet sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                    Donec eleifend elit quam.
                </p>
                <!-- eslint-enable max-len -->
            </EsCollapse>
        </div>

        <div class="mb-450">
            <h2>
                EsCollapse props
            </h2>
            <ds-prop-table
                :rows="propTableRows"
                :widths="tableWidths" />
        </div>
        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-vue-base/src/lib-components/EsCollapse.vue"
            :doc-code="docCode"
            doc-source="es-design-system/pages/molecules/es-collapse.vue" />
    </div>
</template>
<script>

export default {
    name: 'EsCollapseDocs',

    data() {
        return {
            compCode: '',
            docCode: '',
            suggestedVisible: true,
            visible: false,
            propTableRows: [
                [
                    'visible',
                    'false',
                    'Suggested visibility state. Will be ignored if and when the user '
                    + 'interacts with the collapse (unless "isProgrammaticUntilUserInput" is false).',
                ],
                [
                    'isProgrammaticUntilUserInput',
                    'true',
                    'Priority for the "visible" prop. When false, "visible" will continue to affect the component '
                    + 'even after the user interacts with the collapse.',
                ],
            ],
            tableWidths: {
                md: ['4', '3', '5'],
                lg: ['4', '3', '5'],
            },
        };
    },
    async created() {
        if (this.$prism) {
        /* eslint-disable import/no-webpack-loader-syntax, import/no-self-import */
            const docSource = await import('!raw-loader!./es-collapse.vue');
            const compSource = await import('!raw-loader!@energysage/es-vue-base/src/lib-components/EsCollapse.vue');
            /* eslint-enable import/no-webpack-loader-syntax, import/no-self-import */

            this.docCode = this.$prism.normalizeCode(docSource.default);
            this.compCode = this.$prism.normalizeCode(compSource.default);
            this.$prism.highlight(this);
        }
    },
    methods: {
        shownEvent() {
            // eslint-disable-next-line no-console
            console.log('shown');
        },
        toggledEvent(newValue) {
            // eslint-disable-next-line no-console
            console.log(`toggled to ${newValue}`);
        },
        toggledEventInSuggestedVisibleExample(newValue) {
            // eslint-disable-next-line no-console
            console.log(`toggled to ${newValue}`);
            this.visible = newValue;
        },
    },
};
</script>
