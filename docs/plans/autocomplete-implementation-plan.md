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
- **Form-API parity (decision 2026-07-02):** match the other es-ds form inputs —
  `label`, `required`, `state` (true/false/null) and an `errorMessage` slot, per the
  `es-form-input`/`es-dropdown-select` patterns. Additionally support hiding the label
  (e.g. a `hideLabel` prop that renders it `sr-only`) so the autocomplete can stand on
  its own with only placeholder text describing it visually — the label still exists
  for screen readers.
- **Two `AutocompleteRoot`s (decision 2026-07-02):** Reka expects one input per root,
  and the mobile input lives inside the Dialog — so each shell gets its own
  `AutocompleteRoot`, both bound to the same `v-model` string and `suggestions` prop.
  Only one is interactive at a time (the other's trigger is CSS-hidden, §1a below).
  Give each shell distinct element ids/labels so the always-rendered markup never
  duplicates ids.
- Breakpoint switching is split by whether the element is visible before interaction —
  the rule is **zero visual shift between SSR HTML load and JS hydration**:
  - **Visible pre-interaction (CSS-only swap):** everything on the page at load — the
    desktop `AutocompleteInput` and the mobile fake-search-field button (§4b) — is
    **always rendered in the SSR HTML** and shown/hidden purely with CSS media queries
    (`d-none d-md-block` / `d-md-none` utilities; takeover below `md` — decision
    2026-07-02). No `v-if` on a JS breakpoint check for these, so a mobile page never
    flashes the desktop input and then snaps to the mobile one when hydration
    completes.
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
| 2 | Style category-scope suggestions differently | **Descoped (2026-07-06, decision 12):** no current EnergySage use case has category-scoped suggestions, so the `scope` field, its styling, and the group separator were removed. Apps that ever need scope-style rendering can build it with the `item` slot + `value` payload. |
| 3 | Highlight the **predictive** portion, not the typed portion | Typed prefix rendered regular weight; the completed/predictive remainder rendered **bold**. (This is the inverse of most libraries' defaults — implement in our item renderer, do not use any built-in match highlighting.) |
| 4 | Avoid scrollbars | Never set `overflow: auto` on the suggestion list. Overflow is prevented by the fit-to-viewport trim (§3): we only render items that fully fit. |
| 5 | Reduce visual noise | Suggestions only. No trending searches, product cards, images, or promos inside the panel. Minimal separators. |
| 6 | Highlight active suggestion + keyboard nav | Reka provides arrow-key nav, looping, Enter-to-submit, `aria-activedescendant`. Style the highlighted item via its `data-highlighted` attribute (background shading) and `cursor: pointer` on items. **Decision (2026-07-02):** we deliberately SKIP the Google-style "arrow key copies suggestion text into the input" behavior. Primary use cases are selection-oriented (e.g. address entry) where users pick a whole suggestion rather than building a query from pieces. Arrow keys move the highlight only; the typed input is unchanged; Enter selects the highlighted suggestion. (Verified against installed reka-ui 2.9.7 that this is also Reka's default behavior — no extra wiring needed.) |
| 7 | Visual depth (desktop) | When the popover is open, dim the page behind it with an overlay matching the existing `.es-menu-bar-overlay` treatment in `es-menu-bar.vue`: fixed, `variables.$black` at 0.25 opacity, `z-index: 999`, below the popover's z-index. Blur/tap-away closes the popover (as it does the menu bar flyouts), so the two overlays are never active simultaneously. Border + shadow on the panel. |
| 8 | No competing external elements (mobile) | Solved structurally by the full-screen Dialog takeover (§4) — nothing else is on screen. |
| 9 | Adequate spacing/tap targets (mobile) | Min 44px row height (content may wrap to more), ≥16px font on mobile, generous horizontal padding, title-case suggestion text. |

## 3. Fit-to-viewport trimming (no scrollbars, no clipped items)

Rows may **wrap** (panels can be narrow), so row height is not fixed. Use
measure-then-trim:

1. Render up to the cap (10 desktop / 8 mobile) into the list container.
2. Container has `overflow: hidden` and a max-height:
   - Desktop popover: `max-height: var(--reka-combobox-content-available-height)`
     (exposed by Reka's popper positioning when `position="popper"`; note the
     **combobox** naming — the `Autocomplete*` content components are re-exported
     Combobox internals in the installed reka-ui 2.9.x, and no `--reka-autocomplete-*`
     variables exist).
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
shells: **takeover below `md`, popover at `md` and up** (decision 2026-07-02 — phones
get the takeover; tablets get the popover). Pre-interaction elements of both shells are
always SSR-rendered and swapped via CSS media queries; only the post-interaction
behavior (which shell opens) switches on `useBreakpointChecks()`'s `isMobile` (true
below `md`) — see §1a. Each shell has its own `AutocompleteRoot` (§1a); query state is
shared via the same `v-model`.

### 4a. Desktop: anchored popover
- `AutocompleteRoot` → `AutocompleteInput` + `AutocompletePortal` → `AutocompleteContent
  position="popper"`.
- Panel width: `min-width: var(--reka-combobox-trigger-width)` (combobox naming — see
  §3) plus a comfortable `max-width` — the panel MAY be wider than a narrow input
  (reduces wrapping).
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

Closing the takeover (decision 2026-07-02):
- **No Android back-button/history handling** — pushing history state risks conflicts
  with vue-router in consuming Nuxt apps. Skipped for now; revisit only if user testing
  shows back-button abandonment.
- Instead, ensure a **clear, always-visible close affordance**: the `DialogClose`
  ("Cancel") text button in the top bar next to the input. A text button deliberately
  avoids visual conflict with a possible future X-in-the-input to **clear the field**
  (Reka ships `AutocompleteCancel` for exactly that — worth considering as an
  iteration, but if added, close-takeover and clear-input must remain visually
  distinct). Escape also closes (Dialog default).

Mobile gotchas (all required):
- **Keyboard vs viewport:** `100dvh` does not shrink when the iOS keyboard opens. Use
  `visualViewport.height` for the trim-limit calculation and listen to its `resize`.
- **Input font-size ≥ 16px** or iOS Safari auto-zooms on focus.

## 5. Suggestion data model

```ts
// es-ds-components/app/types/es-autocomplete.ts
interface EsAutocompleteSuggestion {
  id: string
  text: string          // full suggested query, e.g. "backpack rain cover"
  value?: unknown       // opaque app payload, returned untouched on select
}
```
Consuming apps pass at most 10; the component trims further per §3. (A `scope` field
for category-scoped suggestions existed here originally — removed per decision 12.)

### 5a. Data ownership (presentational component)

A design system component cannot know the data source (Google Places, search API,
static list…), so — unlike the original app-specific plan — there is **no
`useSearchSuggestions` composable in es-ds**. Instead, mirroring the PrimeVue
AutoComplete contract that `ZipOrAddressInput` consumes:

- `v-model` — the input string.
- `suggestions: EsAutocompleteSuggestion[]` prop — the current list.
- `minChars` prop, **default 1** (decision 2026-07-02, per UX guidelines) — no
  `@complete` emitted below this length. `ZipOrAddressInput`'s 2-character minimum was
  a Google Places quota/usefulness concern, which is app-level: address-entry consumers
  can pass `:min-chars="2"`.
- `noResultsText` prop, default "No results found" (decision 2026-07-02, superseding
  the earlier closed-when-empty behavior): once suggestions have been shown, a search
  that comes back empty keeps the panel and overlay open and shows this message —
  closing them mid-typing was a jarring flicker. The message never shows while the
  first search is still in flight (an empty list then just means "no answer yet"), and
  the panel still closes when the query drops below `minChars`, on Escape, tap-away,
  select, or submit.
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
- Arrow navigation moves the highlight only — the typed input is unchanged (see table
  row #6); Enter selects the highlighted suggestion.
- Highlighted item visually distinct via `data-highlighted` styling.
- Screen reader: list changes announced; item count communicated; the input always has
  a label — visible by default (form-API parity, §1a), rendered `sr-only` when
  `hideLabel` is set, so placeholder-only presentations still label the control. Also
  provide `aria-describedby` help text as `ZipOrAddressInput` does ("Type your search
  and select from dropdown suggestions.").
- Touch targets ≥ 44px; text ≥ 16px on mobile.

## 7. File layout

```
es-ds-components/app/
  components/
    es-autocomplete.vue           # public component; breakpoint switch (§1a) between shells
    es-autocomplete-desktop.vue   # popover shell (§4a) + dim overlay
    es-autocomplete-mobile.vue    # Dialog takeover shell (§4b)
    es-autocomplete-item.vue      # item renderer: predictive bolding
    es-autocomplete-suggestion-text.vue  # public inline renderer of predictive-bolding
                                  # segments; takes text+query, or pre-computed segments
                                  # (from splitAutocompleteTextLines or API match offsets)
  composables/
    fit-to-viewport.ts            # measure-then-trim (§3), visualViewport-aware
  utils/
    autocomplete.ts               # splitAutocompleteText — token-based predictive-bolding
                                  # segments (req #3), used by the default item renderer and
                                  # exported for custom item slot renderers (auto-imported in
                                  # consuming apps)
  types/
    es-autocomplete.ts            # EsAutocompleteSuggestion + EsAutocompleteTextSegment (§5);
                                  # re-export from types/index.ts

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
  basic usage (static client-filtered list),
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
- [ ] Arrow keys move the highlight without changing the typed input; Enter selects
      the highlighted suggestion; list loops
- [ ] Predictive portion bolded; typed/matched portions regular
- [ ] Visual parity with `ZipOrAddressInput` styling (§5b): focus ring, panel
      border/shadow, item hover/active colors
- [ ] Mobile (devtools emulation + at least one real iOS device): tap fake field →
      full-screen takeover opens with keyboard up in one tap
- [ ] Mobile: suggestions never hidden behind the on-screen keyboard (rotate + small
      devices tested); Cancel button and Escape close the takeover; no iOS focus zoom
- [ ] Wrapped (2-line) suggestions are never clipped mid-item
- [ ] axe/lighthouse a11y pass on both layouts; VoiceOver + TalkBack smoke test
- [ ] Docs page renders correctly: examples, prop table, highlighted source via
      `ds-doc-source`, and the new nav link in `ds-molecules-list.vue`

### 8c. Release notes (post-merge, when publishing)

Per the repo's publishing workflow: bump `es-ds-components` version (minor — new
component), update its `CHANGELOG.md` (keepachangelog format), publish styles first if
it also changed. PR title must be conventional-commit format, e.g.
`feat: add EsAutocomplete component and docs page`.

## 9. Decision log (resolved 2026-07-02)

Open questions raised during planning, with the decisions now reflected inline above:

1. **No Google-style copy-on-highlight** (req #6): arrow keys move the highlight only.
   Primary use cases (e.g. address entry) are selection-oriented — users pick a whole
   suggestion, they don't compose queries from suggestion fragments.
2. **Two `AutocompleteRoot`s**, one per shell, sharing `v-model`/`suggestions` (§1a) —
   matches Reka's one-input-per-root expectation.
3. **Takeover breakpoint: below `md`** (§4) — phones get the takeover, tablets the
   popover.
4. **Form-API parity** with es-ds inputs (`label`, `required`, `state`, `errorMessage`)
   plus `hideLabel` for placeholder-only presentation (§1a, §6).
5. **Desktop dim overlay matches `.es-menu-bar-overlay`** (`$black` @ 0.25,
   `z-index: 999`) (req #7). Blur closes the popover, so the menu bar and autocomplete
   overlays are never active at once.
6. **`minChars` defaults to 1** (§5a) — ZipOrAddressInput's 2-char minimum was a Google
   Places quota concern, which stays app-level.
7. **No Android back-button/history handling** (§4b) — router-conflict risk; the
   takeover instead has an always-visible Cancel button (+ Escape). A clear-input X
   (Reka `AutocompleteCancel`) was added 2026-07-06 (per Baymard's clear-button
   examples): an `icon-x` button inside the right edge of the input, shown only when
   the input has text, ≥44px tap target, rendered as a flex sibling so it can never
   overlap the entered text, with an i18n-able `clearText` aria-label. It clears the
   value and refocuses the input. Visually distinct from the takeover's Cancel text
   button, as required.
8. **Title-casing is the consumer's data responsibility** — the component renders
   suggestion text as given; document this on the docs page.
9. **Empty results keep the panel open** (§5a, `noResultsText`) — supersedes the
   original closed-when-empty behavior after it proved to be a jarring overlay flicker
   when a longer query stopped matching mid-typing.
   **Revised 2026-07-06 (e-commerce-style focus model):** on desktop the panel and
   overlay now open on input focus and close on blur (or Escape/select/submit),
   staying up for the entire interaction — suggestion changes only swap the panel's
   content, never open or close it. With nothing to show, the panel displays a
   `promptText` message (default "Type for suggestions"); once a search has actually
   come back empty (tracked by the parent from suggestions-prop updates, so it never
   shows mid-flight), it displays `noResultsText` — including for a first query that
   never matches anything. The mobile takeover shows the same prompt/no-results
   messages in its list area.
10. **Selection-required use cases (e.g. address validation) stay app-level**
    (2026-07-06): the component deliberately has no `requireSelection` mode. Per the
    §5a data-ownership split, the app tracks the last `select`-ed suggestion,
    invalidates it when the input text no longer matches it, and treats the `submit`
    event as a validation trigger (`state=false` + `errorMessage`) instead of a
    search. Demonstrated in the docs page's "Requiring a selection" example; this is
    the same pattern `ZipOrAddressInput` uses around PrimeVue today.
11. **Predictive bolding is token-based and presentation-only** (2026-07-06): the
    `splitAutocompleteText` utility (also used by the default item renderer) splits
    the query on whitespace and matches each token case-insensitively, preferring
    word starts ("st" matches "St", not the middle of "Boston") and falling back to
    anywhere for tokens with no word-start match ("3" highlights within "123"), so
    query terms highlight in any order ("boston main"). It never decides what
    matches — the app's suggestion source already did — so a backend match it cannot
    see (typo tolerance, synonyms) benignly renders regular rather than wrongly bold.
    For suggestions rendered as multiple lines, `splitAutocompleteTextLines` decides
    bolding across all lines together: a line without its own token match still
    renders fully bold when another line matched, since it is part of what selecting
    adds (no match anywhere → everything regular). The `EsAutocompleteSuggestionText`
    component (also used by the default item renderer) renders the segments so apps
    don't hand-roll the span loop: pass `text` + `query` for a single string, or
    pre-computed `segments` (from `splitAutocompleteTextLines` or from API match
    offsets), with app classes applied directly to it. The DS deliberately ships no
    API-specific helpers (e.g. for Google Places `matched_substrings` offsets): apps
    whose search API returns match offsets build their own segments in a custom
    `item` slot renderer.
12. **Category-scope suggestions removed** (2026-07-06, supersedes req #2): the
    `scope` field, its muted-italic styling, the unscoped-before-scoped ordering, and
    the group separator were all removed — Baymard's recommendation applies to
    category-scoped search results, and no current EnergySage use case has them. If
    one appears, scope-style rendering can be built entirely app-side with the `item`
    slot and the `value` payload, or the feature can be reintroduced from this plan's
    history.
