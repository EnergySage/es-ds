<script setup lang="ts">
import { accountMenuItems, largeNestedMenuItems, longListOfCompanies } from '@/utils/mobile-nav-sample-items';

const esMobileNavProps = [
    [
        'from',
        'string',
        "'left'",
        `
        Indicates whether the mobile nav should open from the left side of the viewport or the right.
        Can be 'left' or 'right'.
        `,
    ],
    [
        'width',
        'number',
        '400',
        `
        On extra small breakpoint, the mobile nav takes up the full viewport width. On small breakpoint
        and above, the mobile nav will be set to this width and an overlay will appear beneath.
        `,
    ],
];

const esMobileNavTriggerProps = [
    [
        'unstyled',
        'boolean',
        'false',
        `
        Set to true to disable default trigger button styling and allow full customization. By default,
        the trigger button will have no background or border, dark blue text, padding, and a minimum
        height of 40px.
        `,
    ],
];

const esMobileNavLinkProps = [
    [
        'href',
        'string',
        'n/a',
        `
        Required. The URL for the link.
        `,
    ],
    [
        'name',
        'string',
        'n/a',
        `
        Required. The text to display.
        `,
    ],
    [
        'target',
        'string',
        "'_self'",
        `
        Indicates whether the link should open in a new window or not. By default, the link
        will open in the same window. Pass '_blank' to open in a new window.
        `,
    ],
];

const esMobileSubNavProps = [
    [
        'name',
        'string',
        'n/a',
        `
        Required. The name of the menu item that, when clicked, will drill down one level to show a
        different list of menu items. This name will also appear in the mobile nav header when that
        submenu is shown.
        `,
    ],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-mobile-nav.vue?raw');
        const docSource = await import('./mobile-nav.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <h1>Mobile nav</h1>
        <p class="mb-500">
            Extended from
            <nuxt-link
                to="https://reka-ui.com/docs/components/navigation-menu"
                target="_blank">
                Reka UI NavigationMenu
            </nuxt-link>
        </p>

        <div class="my-300">
            <h2>Basic example</h2>
            <p>The mobile nav can display a list of links. By default, it opens from the left.</p>
            <es-mobile-nav>
                <es-mobile-nav-trigger
                    class="btn btn-primary btn-md"
                    unstyled>
                    Open example
                </es-mobile-nav-trigger>
                <es-mobile-nav-content>
                    <template
                        v-for="item in accountMenuItems"
                        :key="item.name">
                        <es-mobile-nav-link
                            v-if="item.href"
                            :href="item.href"
                            :name="item.name" />
                    </template>
                </es-mobile-nav-content>
            </es-mobile-nav>
        </div>

        <div class="my-300">
            <h2>Opening from the right</h2>
            <p>Using the <code>from</code> prop, you can set the mobile nav to open from the right.</p>
            <es-mobile-nav from="right">
                <es-mobile-nav-trigger
                    class="btn btn-primary btn-md"
                    unstyled>
                    Open example
                </es-mobile-nav-trigger>
                <es-mobile-nav-content>
                    <template
                        v-for="item in accountMenuItems"
                        :key="item.name">
                        <es-mobile-nav-link
                            v-if="item.href"
                            :href="item.href"
                            :name="item.name" />
                    </template>
                </es-mobile-nav-content>
            </es-mobile-nav>
        </div>

        <div class="my-300">
            <h2>Scrolling</h2>
            <p>Long lists of links are scrollable within the mobile nav.</p>
            <es-mobile-nav>
                <es-mobile-nav-trigger
                    class="btn btn-primary btn-md"
                    unstyled>
                    Open example
                </es-mobile-nav-trigger>
                <es-mobile-nav-content>
                    <template
                        v-for="item in longListOfCompanies"
                        :key="item.name">
                        <es-mobile-nav-link
                            v-if="item.href"
                            :href="item.href"
                            :name="item.name" />
                    </template>
                </es-mobile-nav-content>
            </es-mobile-nav>
        </div>

        <div class="my-300">
            <h2>Submenus</h2>
            <p>
                The mobile nav supports submenus down to any depth you want. Here is an example of a nav that goes two
                levels deep.
            </p>
            <es-mobile-nav>
                <es-mobile-nav-trigger
                    class="btn btn-primary btn-md"
                    unstyled>
                    Open example
                </es-mobile-nav-trigger>
                <es-mobile-nav-content>
                    <template
                        v-for="item in largeNestedMenuItems"
                        :key="item.name">
                        <es-mobile-nav-link
                            v-if="item.href"
                            :href="item.href"
                            :name="item.name" />
                        <es-mobile-sub-nav
                            v-else-if="item.items?.length"
                            :name="item.name">
                            <template
                                v-for="subItem in item.items"
                                :key="subItem.name">
                                <es-mobile-nav-link
                                    v-if="subItem.href"
                                    :href="subItem.href"
                                    :name="subItem.name" />
                                <es-mobile-sub-nav
                                    v-else-if="subItem.items?.length"
                                    :name="subItem.name">
                                    <template
                                        v-for="subSubItem in subItem.items"
                                        :key="subSubItem.name">
                                        <es-mobile-nav-link
                                            v-if="subSubItem.href"
                                            :href="subSubItem.href"
                                            :name="subSubItem.name" />
                                    </template>
                                </es-mobile-sub-nav>
                            </template>
                        </es-mobile-sub-nav>
                    </template>
                </es-mobile-nav-content>
            </es-mobile-nav>
        </div>

        <div class="my-300">
            <h2>Custom items</h2>
            <p>
                You can insert custom items into the mobile nav that will appear just below the normal list of menu
                items.
            </p>
            <es-mobile-nav>
                <es-mobile-nav-trigger
                    class="btn btn-primary btn-md"
                    unstyled>
                    Open example
                </es-mobile-nav-trigger>
                <es-mobile-nav-content>
                    <template
                        v-for="item in accountMenuItems"
                        :key="item.name">
                        <es-mobile-nav-link
                            v-if="item.href"
                            :href="item.href"
                            :name="item.name" />
                    </template>
                    <es-mobile-nav-custom-item>
                        <es-nav-cta-card
                            class="mb-100"
                            heading="Get an instant quote"
                            href="https://www.energysage.com"
                            subtitle="Free, personalized solar quotes that’ll save you thousands"
                            target="_blank">
                            <template #icon>
                                <icon-solar aria-hidden="true" />
                            </template>
                        </es-nav-cta-card>
                    </es-mobile-nav-custom-item>
                </es-mobile-nav-content>
            </es-mobile-nav>
        </div>

        <div class="my-300">
            <h2>Custom footer</h2>
            <p>
                You can specify a custom footer for the top level of the mobile nav (i.e. not submenus). It will
                automatically stick to the bottom of the mobile nav content pane.
            </p>
            <es-mobile-nav>
                <es-mobile-nav-trigger
                    class="btn btn-primary btn-md"
                    unstyled>
                    Open example
                </es-mobile-nav-trigger>
                <es-mobile-nav-content>
                    <template
                        v-for="item in accountMenuItems"
                        :key="item.name">
                        <es-mobile-nav-link
                            v-if="item.href"
                            :href="item.href"
                            :name="item.name" />
                    </template>
                    <template #footer>
                        <div class="px-100 py-200">
                            <es-button class="w-100"> Sign in </es-button>
                        </div>
                    </template>
                </es-mobile-nav-content>
            </es-mobile-nav>
        </div>

        <div class="my-300">
            <h2>Scrolling with custom footer</h2>
            <p>
                If the list of menu items becomes long enough to go beyond the bottom edge, the custom footer will
                scroll nicely along with the rest of the content pane.
            </p>
            <es-mobile-nav>
                <es-mobile-nav-trigger
                    class="btn btn-primary btn-md"
                    unstyled>
                    Open example
                </es-mobile-nav-trigger>
                <es-mobile-nav-content>
                    <template
                        v-for="item in longListOfCompanies"
                        :key="item.name">
                        <es-mobile-nav-link
                            v-if="item.href"
                            :href="item.href"
                            :name="item.name" />
                    </template>
                    <template #footer>
                        <div class="px-100 py-200">
                            <es-button class="w-100"> Sign in </es-button>
                        </div>
                    </template>
                </es-mobile-nav-content>
            </es-mobile-nav>
        </div>

        <div class="my-300">
            <h2>EsMobileNav props</h2>
            <ds-prop-table :rows="esMobileNavProps" />
        </div>

        <div class="my-300">
            <h2>EsMobileNavTrigger props</h2>
            <ds-prop-table :rows="esMobileNavTriggerProps" />
        </div>

        <div class="my-300">
            <h2>EsMobileNavLink props</h2>
            <ds-prop-table :rows="esMobileNavLinkProps" />
        </div>

        <div class="my-300">
            <h2>EsMobileSubNav props</h2>
            <ds-prop-table :rows="esMobileSubNavProps" />
        </div>

        <ds-doc-source
            :comp-code="compCode"
            comp-source="es-ds-components/components/es-mobile-nav.vue"
            :doc-code="docCode"
            doc-source="es-ds-docs/pages/molecules/mobile-nav.vue" />
    </div>
</template>
