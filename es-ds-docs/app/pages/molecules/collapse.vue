<script setup lang="ts">
const LOREM_IPSUM_TEXT =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex. Nullam vestibulum ex ' +
    'mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi molestie porta eget sed odio. ' +
    'Quisque congue risus id metus facilisis, non imperdiet libero rutrum. Mauris vitae ante porttitor, ' +
    'consectetur purus faucibus, euismod ex. Orci varius natoque penatibus et magnis dis parturient ' +
    'montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus. Mauris vitae tortor ' +
    'mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet sapien dapibus ' +
    'sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat. Donec eleifend ' +
    'elit quam.';

const PROS_CONS_TABLE = [
    {
        advantages: 'Saves money on electricity',
        disadvantages: 'Savings are lower than with a solar loan or cash purchases',
    },
    {
        advantages: 'Low or no upfront costs',
        disadvantages: "Can't take advantage of state and local incentives",
    },
    {
        advantages: 'May be an attractive feature to some homebuyers',
        disadvantages: 'Complicates selling your home',
    },
    {
        advantages: 'No maintenance responsibilities',
        disadvantages: 'Leasing companies sometimes neglect their maintenance responsibilities',
    },
];

const PROP_TABLE_ROWS = [
    ['border', 'Boolean', 'true', 'Will show or hide borders on the top and bottom.'],
    [
        'isProgrammaticUntilUserInput',
        'Boolean',
        'true',
        'Controls whether manual user input permanently overrides external control coming in via ' +
            'v-model or the visible prop.',
    ],
    ['triggerClass', 'String', "''", 'A CSS class to apply to the button that contains the title and chevron icon.'],
    [
        'visible',
        'Boolean',
        'false',
        'Controls whether the collapse is expanded. Is ignored once the user interacts with the collapse, ' +
            ' unless isProgrammaticUntilUserInput is false.',
    ],
];

const EVENT_TABLE_ROWS = [
    [
        'toggled',
        'value (boolean)',
        'Emitted when the component either collapses or expands, whether from user interaction or programmatic control.',
    ],
    [
        'userClick',
        'value (boolean)',
        'Emitted when the user manually clicks on the trigger button to expand or collapse the component.',
    ],
];

const suggestedVisible = ref(false);
const visible = ref(false);

const toggledEvent = (newValue: boolean) => {
    console.log(`toggled to ${newValue}`);
};

const userClickEvent = (newValue: boolean) => {
    console.log(`user click; changed to ${newValue}`);
};

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-collapse.vue?raw');

        const docSource = await import('./collapse.vue?raw');

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
                href="https://reka-ui.com/docs/components/collapsible"
                target="_blank">
                Reka UI Collapsible
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
            <es-collapse>
                <template #title>
                    <h3 class="mb-0">How much can financing impact savings?</h3>
                </template>
                <p>
                    {{ LOREM_IPSUM_TEXT }}
                </p>
            </es-collapse>
        </div>

        <div class="my-500">
            <h2>Expanded</h2>
            <p>Use the <code>visible</code> prop to control the initial collapsed/expanded state.</p>
            <es-collapse visible>
                <template #title>
                    <h3 class="mb-0">How much can financing impact savings?</h3>
                </template>
                <p>
                    {{ LOREM_IPSUM_TEXT }}
                </p>
            </es-collapse>
        </div>

        <div class="my-500">
            <h2>Color change and no border</h2>
            <p>
                This shows how to remove the border and change the color of the text and icon by using the
                <code>trigger-class</code> prop.
            </p>
            <es-collapse
                :border="false"
                trigger-class="text-blue">
                <template #title>
                    <h3 class="h4 mb-0 text-blue">Is solar third-party ownership right for you?</h3>
                </template>
                <es-data-table :items="PROS_CONS_TABLE">
                    <es-data-table-column
                        field="advantages"
                        header="Advantages" />
                    <es-data-table-column
                        field="disadvantages"
                        header="Disadvantages" />
                </es-data-table>
            </es-collapse>
        </div>

        <div class="my-500">
            <h2>No border, background, multiple titles</h2>
            <p>This shows a larger title section and how to remove the border and apply a background color.</p>
            <es-collapse
                :border="false"
                class="bg-yellow-100 py-100 px-150 rounded">
                <template #title>
                    <h3 class="eyebrow">Energy storage</h3>
                    <h4 class="h3 mb-0">Is a solar battery worth it?</h4>
                </template>
                <p>
                    {{ LOREM_IPSUM_TEXT }}
                </p>
            </es-collapse>
        </div>

        <div class="my-500">
            <h2>External control with user override</h2>
            <p>
                This shows the behavior of the collapse being controlled by a separate toggle, by passing a reactive
                variable to the <code>visible</code> prop. By default, controlled collapses like this will
                automatically stop responding to the outside control as soon as a user interacts with the collapse
                directly, to ensure the user's choice is respected.
            </p>
            <form class="mb-100">
                <es-toggle v-model="suggestedVisible">
                    <template #label> Show contents (will be honored until a manual expand or collapse) </template>
                </es-toggle>
            </form>
            <es-collapse
                :visible="suggestedVisible"
                @toggled="toggledEvent"
                @user-click="userClickEvent">
                <template #title>
                    <h3 class="mb-0">My title</h3>
                </template>
                <p>
                    {{ LOREM_IPSUM_TEXT }}
                </p>
            </es-collapse>
        </div>

        <div class="my-500">
            <h2>External control without user override</h2>
            <p>
                Use <code>v-model</code> and set <code>is-programmatic-until-user-input</code> to false if you need the
                collapse to remain externally controlled whether or not the user interacts with it.
            </p>
            <form class="mb-100">
                <es-toggle v-model="visible">
                    <template #label> Show contents (will always be honored) </template>
                </es-toggle>
            </form>
            <es-collapse
                v-model="visible"
                :is-programmatic-until-user-input="false"
                @toggled="toggledEvent"
                @user-click="userClickEvent">
                <template #title>
                    <h3 class="mb-0">My title</h3>
                </template>
                <p>
                    {{ LOREM_IPSUM_TEXT }}
                </p>
            </es-collapse>
        </div>

        <div class="mb-500">
            <h2>EsCollapse props</h2>
            <ds-prop-table
                :rows="PROP_TABLE_ROWS"
                :widths="{
                    md: ['5', '2', '2', '3'],
                    lg: ['4', '2', '2', '4'],
                }" />
        </div>

        <div class="mb-500">
            <h2>EsCollapse events</h2>
            <ds-prop-table
                :columns="['Name', 'Argument', 'Description']"
                :rows="EVENT_TABLE_ROWS"
                :widths="{
                    md: ['3', '3', '6'],
                }" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-collapse.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/es-collapse.vue" />
    </div>
</template>
