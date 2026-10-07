export interface DsMolecule {
    name: string;
    path: string;
}

// the molecules this documentation covers, in the order they are listed. the one
// source of truth for both the index and the autocomplete that searches it, so a
// molecule added here appears in both.
export const DS_MOLECULES_LIST: DsMolecule[] = [
    { name: 'Accordion', path: '/molecules/accordion' },
    //{ name: 'Autocomplete', path: '/molecules/autocomplete' },
    { name: 'Badge', path: '/molecules/badge' },
    { name: 'Breadcrumbs', path: '/molecules/breadcrumbs' },
    { name: 'Button', path: '/molecules/button' },
    { name: 'Card', path: '/molecules/card' },
    { name: 'Checkbox', path: '/molecules/checkbox' },
    { name: 'Collapse', path: '/molecules/collapse' },
    { name: 'Data table', path: '/molecules/data-table' },
    { name: 'Data table simple', path: '/molecules/data-table-simple' },
    { name: 'Dropdown select', path: '/molecules/dropdown-select' },
    { name: 'File input', path: '/molecules/file-input' },
    { name: 'Form message', path: '/molecules/form-message' },
    { name: 'Menu bar', path: '/molecules/menu-bar' },
    { name: 'Mobile nav', path: '/molecules/mobile-nav' },
    { name: 'Modal', path: '/molecules/modal' },
    { name: 'Pagination', path: '/molecules/pagination' },
    { name: 'Popover', path: '/molecules/popover' },
    { name: 'Progress', path: '/molecules/progress' },
    { name: 'Progress circle', path: '/molecules/progress-circle' },
    { name: 'Radio button', path: '/molecules/radio-button' },
    { name: 'Radio cards', path: '/molecules/radio-cards' },
    { name: 'Rating', path: '/molecules/rating' },
    { name: 'Segmented control', path: '/molecules/segmented-control' },
    { name: 'Skeleton', path: '/molecules/skeleton' },
    { name: 'Skip to content link', path: '/molecules/skip-to-content-link' },
    { name: 'Slider', path: '/molecules/slider' },
    { name: 'Sticky bar', path: '/molecules/sticky-bar' },
    { name: 'Support', path: '/molecules/support' },
    { name: 'Tabs', path: '/molecules/tabs' },
    { name: 'Textarea', path: '/molecules/textarea' },
    { name: 'Text input', path: '/molecules/text-input' },
    { name: 'Toggle', path: '/molecules/toggle' },
    { name: 'Tooltip', path: '/molecules/tooltip' },
    { name: 'Verification code', path: '/molecules/verification-code' },
    { name: 'Video', path: '/molecules/video' },
    { name: 'View more', path: '/molecules/view-more' },
];
