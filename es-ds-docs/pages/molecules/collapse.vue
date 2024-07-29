<template>
    <div>
        <h1>
            Collapse
        </h1>
        <p>
            Extended from <a
                href="https://v3.primevue.org/panel/#toggleable"
                target="_blank">
                PrimeVue panel
            </a>
        </p>
        <p>
            Per our writing guidelines, please ensure the title is in
            <a
                href="https://apastyle.apa.org/style-grammar-guidelines/capitalization/sentence-case"
                target="_blank">
                Sentence case.
            </a>
        </p>

        <div class="my-500">
            <h2>
                Default
            </h2>
            <p>
                A normal EsCollapse component. Click it to toggle showing its contents!
            </p>
            <div class="px-500 pt-500">
                <es-collapse>
                    <template #title>
                        <h2 class="mb-0">
                            My title
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
                </es-collapse>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Programmatic, with user override
            </h2>
            <p>
                An EsCollapse component that takes a "visible" prop. Click the checkbox to toggle showing its
                contents! If you click the collapse itself, the "visible" prop will no longer be honored.
            </p>
            <form class="mx-500 mt-500">
                <label for="suggestedVisibleInput">
                    <input
                        id="suggestedVisibleInput"
                        v-model="suggestedVisible"
                        type="checkbox">
                    Toggle collapse programmatically (will be honored until a manual expand or collapse)
                </label>
            </form>
            <div class="p-500">
                <es-collapse
                    :visible="suggestedVisible"
                    @shown="shownEvent"
                    @toggled="toggledEvent">
                    <template #title>
                        <h2 class="mb-0">
                            My title
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
                </es-collapse>
            </div>
        </div>

        <div class="my-500">
            <h2>
                Programmatic, with priority
            </h2>
            <p>
                An EsCollapse component that takes a "visible" prop with "is-programmatic-until-user-input" true. Click
                the checkbox to toggle showing its contents! Unlike the previous example, if you click the collapse
                itself, the "visible" prop will continue to be honored.
            </p>
            <form class="mx-500 mt-500">
                <label for="visible">
                    <input
                        id="visible"
                        v-model="visible"
                        type="checkbox">
                    Toggle collapse programmatically (will always be honored)
                </label>
            </form>
            <div class="p-500">
                <es-collapse
                    v-model="visible"
                    :is-programmatic-until-user-input="false"
                    @shown="shownEvent"
                    @toggled="toggledEventInSuggestedVisibleExample">
                    <template #title>
                        <h2 class="mb-0">
                            My title
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
                </es-collapse>
            </div>
        </div>

        <div class="my-500">
            <h2>
                No border example
            </h2>
            <p>
                To avoid a jumpy transition, remove margins from elements within the default slot
            </p>
            <es-collapse
                id="noBorderExample"
                class="m-500"
                :border="false">
                <template #title>
                    <h2 class="mb-0">
                        My title
                    </h2>
                </template>
                <!-- eslint-disable max-len -->
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex mi, ut suscipit libero condimentum id.
                    Pellentesque eu diam vel nisi molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris
                    vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare.
                    Maecenas quis turpis sit amet sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                    Donec eleifend elit quam.
                </p>
                <!-- eslint-enable max-len -->
            </es-collapse>
        </div>

        <div class="my-500">
            <h2>
                Extra spacing
            </h2>
            <es-collapse
                id="extraStylingExample"
                class="m-500 bg-yellow-100 py-100 px-150 rounded"
                :border="false">
                <template #title>
                    <h2 class="mb-0">
                        My title
                    </h2>
                </template>
                <!-- eslint-disable max-len -->
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex mi, ut suscipit libero condimentum id.
                    Pellentesque eu diam vel nisi molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris
                    vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare.
                    Maecenas quis turpis sit amet sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                    Donec eleifend elit quam.
                </p>
                <!-- eslint-enable max-len -->
            </es-collapse>
        </div>

        <div class="mb-500">
            <h2>
                EsCollapse props
            </h2>
            <!--<ds-prop-table
                :rows="propTableRows"
                :widths="tableWidths" />-->
        </div>
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
                [
                    'border',
                    'true',
                    'Will hide/show borders',
                ],
            ],
            tableWidths: {
                md: ['4', '3', '5'],
                lg: ['4', '3', '5'],
            },
        };
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
