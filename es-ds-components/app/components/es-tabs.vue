<script setup lang="ts">
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import { Comment } from 'vue';

// allow use of v-model on this component
const model = defineModel<number>();

// get the list of elements provided as children to the default slot - filtering out comments
const rawChildren = useSlots().default?.() || [];
const initialChildren = rawChildren.filter((child) => child.type !== Comment);

const panels: any[] = [];
initialChildren.forEach((child) => {
    // unless this has a v-for element and we instead need to access its children
    if (typeof child.type === 'symbol' && Array.isArray(child.children)) {
        panels.push(...child.children);
    } else {
        panels.push(child);
    }
});

// keep track of the active tab index
//  - from above, if v-model is used
//  - from below, if the tab component receives a click
const activeIndex: Ref<number> = ref(model.value || 0);

// watch the v-model for changes and update the active index if it does change
watch(model, (newVal) => {
    // @ts-expect-error I don't know why
    activeIndex.value = newVal;
});

// called from the TabView when the user clicks a tab to make it active
const updateActiveIndex = (index: number) => {
    model.value = index;
};
</script>

<template>
    <tab-view
        :active-index="activeIndex"
        :pt="{
            root: 'tabs es-tabs',
            nav: 'list-unstyled nav position-relative',
            tab: 'nav-link',
            inkbar: 'inkbar position-absolute',
            panelContainer: 'tab-content',
        }"
        @update:active-index="updateActiveIndex">
        <tab-panel
            v-for="(panel, index) in panels"
            :key="index"
            :header="panel.props.title"
            :pt="{
                header: 'nav-item',
                headerAction: ({ context }) => ({
                    class: [
                        'nav-link',
                        {
                            'active active-tab font-weight-bolder': context.active,
                        },
                    ],
                }),
                content: ({ context }) => ({
                    class: [
                        'tab-pane mt-100',
                        {
                            active: context.active,
                        },
                    ],
                }),
            }">
            <component
                :is="item"
                v-for="(item, idx) in panel.children.default()"
                :key="idx" />
        </tab-panel>
    </tab-view>
</template>
