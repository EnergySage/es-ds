<script setup lang="ts">
import { esMenuBarFlyoutDefaultAlign } from '#imports';
import { siteNavigationSampleItems } from '@/utils/nav-sample-items';

definePageMeta({
    layout: 'minimal',
});

const alignExampleItemsDesktop = siteNavigationSampleItems[0]?.items || [];
const alignExampleItemsMobile = alignExampleItemsDesktop.slice(0, 2);

const esMenuBarProps = [
    [
        'class',
        'string',
        "''",
        `
        The CSS class name(s) to apply to the nav container element. Prevents the CSS classes from being
        passed into Reka UI's NavigationMenuRoot.
        `,
    ],
    [
        'full-width',
        'boolean',
        'false',
        `
        If true, EsMenuBarFlyout will take up the full width of the browser, have a branded color bar
        at the bottom, and expect to have EsMenuBarFlyoutColumn components as children. If false,
        EsMenuBarFlyout will be 300px wide and expect to have EsMenuBarFlyoutLink components as children.
        `,
    ],
    [
        'height',
        'number',
        '40',
        `
        The height of the menu bar in pixels.
        `,
    ],
    [
        'show-overlay-when-open',
        'boolean',
        'true',
        `
        If true, the menu bar will assume it's positioned at the top of the viewport and when a menu is open,
        will lock page scrolling and show a semi-transparent overlay. If false, no overlay will be shown and
        the menu can be positioned anywhere on the page.
        `,
    ],
];

const esMenuBarEvents = [
    [ES_MENU_BAR_CLOSE_EVENT_NAME, 'none', 'Fires when a submenu is closed.'],
    [ES_MENU_BAR_OPEN_EVENT_NAME, 'none', 'Fires when a submenu is opened.'],
];

const esMenuBarLinkProps = [
    [
        'href',
        'string',
        'n/a',
        `
        Required. The URL destination of the link.
        `,
    ],
    [
        'target',
        'string',
        "'_self'",
        `
        Indicates whether the link should open in a new window.
        `,
    ],
];

const esMenuBarFlyoutProps = [
    [
        'align',
        "'start' or 'center' or 'end'",
        "'center'",
        `
        Only applies in menu bars that are not full width. Controls the horizontal alignment of the
        flyout relative to its trigger. 'start' will align the flyout's left edge to the trigger's left edge.
        'end' will align the flyout's right edge to the trigger's right edge. 'center' will center the flyout
        relative to the trigger.
        `,
    ],
];

const esMenuBarFlyoutColumnProps = [
    [
        'heading',
        'string',
        "''",
        `
        The column heading.
        `,
    ],
];

const esMenuBarFlyoutLinkProps = [
    [
        'href',
        'string',
        'n/a',
        `
        Required. The URL destination of the link.
        `,
    ],
    [
        'name',
        'string',
        'n/a',
        `
        Required. The link text.
        `,
    ],
    [
        'target',
        'string',
        "'_self'",
        `
        Indicates whether the link should open in a new window.
        `,
    ],
];

const { $prism } = useNuxtApp();
const compCode = ref('');
const docCode = ref('');

onMounted(async () => {
    if ($prism) {
        const compSource = await import('@energysage/es-ds-components/app/components/es-menu-bar.vue?raw');
        const docSource = await import('./menu-bar.vue?raw');

        compCode.value = $prism.normalizeCode(compSource.default);
        docCode.value = $prism.normalizeCode(docSource.default);
        $prism.highlight();
    }
});
</script>

<template>
    <div>
        <es-container class="d-flex justify-content-center">
            <!-- smaller full width overlay example for viewing on mobile -->
            <es-menu-bar
                class="d-lg-none"
                full-width
                :height="88">
                <es-menu-bar-item>
                    <es-menu-bar-trigger> Menu 1 </es-menu-bar-trigger>
                    <es-menu-bar-flyout class="px-100">
                        <es-menu-bar-flyout-column heading="Column 1">
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 1" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 2" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 3" />
                        </es-menu-bar-flyout-column>
                        <es-menu-bar-flyout-column heading="Column 2">
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 4" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 5" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 6" />
                        </es-menu-bar-flyout-column>
                    </es-menu-bar-flyout>
                </es-menu-bar-item>
                <es-menu-bar-item>
                    <es-menu-bar-trigger> Menu 2 </es-menu-bar-trigger>
                    <es-menu-bar-flyout class="px-100">
                        <es-menu-bar-flyout-column heading="Column 3">
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 7" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 8" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 9" />
                        </es-menu-bar-flyout-column>
                        <es-menu-bar-flyout-column heading="Column 4">
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 10" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 11" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 12" />
                        </es-menu-bar-flyout-column>
                    </es-menu-bar-flyout>
                </es-menu-bar-item>
                <es-menu-bar-item>
                    <es-menu-bar-trigger> Menu 3 </es-menu-bar-trigger>
                    <es-menu-bar-flyout class="px-100">
                        <es-menu-bar-flyout-column heading="Column 5">
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 13" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 14" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 15" />
                        </es-menu-bar-flyout-column>
                        <es-menu-bar-flyout-column heading="Column 6">
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 16" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 17" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 18" />
                        </es-menu-bar-flyout-column>
                    </es-menu-bar-flyout>
                </es-menu-bar-item>
            </es-menu-bar>

            <!-- desktop full width overlay example -->
            <es-menu-bar
                class="d-none d-lg-block"
                full-width
                :height="88">
                <es-menu-bar-item
                    v-for="item in siteNavigationSampleItems"
                    :key="item.name">
                    <es-menu-bar-trigger>
                        {{ item.name }}
                    </es-menu-bar-trigger>
                    <es-menu-bar-flyout>
                        <es-menu-bar-flyout-column
                            v-for="section in item.items"
                            :key="section.name"
                            :heading="section.name">
                            <es-menu-bar-flyout-link
                                v-for="link in section.items"
                                :key="link.name"
                                :href="link.href || ''"
                                :name="link.name" />
                            <es-menu-bar-flyout-link
                                v-if="section.cta?.href"
                                :href="section.cta.href || ''"
                                :name="section.cta.heading" />
                        </es-menu-bar-flyout-column>
                    </es-menu-bar-flyout>
                </es-menu-bar-item>
            </es-menu-bar>
        </es-container>
        <ds-main-layout>
            <h1>Menu bar</h1>
            <p>
                Extended from
                <nuxt-link
                    to="https://reka-ui.com/docs/components/navigation-menu"
                    target="_blank">
                    Reka UI NavigationMenu
                </nuxt-link>
            </p>
            <p>
                The menu bar offers a horizontal menu of links or menu triggers that can open either a small flyout
                containing a list of links, or a full-width flyout containing multiple columns of links.
            </p>
            <p>
                By default, it will show a semi-transparent overlay when a menu flyout is open. The overlay assumes the
                menu is positioned at the top of the viewport. If you need to use the menu in another position (i.e.
                mid-page), be sure to disable the overlay.
            </p>

            <div class="my-300">
                <h2>Basic example</h2>
                <p>
                    This shows the default behavior, except disables the semi-transparent overlay (which is on by
                    default) so the example can be more easily shown within the flow of this page.
                </p>
                <es-menu-bar :show-overlay-when-open="false">
                    <es-menu-bar-item>
                        <es-menu-bar-trigger> Menu 1 </es-menu-bar-trigger>
                        <es-menu-bar-flyout>
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 1" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 2" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 3" />
                        </es-menu-bar-flyout>
                    </es-menu-bar-item>
                    <es-menu-bar-item>
                        <es-menu-bar-trigger> Menu 2 </es-menu-bar-trigger>
                        <es-menu-bar-flyout>
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 4" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 5" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 6" />
                        </es-menu-bar-flyout>
                    </es-menu-bar-item>
                    <es-menu-bar-item>
                        <es-menu-bar-trigger> Menu 3 </es-menu-bar-trigger>
                        <es-menu-bar-flyout>
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 7" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 8" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 9" />
                        </es-menu-bar-flyout>
                    </es-menu-bar-item>
                    <es-menu-bar-item>
                        <es-menu-bar-trigger> Menu 4 </es-menu-bar-trigger>
                        <es-menu-bar-flyout>
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 10" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 11" />
                            <es-menu-bar-flyout-link
                                href="https://www.energysage.com"
                                name="Item 12" />
                        </es-menu-bar-flyout>
                    </es-menu-bar-item>
                </es-menu-bar>
            </div>

            <div class="my-300">
                <h2>Flyout alignment</h2>
                <p>
                    This shows the recommended flyout alignment for menus. The first flyout will position at the left
                    edge of its trigger, the last flyout at the right edge of its trigger, and all others will be
                    centered. You can control the alignment of each menu flyout as necessary.
                </p>
                <!-- mobile example with fewer items -->
                <es-menu-bar
                    class="d-lg-none"
                    :show-overlay-when-open="false">
                    <es-menu-bar-item
                        v-for="(item, index) in alignExampleItemsMobile"
                        :key="item.name">
                        <es-menu-bar-trigger>
                            {{ item.name }}
                        </es-menu-bar-trigger>
                        <es-menu-bar-flyout :align="esMenuBarFlyoutDefaultAlign(index, alignExampleItemsMobile)">
                            <es-menu-bar-flyout-link
                                v-for="link in item.items"
                                :key="link.name"
                                :href="link.href || ''"
                                :name="link.name" />
                        </es-menu-bar-flyout>
                    </es-menu-bar-item>
                </es-menu-bar>
                <!-- desktop example with more items -->
                <es-menu-bar
                    class="d-none d-lg-block"
                    :show-overlay-when-open="false">
                    <es-menu-bar-item
                        v-for="(item, index) in alignExampleItemsDesktop"
                        :key="item.name">
                        <es-menu-bar-trigger>
                            {{ item.name }}
                        </es-menu-bar-trigger>
                        <es-menu-bar-flyout :align="esMenuBarFlyoutDefaultAlign(index, alignExampleItemsDesktop)">
                            <es-menu-bar-flyout-link
                                v-for="link in item.items"
                                :key="link.name"
                                :href="link.href || ''"
                                :name="link.name" />
                        </es-menu-bar-flyout>
                    </es-menu-bar-item>
                </es-menu-bar>
            </div>

            <div class="my-300">
                <h2>Links and icons</h2>
                <p>
                    In addition to menus, the menu bar also supports top-level links. Here's an example of a menu bar
                    with three links. The height has also been customized and icons have been added to each link.
                </p>
                <es-menu-bar :height="60">
                    <es-menu-bar-item>
                        <es-menu-bar-link href="https://www.energysage.com/solar/">
                            <icon-solar
                                class="mr-50"
                                height="28px"
                                width="28px" />
                            Home solar
                        </es-menu-bar-link>
                    </es-menu-bar-item>
                    <es-menu-bar-item>
                        <es-menu-bar-link href="https://www.energysage.com/energy-storage/">
                            <icon-battery-charging-vertical
                                class="mr-50"
                                height="28px"
                                width="28px" />
                            Home batteries
                        </es-menu-bar-link>
                    </es-menu-bar-item>
                    <es-menu-bar-item class="d-none d-sm-block">
                        <es-menu-bar-link href="https://www.energysage.com/ev-charging/">
                            <icon-charging-station
                                class="mr-50"
                                height="28px"
                                width="28px" />
                            EV charging
                        </es-menu-bar-link>
                    </es-menu-bar-item>
                </es-menu-bar>
            </div>

            <div class="my-300">
                <h2>Full width</h2>
                <p>
                    The full width menu is best used with the semi-transparent overlay left on, which requires that the
                    menu bar be at the top of the page. Scroll to the top of this page to see an example of a full
                    width menu.
                </p>
                <p>
                    Links should be displayed in columns when using the full width menu. The columns are responsive and
                    will show one per row on mobile, two per row starting at the <code>md</code> breakpoint, three at
                    <code>lg</code> breakpoint, and four at <code>xl</code> breakpoint and above. Keep in mind, though,
                    that the menu bar is primarily meant for use at <code>lg</code> breakpoint and above, depending on
                    how many menu items it needs to have. For smaller breakpoints, consider using the
                    <nuxt-link to="/molecules/mobile-nav">mobile nav</nuxt-link>.
                </p>
            </div>

            <div class="my-300">
                <h2>EsMenuBar props</h2>
                <p>
                    All props except the ones below will be passed through to Reka UI's
                    <nuxt-link
                        to="https://reka-ui.com/docs/components/navigation-menu#root"
                        target="_blank">
                        NavigationMenuRoot
                    </nuxt-link>
                    component.
                </p>
                <ds-prop-table :rows="esMenuBarProps" />
            </div>

            <div class="my-300">
                <h2>EsMenuBar global events</h2>
                <p>
                    These events are not emitted directly by the component, but are instead transmitted via the
                    <code>useEsdsEvents</code> composable and can be subscribed to via <code>on()</code> and
                    <code>off()</code> methods.
                </p>
                <p>
                    <nuxt-link to="/molecules/sticky-bar">Sticky bar</nuxt-link> consumes these events in order to wait
                    for the menu to be closed before it changes its background from white to transparent.
                </p>
                <ds-prop-table
                    :columns="['Name', 'Payload', 'Description']"
                    :rows="esMenuBarEvents"
                    :widths="{
                        md: ['4', '2', '6'],
                    }" />
            </div>

            <div class="my-300">
                <h2>EsMenuBarLink props</h2>
                <p>This component will generate a link at the top level of the menu bar.</p>
                <ds-prop-table :rows="esMenuBarLinkProps" />
            </div>

            <div class="my-300">
                <h2>EsMenuBarFlyout props</h2>
                <ds-prop-table :rows="esMenuBarFlyoutProps" />
            </div>

            <div class="my-300">
                <h2>EsMenuBarFlyoutColumn props</h2>
                <ds-prop-table :rows="esMenuBarFlyoutColumnProps" />
            </div>

            <div class="my-300">
                <h2>EsMenuBarFlyoutLink props</h2>
                <p>This component will generate a link within a flyout column in a full width menu.</p>
                <ds-prop-table :rows="esMenuBarFlyoutLinkProps" />
            </div>

            <ds-doc-source
                :comp-code="compCode"
                comp-source="es-ds-components/components/es-menu-bar.vue"
                :doc-code="docCode"
                doc-source="es-ds-docs/pages/molecules/menu-bar.vue" />
        </ds-main-layout>
    </div>
</template>
