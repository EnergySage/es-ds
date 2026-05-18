import type { InjectionKey } from 'vue';

// these constants are used by both EsMenuBar and EsStickyBar
export const ES_MENU_BAR_CLOSE_EVENT_NAME = 'es-menu-bar-close';
export const ES_MENU_BAR_OPEN_CLOSE_DURATION_MS = 200;
export const ES_MENU_BAR_OPEN_EVENT_NAME = 'es-menu-bar-open';

export type EsMenuBarFlyoutAlign = 'start' | 'center' | 'end';

// lets EsMenuBarFlyout register a per-menu align value with its parent EsMenuBar,
// so the single shared Reka Viewport can re-align as the active menu changes
export const ES_MENU_BAR_ALIGNMENT_REGISTRY_KEY: InjectionKey<{
    register: (id: string, align: EsMenuBarFlyoutAlign) => void;
    unregister: (id: string) => void;
}> = Symbol('esMenuBarAlignmentRegistry');

/**
 * Useful when rendering a non-full-width EsMenuBar with a v-for.
 * Pass the result into the 'align' prop on EsMenuBarFlyout to achieve this behavior:
 *  - the first menu flyout will be aligned to the left edge of the trigger
 *  - the middle flyouts will be center aligned
 *  - the last menu flyout will be aligned to the right edge of the trigger
 */
export const esMenuBarFlyoutDefaultAlign = (index: number, arr: any[] | undefined): EsMenuBarFlyoutAlign =>
    !arr ? 'center' : index === arr.length - 1 ? 'end' : index === 0 ? 'start' : 'center';
