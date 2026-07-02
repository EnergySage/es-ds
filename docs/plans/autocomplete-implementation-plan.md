# EsAutocomplete — Implementation Plan (adapted for es-ds)

Goal: build an accessible, SSR-safe search autocomplete **design system component
(`EsAutocomplete`) in `es-ds-components`**, plus an accompanying **documentation page in
`es-ds-docs`**, using **Reka UI** primitives and satisfying all 9 UX best practices from
Baymard's autocomplete research (https://baymard.com/blog/autocomplete-design), plus a
full-screen takeover experience on mobile.

This document is the source of truth for requirements and architecture decisions.
Implement against this spec; ask before deviating from a decision recorded here.

---

## 1. Stack decisions (already made — do not relitigate)

- **Base library:** Reka UI (`reka-ui`) — headless, WAI-ARIA compliant, SSR-compatible.
  Already a devDependency of `es-ds-components` at `^2.8.0`, which includes the
  `Autocomplete*` primitives. **Do not add the `reka-ui/nuxt` module** — this repo's
  convention is direct named imports from `'reka-ui'` inside the component (see
  `es-ds-components/app/components/es-popover.vue`), and `es-ds-components` has no build
  step (consumed as source), so no nuxt.config changes are needed.
- **Primary primitive:** `Autocomplete*` components (NOT `Combobox*`). Autocomplete is
  free-form text — `modelValue` is the input string itself, which is correct for search.
  Docs: https://reka-ui.com/docs/components/autocomplete (LLM-optimized markdown available
  at https://reka-ui.com/docs/components/autocomplete.md).
- **Mobile shell:** Reka UI `Dialog*` components as a full-screen takeover (see §4).
  Not Drawer (swipe-dismiss fights scrolling; drawers want to be partial-height). Note:
  `EsModal` exists but is a general-purpose modal — the takeover shell needs bespoke
  layout (input bar + inline suggestion list), so use the Dialog primitives directly.
- **Filtering:** the component is **presentational** — the consuming app owns fetching,
  debouncing, and filtering (see §5a). Set `ignore-filter` on the root so Reka does not
  re-filter; the app passes the already-trimmed array (see §3).

## 1a. Component API & placement (es-ds conventions)

- Files live in `es-ds-components/app/components/`, kebab-case with the `es-` prefix,
  and are auto-imported into consuming Nuxt apps (`EsAutocomplete` / `<es-autocomplete>`).
- Multi-part components follow the suffix convention (`es-menu-bar-*`, `es-mobile-nav-*`):
  internal shells are separate `es-autocomplete-*.vue` files (see §7). They will be
  globally registered like everything else; document only `EsAutocomplete` as public.
- Props/emits follow existing form-component patterns (`es-form-input`,
  `es-dropdown-select`): typed `defineProps` with `withDefaults`, `defineModel` for
  `v-model`, explicit typed `defineEmits`.
- Breakpoint switching is split by whether the element is visible before interaction —
  the rule is **zero visual shift between SSR HTML load and JS hydration**:
  - **Visible pre-interaction (CSS-only swap):** everything on the page at load — the
    desktop `AutocompleteInput` and the mobile fake-search-field button (§4b) — is
    **always rendered in the SSR HTML** and shown/hidden purely with CSS media queries
    (e.g. `d-none d-lg-block` / `d-lg-none` utilities). No `v-if` on a JS breakpoint
    check for these, so a mobile page never flashes the desktop input and then snaps to
    the mobile one when hydration completes.
  - **Not visible pre-interaction (JS swap allowed):** the popover panel vs. the Dialog
    takeover only exist after the user interacts, so the existing
    `useBreakpointChecks()` composable
    (`es-ds-components/app/composables/breakpoints.ts`) may decide which shell to open,
    as `es-menu-bar`/`es-mobile-nav` do. Its doc comment warns against using it for
    show/hide styling — this use is **behavioral** (two different interaction modes),
    which is what it's for.
  - Verify both: no hydration warnings AND no visual shift at load (§8).

## 2. The 9 Baymard requirements → implementation mapping

| # | Requirement | How we implement it |
|---|------------|---------------------|
| 1 | Keep list manageable (≤10 desktop, 4–8 mobile) | Hard cap constant `MAX_DESKTOP = 10`, `MAX_MOBILE = 8`, further reduced by fit-to-viewport trim (§3) |
| 2 | Style category-scope suggestions differently | Suggestion model has a `scope?` field; scope text rendered in muted color + italic within the item, after the query text. Horizontal separator between unscoped and scoped groups. |
| 3 | Highlight the **predictive** portion, not the typed portion | Typed prefix rendered regular weight; the completed/predictive remainder rendered **bold**. (This is the inverse of most libraries' defaults — implement in our item renderer, do not use any built-in match highlighting.) |
| 4 | Avoid scrollbars | Never set `overflow: auto` on the suggestion list. Overflow is prevented by the fit-to-viewport trim (§3): we only render items that fully fit. |
| 5 | Reduce visual noise | Suggestions only. No trending searches, product cards, images, or promos inside the panel. Minimal separators. |
| 6 | Highlight active suggestion + keyboard nav | Reka provides arrow-key nav, looping, Enter-to-submit, `aria-activedescendant`. Style the highlighted item via its `data-highlighted` attribute (background shading) and `cursor: pointer` on items. **Verify:** arrow-key focus must copy the suggestion text into the input (Google-style) so users can extend the query before submitting. If Reka's Autocomplete does not do this out of the box, wire it: on highlight change, set the input value to the highlighted item's text (preserve the user's original typed query to restore on Escape/blur past the list ends). |
| 7 | Visual depth (desktop) | When the popover is open, dim the page behind it (fixed inset-0 overlay, ~40% black, below the popover's z-index). Border + shadow on the panel. |
| 8 | No competing external elements (mobile) | Solved structurally by the full-screen Dialog takeover (§4) — nothing else is on screen. |
| 9 | Adequate spacing/tap targets (mobile) | Min 44px row height (content may wrap to more), ≥16px font on mobile, generous horizontal padding, title-case suggestion text. |

## 3. Fit-to-viewport trimming (no scrollbars, no clipped items)

Rows may **wrap** (panels can be narrow), so row height is not fixed. Use
measure-then-trim:

1. Render up to the cap (10 desktop / 8 mobile) into the list container.
2. Container has `overflow: hidden` and a max-height:
   - Desktop popover: `max-height: var(--reka-autocomplete-content-available-height)`
     (exposed by Reka's popper positioning when `position="popper"`).
   - Mobile takeover: container height = visual viewport height minus the input bar
     (see §4 keyboard handling).
3. After render (`nextTick`), walk children: count items where
   `offsetTop + offsetHeight <= container.clientHeight`. Slice state to that count
   (min 1).
4. Stability property: an item's height depends only on panel width, not sibling count,
   so trimming never changes remaining heights — converges in one pass, no loop.
5. Re-measure on: suggestions change, container resize (`ResizeObserver`), and on mobile,
   `visualViewport` `resize` events (keyboard open/close is just a resize).
6. Set `visibility: hidden` on the container until the first measurement completes to
   avoid a one-frame flash of clipped items.
7. **Slice the actual array passed to the component** — never hide overflow items with
   CSS. Reka's keyboard nav must only know about visible items.

```ts
// composable sketch — es-ds-components/app/composables/fit-to-viewport.ts
const CAP = isMobile ? 8 : 10
const visibleCount = ref(CAP)
async function remeasure() {
  visibleCount.value = CAP
  await nextTick()
  const el = contentEl.value; if (!el) return
  const limit = el.clientHeight
  let fits = 0
  for (const child of el.children) {
    const c = child as HTMLElement
    if (c.offsetTop + c.offsetHeight <= limit) fits++
    else break
  }
  visibleCount.value = Math.max(fits, 1)
}
const visibleSuggestions = computed(() => suggestions.value.slice(0, visibleCount.value))
```

Do NOT ellipsize suggestions to force single lines: the predictive part (the information
users compare) is at the end of the string. Wrapping is preferred over truncation.

## 4. Two layouts, one core

Build one core suggestion component (input wiring + item rendering + trim logic) and two
shells: takeover below `lg`, popover at `lg` and up. Pre-interaction elements of both
shells are always SSR-rendered and swapped via CSS media queries; only the
post-interaction behavior (which shell opens) switches on `useBreakpointChecks()` —
see §1a. Shared query state.

### 4a. Desktop: anchored popover
- `AutocompleteRoot` → `AutocompleteInput` + `AutocompletePortal` → `AutocompleteContent
  position="popper"`.
- Panel width: `min-width: var(--reka-autocomplete-trigger-width)` plus a comfortable
  `max-width` — the panel MAY be wider than a narrow input (reduces wrapping).
- Page-dim overlay while open (req #7).

### 4b. Mobile: full-screen Dialog takeover
- On-page trigger is a **fake search field** (a `<button>` styled as an input). Tapping
  it opens the Dialog and focuses the real input **synchronously within the tap's event
  chain** (iOS only shows the keyboard for focus inside a user gesture). Use
  `DialogContent`'s `@open-auto-focus` to redirect initial focus to the input.
- Structure: `DialogRoot` → `DialogPortal` → `DialogContent` (fixed inset-0, flex column,
  `height: 100dvh`) containing:
  - top bar: `AutocompleteInput` (full width, flex-1) + `DialogClose` ("Cancel")
  - below: `AutocompleteContent` rendered **inline** (default positioning — no Portal,
    no `position="popper"`), `flex-1`, `overflow: hidden`, trim logic from §3.
- Keep the autocomplete open state pinned while the dialog is open (`:open="true"` or
  equivalent) — the dialog IS the open state.
- Dialog gives us for free: focus trap, body scroll lock, Escape handling, `aria-modal`.

Mobile gotchas (all required):
- **Keyboard vs viewport:** `100dvh` does not shrink when the iOS keyboard opens. Use
  `visualViewport.height` for the trim-limit calculation and listen to its `resize`.
- **Input font-size ≥ 16px** or iOS Safari auto-zooms on focus.
- **Android back button:** push a history state on open; close the dialog on `popstate`
  instead of navigating away.

## 5. Suggestion data model

```ts
// es-ds-components/app/types/es-autocomplete.ts
interface EsAutocompleteSuggestion {
  id: string
  text: string          // full suggested query, e.g. "backpack rain cover"
  scope?: {             // present only for category-scoped suggestions (req #2)
    label: string       // e.g. "in Outdoor Gear"
  }
  value?: unknown       // opaque app payload, returned untouched on select
}
```
Consuming apps pass at most 10; the component trims further per §3. Order: unscoped
suggestions first, then scoped, separated visually.

### 5a. Data ownership (presentational component)

A design system component cannot know the data source (Google Places, search API,
static list…), so — unlike the original app-specific plan — there is **no
`useSearchSuggestions` composable in es-ds**. Instead, mirroring the PrimeVue
AutoComplete contract that `ZipOrAddressInput` consumes:

- `v-model` — the input string.
- `suggestions: EsAutocompleteSuggestion[]` prop — the current list.
- `@complete(query)` — emitted (debounced via a `delay` prop, default ~300ms) when the
  app should fetch/filter new suggestions.
- `@select(suggestion)` — a suggestion was chosen (click or Enter on highlighted item).
- `@submit(query)` — Enter with no highlighted suggestion.

Fetching, session tokens, error states, and validation (everything `ZipOrAddressInput`
does around Google Places) stay in the consuming app. The docs page demos with
client-side filtering of a static array.

## 5b. Starting styles (port from `ZipOrAddressInput`)

Initial look-and-feel comes from `ZipOrAddressInput.vue` in the sibling
`es-storyblok-shared` repo (`app/components/ZipOrAddressInput.vue`), which already uses
es-ds-styles tokens. Port the visual treatment, not the PrimeVue plumbing:

- **SCSS setup:** scoped `<style lang="scss">` with
  `@use '@energysage/es-ds-styles/scss/variables' as variables;`.
- **Input wrapper:** `es-form-input form-control` utility classes; on `:focus-within`,
  `border-color: variables.$blue-600`, `outline: 0.125rem solid variables.$blue-600`,
  `outline-offset: 0.125rem`. Inner `AutocompleteInput` is borderless/transparent with
  `outline: none` on `:focus-visible`; placeholder color
  `variables.$input-color-placeholder`.
- **Panel:** `bg-white rounded-xs text-gray-900` utilities;
  `border: variables.$border-width solid variables.$gray-500`;
  `box-shadow: variables.$popover-box-shadow`. List: `list-unstyled font-size-75 m-0 p-0
  text-left`. Subtle open/close transition (opacity + slight scaleY, ~120ms) like the
  `.es-address-panel` enter/leave states.
- **Items:** `px-100 py-50`, `cursor: pointer`, `transition: background-color 0.15s
  ease-in-out`; hover and highlighted (`[data-highlighted]` in Reka, vs PrimeVue's
  `[data-p-focus]`) background `variables.$blue-50`; `:active` background
  `variables.$blue-100`. Two-line item layout (primary line semibold, secondary line
  `font-size-50`) is available via the item slot, as in the address suggestions.
- **Deliberate divergence:** `ZipOrAddressInput` scrolls its panel
  (`overflow-y: auto`, `scroll-height="17rem"`). Req #4 forbids scrollbars — keep the
  fit-to-viewport trim (§3) and drop the scroll behavior; adopt the visuals only.

## 6. Accessibility acceptance criteria

- Adheres to WAI-ARIA combobox pattern (Reka handles roles/attrs; do not override them).
- Full keyboard: ArrowUp/Down navigates and **loops**; Enter submits the highlighted
  suggestion (or the raw input if none highlighted); Escape closes (desktop) / closes
  the takeover (mobile); Tab behaves sanely.
- Arrow navigation copies suggestion text into the input (see table row #6).
- Highlighted item visually distinct via `data-highlighted` styling.
- Screen reader: list changes announced; item count communicated; label the input
  (visually or via Reka's Label) — do not rely on placeholder alone. Follow
  `ZipOrAddressInput`'s pattern of an `sr-only` label plus `aria-describedby` help text
  ("Type your search and select from dropdown suggestions.").
- Touch targets ≥ 44px; text ≥ 16px on mobile.

## 7. File layout

```
es-ds-components/app/
  components/
    es-autocomplete.vue           # public component; breakpoint switch (§1a) between shells
    es-autocomplete-desktop.vue   # popover shell (§4a) + dim overlay
    es-autocomplete-mobile.vue    # Dialog takeover shell (§4b)
    es-autocomplete-item.vue      # item renderer: predictive bolding + scope styling
  composables/
    fit-to-viewport.ts            # measure-then-trim (§3), visualViewport-aware
  types/
    es-autocomplete.ts            # EsAutocompleteSuggestion (§5); re-export from types/index.ts

es-ds-docs/app/
  pages/molecules/autocomplete.vue      # docs page (§7a)
  components/ds-molecules-list.vue      # add nav link (§7a)
```

### 7a. Documentation page (es-ds-docs)

New page `es-ds-docs/app/pages/molecules/autocomplete.vue`, following the established
doc-page pattern (see `pages/molecules/dropdown-select.vue`):

- `$prism` setup in `onMounted`: raw-import both the component source
  (`@energysage/es-ds-components/app/components/es-autocomplete.vue?raw`) and the doc
  page's own source (`./autocomplete.vue?raw`), normalize and highlight.
- `<h1>Autocomplete</h1>` + intro line "Extended from" linking to
  https://reka-ui.com/docs/components/autocomplete.
- Example sections (each an `<h2>` in a `div.mb-500`, demos in `div.row > div.col-md-6`):
  basic usage (static client-filtered list), scoped suggestions with separator,
  predictive-portion bolding, custom item slot (two-line, address-style), disabled
  state, and a note + demo for the mobile takeover (resize/emulate below `lg`).
- Props documented via `<ds-prop-table :rows="autocompleteProps" />` (rows array of
  `[name, type, default, description]`).
- Emitted events documented in prose or a second table, matching pages that document
  events.
- `<ds-doc-source>` at the bottom with `comp-source="es-ds-components/components/es-autocomplete.vue"`
  and `doc-source="es-ds-docs/pages/molecules/autocomplete.vue"`.
- Register the page in `es-ds-docs/app/components/ds-molecules-list.vue` — alphabetical:
  `<ds-link to="/molecules/autocomplete"> Autocomplete </ds-link>` between Accordion and
  Badge.

## 8. Testing & verification plan (adapted to es-ds)

There is currently **no unit-test infrastructure** for `es-ds-components` (its `npm test`
is a stub; the root `Makefile` has a TODO to add it). Do not build one as part of this
work. Verification is via the repo's quality gates plus manual/browser checks against
the docs page.

### 8a. Repo quality gates (must pass)

```bash
make install && make symlink   # once; symlinks local packages into es-ds-docs
make dev                       # docs site with HMR at http://localhost:8500
make lint                      # eslint + prettier across all three packages
make format                    # run before lint if it complains
make typecheck                 # nuxi typecheck in es-ds-docs (covers linked components)
make build                     # es-ds-styles + es-ds-docs build (es-ds-components has no build step)
make test                      # styles-only today; must still pass
```

SSR is verified through the docs site: `make build` must succeed, and loading
`/molecules/autocomplete` under `make dev` must produce **zero hydration warnings** in
the browser console AND **zero visual shift** between the initial HTML paint and
hydration (§1a). Check with devtools mobile emulation + network throttling (slow
hydration makes any pre-hydration flash obvious); any `v-if` on a JS breakpoint check
for pre-interaction markup is the likely offender.

### 8b. Manual verification checklist (definition of done)

On the docs page at `http://localhost:8500/molecules/autocomplete`:

- [ ] `make lint`, `make typecheck`, `make build`, `make test` all pass
- [ ] SSR: no hydration warnings on page load (desktop and emulated mobile)
- [ ] Zero visual shift at load: on mobile (throttled network), the input area looks
      identical before and after hydration — no desktop-input flash (§1a)
- [ ] Desktop: ≤10 suggestions, no scrollbar at any viewport height, dim overlay,
      hover + keyboard highlight, hand cursor
- [ ] Arrow keys copy suggestion into input; Enter submits it; list loops
- [ ] Predictive portion bolded; typed prefix regular; scoped suggestions styled
      distinctly with separator
- [ ] Visual parity with `ZipOrAddressInput` styling (§5b): focus ring, panel
      border/shadow, item hover/active colors
- [ ] Mobile (devtools emulation + at least one real iOS device): tap fake field →
      full-screen takeover opens with keyboard up in one tap
- [ ] Mobile: suggestions never hidden behind the on-screen keyboard (rotate + small
      devices tested); Android back closes takeover; no iOS focus zoom
- [ ] Wrapped (2-line) suggestions are never clipped mid-item
- [ ] axe/lighthouse a11y pass on both layouts; VoiceOver + TalkBack smoke test
- [ ] Docs page renders correctly: examples, prop table, highlighted source via
      `ds-doc-source`, and the new nav link in `ds-molecules-list.vue`

### 8c. Release notes (post-merge, when publishing)

Per the repo's publishing workflow: bump `es-ds-components` version (minor — new
component), update its `CHANGELOG.md` (keepachangelog format), publish styles first if
it also changed. PR title must be conventional-commit format, e.g.
`feat: add EsAutocomplete component and docs page`.
