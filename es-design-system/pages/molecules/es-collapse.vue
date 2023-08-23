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
                Default EsCollapse
            </h2>
            <p>
                A normal EsCollapse component. Click it to toggle showing it's contents!
            </p>
            <EsCollapse
                id="defaultCollapse"
                class="ml-450 mr-450">
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
                Programmatic EsCollapse
            </h2>
            <p>
                An EsCollapse component that takes a "visible" prop. Click the checkbox to toggle showing it's
                contents! If you click the collapse itself, the "visible" prop will no longer be honored.
            </p>
            <form class="ml-450 mr-450 mt-5">
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
                Programmatic EsCollapse with Priority
            </h2>
            <p>
                An EsCollapse component that takes a "visible" prop with "prioritize-suggested-visible" true. Click the
                checkbox to toggle showing it's contents! Unlike the previous example, if you click the collapse
                itself, the "visible" prop will continue to be honored.
            </p>
            <form class="ml-450 mr-450">
                <label for="suggestedVisibleForPriorityInput">
                    <input
                        id="suggestedVisibleForPriorityInput"
                        v-model="suggestedVisibleForPriority"
                        type="checkbox">
                    Toggle collapse programmatically (will always be honored)
                </label>
            </form>
            <EsCollapse
                id="testId"
                :visible="suggestedVisibleForPriority"
                :prioritize-suggested-visible="true"
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
            suggestedVisibleForPriority: false,
            propTableRows: [
                [
                    'visible',
                    'false',
                    'Suggested visibility state. Will be ignored if and when the user '
                    + 'interacts with the collapse (unless "prioritizeSuggestedVisible" is true).',
                ],
                [
                    'prioritizeSuggestedVisible',
                    'false',
                    'Priority for the "visible" prop. When true, "visible" will continue to affect the component '
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
    },
};
</script>
