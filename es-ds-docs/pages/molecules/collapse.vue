<script setup>
const suggestedVisible = ref(true);
const visible = ref(false);

const propTableRows = [
    [
        'visible',
        'Boolean',
        'false',
        'Suggested visibility state. Will be ignored if and when the user ' +
            'interacts with the collapse (unless "isProgrammaticUntilUserInput" is false).',
    ],
    [
        'isProgrammaticUntilUserInput',
        'Boolean',
        'true',
        'Priority for the "visible" prop. When false, "visible" will continue to affect the component ' +
            'even after the user interacts with the collapse.',
    ],
    ['border', 'Boolean', 'true', 'Will hide/show borders'],
];

const shownEvent = () => {
    // eslint-disable-next-line no-console
    console.log('shown');
};
const toggledEvent = (newValue) => {
    // eslint-disable-next-line no-console
    console.log(`toggled to ${newValue}`);
};
const toggledEventInSuggestedVisibleExample = (newValue) => {
    // eslint-disable-next-line no-console
    console.log(`toggled to ${newValue}`);
    visible.value = newValue;
};

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        /* eslint-disable import/no-self-import */
        const compSource = await import('@energysage/es-ds-components/components/es-collapse.vue?raw');
        const docSource = await import('./collapse.vue?raw');
        /* eslint-enable import/no-self-import */

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Collapse</h1>
        <p>
            Extended from
            <a
                href="https://v3.primevue.org/panel/#toggleable"
                target="_blank">
                PrimeVue Panel
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
            <h2>Default</h2>
            <p>A normal EsCollapse component. Click it to toggle showing its contents!</p>
            <es-collapse>
                <template #title>
                    <h2 class="mb-0">My title</h2>
                </template>
                <!-- eslint-disable max-len -->
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex
                    mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi molestie porta eget sed odio.
                    Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris vitae ante porttitor,
                    consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor
                    mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet sapien dapibus
                    sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat. Donec eleifend
                    elit quam.
                </p>
                <!-- eslint-enable max-len -->
            </es-collapse>
        </div>

        <div class="my-500">
            <h2>Programmatic, with user override</h2>
            <p>
                An EsCollapse component that takes a "visible" prop. Click the checkbox to toggle showing its contents!
                If you click the collapse itself, the "visible" prop will no longer be honored.
            </p>
            <form class="mb-100">
                <es-form-checkbox
                    id="suggestedVisibleInput"
                    v-model="suggestedVisible">
                    Toggle collapse programmatically (will be honored until a manual expand or collapse)
                </es-form-checkbox>
            </form>
            <es-collapse
                :visible="suggestedVisible"
                @shown="shownEvent"
                @toggled="toggledEvent">
                <template #title>
                    <h2 class="mb-0">My title</h2>
                </template>
                <!-- eslint-disable max-len -->
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex
                    mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi molestie porta eget sed odio.
                    Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris vitae ante porttitor,
                    consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor
                    mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet sapien dapibus
                    sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat. Donec eleifend
                    elit quam.
                </p>
                <!-- eslint-enable max-len -->
            </es-collapse>
        </div>

        <div class="my-500">
            <h2>Programmatic, with priority</h2>
            <p>
                An EsCollapse component that takes a "visible" prop with "is-programmatic-until-user-input" true. Click
                the checkbox to toggle showing its contents! Unlike the previous example, if you click the collapse
                itself, the "visible" prop will continue to be honored.
            </p>
            <form class="mb-100">
                <es-form-checkbox
                    id="visible"
                    v-model="visible">
                    Toggle collapse programmatically (will always be honored)
                </es-form-checkbox>
            </form>
            <es-collapse
                v-model="visible"
                :is-programmatic-until-user-input="false"
                @shown="shownEvent"
                @toggled="toggledEventInSuggestedVisibleExample">
                <template #title>
                    <h2 class="mb-0">My title</h2>
                </template>
                <!-- eslint-disable max-len -->
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex
                    mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi molestie porta eget sed odio.
                    Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris vitae ante porttitor,
                    consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor
                    mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet sapien dapibus
                    sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat. Donec eleifend
                    elit quam.
                </p>
                <!-- eslint-enable max-len -->
            </es-collapse>
        </div>

        <div class="my-500">
            <h2>No border example</h2>
            <p>To avoid a jumpy transition, remove margins from elements within the default slot</p>
            <es-collapse
                id="noBorderExample"
                :border="false">
                <template #title>
                    <h2 class="mb-0">My title</h2>
                </template>
                <!-- eslint-disable max-len -->
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex
                    mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi molestie porta eget sed odio.
                    Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris vitae ante porttitor,
                    consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor
                    mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet sapien dapibus
                    sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat. Donec eleifend
                    elit quam.
                </p>
                <!-- eslint-enable max-len -->
            </es-collapse>
        </div>

        <div class="my-500">
            <h2>Extra spacing</h2>
            <es-collapse
                id="extraStylingExample"
                class="bg-yellow-100 py-100 px-150 rounded"
                :border="false">
                <template #title>
                    <h2 class="mb-0">My title</h2>
                </template>
                <!-- eslint-disable max-len -->
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex
                    mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi molestie porta eget sed odio.
                    Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris vitae ante porttitor,
                    consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor
                    mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet sapien dapibus
                    sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat. Donec eleifend
                    elit quam.
                </p>
                <!-- eslint-enable max-len -->
            </es-collapse>
        </div>

        <div class="mb-500">
            <h2>EsCollapse props</h2>
            <ds-prop-table :rows="propTableRows" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/src/lib-components/es-collapse.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/es-collapse.vue" />
    </div>
</template>
