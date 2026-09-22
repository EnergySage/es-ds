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
| 1 | Keep list manageable | Hard cap `MAX_VISIBLE = 5` in both shells (decision #15), further reduced by fit-to-viewport trim (§3) |
| 2 | Style category-scope suggestions differently | **Descoped (2026-07-06, decision 12):** no current EnergySage use case has category-scoped suggestions, so the `scope` field, its styling, and the group separator were removed. Apps that ever need scope-style rendering can build it with the `item` slot + `value` payload. |
| 3 | Highlight the **predictive** portion, not the typed portion | Typed prefix rendered regular weight; the completed/predictive remainder rendered **bold**. (This is the inverse of most libraries' defaults — implement in our item renderer, do not use any built-in match highlighting.) |
| 4 | Avoid scrollbars | Never set `overflow: auto` on the suggestion list. Overflow is prevented by the fit-to-viewport trim (§3): we only render items that fully fit. |
| 5 | Reduce visual noise | Suggestions only. No trending searches, product cards, images, or promos inside the panel. Minimal separators. |
| 6 | Highlight active suggestion + keyboard nav | Reka provides arrow-key nav, Enter-to-select, `aria-activedescendant`. Style the highlighted item via its `data-highlighted` attribute (background shading) and `cursor: pointer` on items. Keyboard navigation also copies the highlighted suggestion's text into the input display, restoring the typed text when the highlight ends without a selection (decision #17, superseding the original decision to skip this). The keyboard-highlighted item also shows a focus-visible ring (decision #16). |
| 7 | Visual depth (desktop) | When the popover is open with `showOverlayOnFocus` (opt-in, decision #13), dim the page behind it with an overlay matching the existing `.es-menu-bar-overlay` treatment in `es-menu-bar.vue`: fixed, `variables.$black` at 0.25 opacity, `z-index: 999`, below the popover's z-index. Blur/tap-away closes the popover (as it does the menu bar flyouts), so the two overlays are never active simultaneously. Border + shadow on the panel. |
| 8 | No competing external elements (mobile) | Solved structurally by the full-screen Dialog takeover (§4) — nothing else is on screen. |
| 9 | Adequate spacing/tap targets (mobile) | Min 44px row height (content may wrap to more), ≥16px font on mobile, generous horizontal padding, title-case suggestion text. |

## 3. Fit-to-viewport trimming (no scrollbars, no clipped items)

Rows may **wrap** (panels can be narrow), so row height is not fixed. Use
measure-then-trim:

1. Render up to the cap (5, both shells) into the list container.
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
- Page-dim overlay while open, when `showOverlayOnFocus` is set (req #7, decision #13).

### 4b. Mobile: full-screen Dialog takeover
- On-page trigger is a **fake search field** (a `<button>` styled as an input). Tapping
  it opens the Dialog and focuses the real input **synchronously within the tap's event
  chain** (iOS only shows the keyboard for focus inside a user gesture). Use
  `DialogContent`'s `@open-auto-focus` to redirect initial focus to the input.
- Structure: `DialogRoot` → `DialogPortal` → `DialogContent` (fixed inset-0, flex column,
  `height: 100dvh`) containing:
  - top bar: `AutocompleteInput` (full width, flex-1) + `DialogClose` ("Close")
  - below: `AutocompleteContent` rendered **inline** (default positioning — no Portal,
    no `position="popper"`), `flex-1`, `overflow: hidden`, trim logic from §3.
- Keep the autocomplete open state pinned while the dialog is open (`:open="true"` or
  equivalent) — the dialog IS the open state.
- Dialog gives us for free: focus trap, Escape handling, `aria-modal` — and body
  scroll lock, but only via `DialogOverlay` (that's where Reka's `useBodyScrollLock`
  lives, including the iOS `touchmove` preventer; `overflow: hidden` on body does not
  stop touch scrolling on iOS Safari). The takeover therefore renders a transparent
  overlay behind its opaque content purely to engage the lock.

Closing the takeover (decision 2026-07-02):
- **No Android back-button/history handling** — pushing history state risks conflicts
  with vue-router in consuming Nuxt apps. Skipped for now; revisit only if user testing
  shows back-button abandonment.
- Instead, ensure a **clear, always-visible close affordance**: the `DialogClose`
  ("Close") text button in the top bar next to the input. A text button deliberately
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
Consuming apps pass at most 5; the component trims further per §3. (A `scope` field
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
  that comes back empty keeps the panel (and any overlay) open and shows this message —
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

Unit tests now exist for `es-ds-components` (Vitest, added 2026-07-07 — see §8a);
end-to-end and component tests are documented below but deliberately deferred until
after the planned docs-page overhaul. Beyond the automated tests, verification is
via the repo's quality gates plus manual/browser checks against the docs page.

### 8a. Automated tests (partially implemented 2026-07-07)

**Implemented — unit tests (Vitest, run by `npm --prefix es-ds-components run test`,
wired into `make test` and therefore the ci.yml PR workflow):**

- `app/utils/autocomplete.test.ts` — the predictive-bolding utilities: prefix and
  out-of-order token matching, word-start preference with mid-word fallback,
  no-match renders regular, cross-line bolding mode, and the invariant that
  segments always reconstruct the input text exactly.
- `app/composables/autocomplete-shell.test.ts` — the Enter-key decision matrix
  (submit vs select vs ignore: auto-highlight vs user highlight, IME composition,
  Enter from the clear button), select/clear behavior, and the copy-on-highlight
  mirroring (decision #17): keyboard highlights mirror into the display without
  touching the model, pointer and auto-highlights don't, and the typed text is
  restored on ArrowUp-from-first, list changes, and shell resets. These encode
  the two Enter regressions found during the code review.
- `app/composables/autocomplete-search.test.ts` — the debounced `complete`
  contract: one emission per typing pause with the trimmed query, minChars gating,
  suppression after selection, cancellation on submit/unmount so a late response
  can never reopen the panel, post-selection staleness (the app's list matched the
  typed query, not the selection-filled text, so a refocused panel shows the
  prompt until the app answers again), and the prompt → results → no-results →
  prompt-while-pending message lifecycle. Made unit-testable by extracting the
  parent's search state into `useAutocompleteSearch` (2026-07-07), which removed
  the need for the @nuxt/test-utils component test previously deferred below.
- `app/composables/autocomplete-content-el.test.ts` — panel-element resolution:
  resolves only real elements (never Reka's placeholder comment node), clears on
  deactivate, re-resolves a swapped `$el`. Encodes the two `$el` bugs found during
  development (ResizeObserver crash; panel stuck invisible).
- `app/composables/fit-to-viewport.test.ts` — the trim counting/limit logic with
  mocked geometry: only fully-fitting items count, non-item children consume space
  but aren't counted, the min-1 floor, resolved max-height preferred over
  content-sized clientHeight (the grow-back regression), clientHeight fallback for
  the mobile list, re-measure on suggestion change. NOTE: happy-dom has no real
  layout, so this covers the logic only — real-browser behavior belongs to the
  deferred Playwright specs below.

**Deferred — Playwright end-to-end specs (docs site as fixture).** Deliberately NOT
built yet: the docs page is due a complete manual overhaul (examples are
inconsistent with each other and with other docs pages, and downstream integration
of EsAutocomplete may reshape the examples toward real-world use), and these specs
would assert against exactly those examples. Build them once the docs page is
stable, in es-ds-docs with @playwright/test and a webServer config pointing at the
docs site:

1. Focus-model choreography: focus → panel + promptText (+ overlay with
   showOverlayOnFocus); type → items;
   empty response → stays open with noResultsText (promptText mid-flight); clear →
   stays open with promptText; blur/tap-away → closes; select → closes and
   populates v-model.
2. Fit-to-viewport trim: at a short viewport only fully-fitting items render (no
   clipping, no scrollbars), and the list grows back when the window grows
   (regression for review finding 3). Layout-dependent — cannot be tested in
   jsdom/happy-dom, must be a real browser.
3. Mobile takeover (390px viewport): tap the fake field → dialog opens with the
   real input already focused (the one-tap iOS keyboard prerequisite), trimmed
   suggestions render, tap-select closes and updates the fake field, the Close
   button closes. Optionally add an @axe-core/playwright scan of both layouts as an
   a11y smoke test.

**No longer deferred — the component test.** The parent emit contract (debounce,
suppression, cancellation) was originally deferred because testing it required
mounting the SFC under @nuxt/test-utils; extracting the logic into
`useAutocompleteSearch` (2026-07-07) made it a plain Vitest with fake timers
instead — see `autocomplete-search.test.ts` above. No @nuxt/test-utils needed.

### 8b. Repo quality gates (must pass)

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

### 8c. Manual verification checklist (definition of done)

On the docs page at `http://localhost:8500/molecules/autocomplete`:

- [ ] `make lint`, `make typecheck`, `make build`, `make test` all pass
- [ ] SSR: no hydration warnings on page load (desktop and emulated mobile)
- [ ] Zero visual shift at load: on mobile (throttled network), the input area looks
      identical before and after hydration — no desktop-input flash (§1a)
- [ ] Desktop: ≤5 suggestions, no scrollbar at any viewport height, dim overlay
      with showOverlayOnFocus (focus border without it), hover + keyboard highlight,
      hand cursor
- [ ] Arrow keys move the highlight and copy the highlighted suggestion into the
      input (the model/'complete'/bolding stay on the typed text); navigation is
      fully cyclic, passing through the input (typed text restored) at both ends;
      hovering never changes the input; Enter selects the highlighted suggestion
- [ ] Predictive portion bolded; typed/matched portions regular
- [ ] Visual parity with `ZipOrAddressInput` styling (§5b): focus ring, panel
      border/shadow, item hover/active colors
- [ ] Mobile (devtools emulation + at least one real iOS device): tap fake field →
      full-screen takeover opens with keyboard up in one tap
- [ ] Mobile: takeover choreography (decision #21) — the field ghost flies from the
      fake field to the takeover input while the takeover fades in; every close path
      (Close, Escape, selection, submit) flies it back while the takeover fades out,
      landing on the fake field showing the final text; keyboard timing doesn't
      misplace the flight on a real iOS device; prefers-reduced-motion is instant
- [ ] Mobile: suggestions never hidden behind the on-screen keyboard (rotate + small
      devices tested); Close button and Escape close the takeover; no iOS focus zoom
- [ ] Wrapped (2-line) suggestions are never clipped mid-item
- [ ] axe/lighthouse a11y pass on both layouts; VoiceOver + TalkBack smoke test
- [ ] Docs page renders correctly: examples, prop table, highlighted source via
      `ds-doc-source`, and the new nav link in `ds-molecules-list.vue`

### 8d. Release notes (post-merge, when publishing)

Per the repo's publishing workflow: bump `es-ds-components` version (minor — new
component), update its `CHANGELOG.md` (keepachangelog format), publish styles first if
it also changed. PR title must be conventional-commit format, e.g.
`feat: add EsAutocomplete component and docs page`.

## 9. Decision log (resolved 2026-07-02)

Open questions raised during planning, with the decisions now reflected inline above:

1. **No Google-style copy-on-highlight** (req #6): arrow keys move the highlight only.
   Primary use cases (e.g. address entry) are selection-oriented — users pick a whole
   suggestion, they don't compose queries from suggestion fragments.
   **SUPERSEDED by decision #17** — copy-on-highlight is implemented.
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
   takeover instead has an always-visible close button (+ Escape; labeled per
   decision #23). A clear-input X
   (Reka `AutocompleteCancel`) was added 2026-07-06 (per Baymard's clear-button
   examples): an `icon-x` button inside the right edge of the input, shown only when
   the input has text, ≥44px tap target, rendered as a flex sibling so it can never
   overlap the entered text, with an i18n-able `clearText` aria-label. It clears the
   value and refocuses the input. Visually distinct from the takeover's close text
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
13. **Desktop dim overlay is opt-in via `showOverlayOnFocus` (default false)**
    (2026-09-15, refines #5): Baymard's page-dim pattern suits a standalone primary
    search (e.g. site search in a sticky header), but most EnergySage uses are a field
    within a larger form, where (a) no sibling field behaves that way and (b) the
    overlay obscures the rest of the form. With the overlay off, the field indicates
    focus the way es-form-input does (the `$input-focus-border-color` border, via
    `:focus-within` since `form-control` sits on the wrapper while focus lands on the
    inner input); with it on, the field keeps its deliberate no-focus-border styling
    (decision history: the lighter focus border read as the border disappearing
    against the dimmed page) and the `--raised` z-index lift applies only in this
    mode. The overlay markup, `.es-autocomplete-overlay` styling, and z-index layering
    from #5 are unchanged when enabled.
14. **UX-requirements audit fixes** (2026-09-16, from a 17-point Baymard-derived
    requirements review): the fit-to-viewport trim also re-measures on scroll
    (capture-phase listener — the popper tracks its anchor while the page scrolls,
    changing the panel's available height); an sr-only `aria-live="polite"` region
    in the parent announces results arriving (via the `suggestionCountText` prop,
    default "N suggestions available" / "1 suggestion available") and the no-results
    state — the prompt is guidance, not a state change, so it is not announced; the
    takeover's real input carries `aria-describedby`/`aria-invalid`/`required` like
    the desktop input; the suggestion-row highlight transition is guarded by
    `prefers-reduced-motion`; and rows are a uniform ≥48px tall (padding inclusive,
    no margins) on the shared item component, so the desktop popover (which tablets
    at ≥`md` also get on touch) meets the tap-target floor, not just the takeover.
    Revised same day: the trim computes whole rows from the uniform row height
    (available height ÷ one rendered row) instead of walking per-item geometry —
    the walk's reset-render-clip-trim cycle visibly compressed rows every frame
    while scrolling with the panel open. Uniform row height per list is now a
    documented assumption of the trim. The audit's one open feature
    gap — copy-on-highlight during keyboard navigation with original-text restore —
    remains excluded per decision #1, pending a reversal decision.
15. **Cap lowered to 5 suggestions in both shells** (2026-09-16, refines req #1's
    original ≤10 desktop / ≤8 mobile): one consistent `MAX_VISIBLE = 5`, still
    further reduced by the fit-to-viewport trim.
16. **Focus-visible states mirror es-dropdown-select** (2026-09-16, revising #13's
    focus indicator): without the overlay, the focused field shows
    es-dropdown-select's focus ring (`$blue-600` border plus a `0.125rem`
    `$blue-600` outline offset `0.125rem`) — es-form-input's lighter focus
    border lacks the contrast change accessibility asks of a focus state
    (es-form-input to be fixed separately). Applied on `:focus-within` (the
    form-control class sits on the wrapper while focus lands on the inner
    input), which for a text input equals the browser's native `:focus-visible`
    behavior: the ring also shows on mouse click, since browsers match
    `:focus-visible` on any focus of an editable field — accepted as the normal
    platform behavior rather than tracking focus modality by hand. The
    keyboard-highlighted suggestion likewise gets es-dropdown-select's option
    ring — an `::after` border inset `0.125rem`, rounded to the panel's
    `$border-radius-xs` — and while that option ring is showing, the field hides
    its own ring (the focus indicator moves with the navigation, as Google
    Places does); pointer (hover) highlights keep the background shading only,
    the same keyboard/pointer split es-dropdown-select's options make (driven by
    the shell's reactive highlight source). Typing ends keyboard navigation and
    hands the ring back to the field: the input's `input` event resets the
    highlight state, which also keeps Reka's post-typing re-highlight of the
    first item from surviving the guard or being mirrored over the text just
    typed. Overlay mode and the mobile takeover still deliberately show no
    field focus styling — the overlay/takeover is the indicator there.
17. **Copy-on-highlight implemented** (2026-09-16, supersedes decision #1, closing
    the UX audit's requirement 14): keyboard navigation mirrors the highlighted
    suggestion's text into the input, so less-experienced users see exactly what
    selecting will enter. Mechanics (in `useAutocompleteShell`): the input's
    DISPLAYED text is a separate `displayText` bound to `AutocompleteInput`'s own
    v-model — Reka syncs it with the real model on typing and selection, and
    mirroring writes only to it, so the model (and therefore the debounced
    `complete`, the predictive bolding keyed to the typed query, and the
    suggestions-staleness logic) never sees keyboard navigation. Only
    keyboard-sourced highlights mirror (arrow keydowns and panel pointermoves
    record the highlight source; Reka's auto-highlights have none); hovering
    never changes the field. The typed text is restored whenever the highlight
    ends without a selection: arrowing past either end of the list returns to the
    input, making navigation fully cyclic — input → first → … → last → input → …,
    and the same upward (Reka's own navigation does not wrap, so the shell clears
    the highlight via the guard's exposed `clearHighlight` and restores the
    text); likewise when the list changes or the shell closes (Escape/blur).
    Editing a mirrored suggestion
    commits it as the new query, Google-style. Enter semantics are unchanged: a
    keyboard highlight selects, no highlight submits the typed text.
18. **Semantic combobox expansion decoupled from the visual panel** (2026-09-17,
    from VoiceOver testing): Reka's open state (`aria-expanded` + the listbox)
    is gated on real suggestions existing, so a screen reader hears the input's
    own name/role/description uninterrupted on focus and hears "expanded"
    exactly when there is a list to browse — per the combobox pattern. The
    prompt/no-results message renders in an `aria-hidden` lookalike panel
    positioned below the field (not popper-mounted); screen readers get the
    same guidance from the input's `aria-describedby` hint and the live-region
    announcements, and the real listbox only ever contains options, carrying the
    label as its accessible name (`aria-controls`/`id` linking stays Reka's —
    its content id binding wins over fallthrough attrs, so overriding it only
    dangles the reference). Blur never closes the widget: screen readers move
    real DOM focus around it (VoiceOver's keyboard-focus-follows-cursor drags
    focus to the highlighted option, the web area, or nowhere) with
    unpredictable relatedTargets, so any focusout-based close breaks keyboard
    navigation under a screen reader — this was VoiceOver problem (3). Closing
    happens only on deterministic signals: Tab leaving the field (a keydown
    check that knows the field's input → clear-button tab order), Escape,
    select, submit, and a capture-phase document pointerdown listener for
    outside clicks (which also covers the message-only state, where Reka's
    dismiss layer is not mounted). "Outside" means outside the widget's working
    parts — the field, the panels, and the label (whose click hands focus back
    to the input) — not merely outside the root element: the root's own dead
    space (e.g. beside the label) is not focusable, so a click there blurs the
    input and must close the panel with it rather than strand an open list on
    an unfocused field. The takeover's list message is likewise
    `aria-hidden` (the input's description covers it). The takeover deliberately
    has NO dialog-level description: iOS VoiceOver re-announces a dialog's
    `aria-describedby` after every element focused inside it, so the guidance
    text rides only on the input's own `aria-describedby` and the dialog's
    binding is neutralized with `aria-describedby=""` (an empty idref list,
    which also satisfies Reka's missing-description dev warning). The fake
    field's description is its own, distinct text ("Opens a search with
    suggestions as you type."): a button's hint says what activating it does,
    while the input's says what to do once it has focus. A full
    VoiceOver re-test is the user's next verification step; the deferred §8a
    axe scan remains the regression gate.
19. **Desktop listbox is not portaled** (2026-09-17, from VoiceOver testing,
    matching the APG combobox examples): the AutocompletePortal wrapper was
    removed, so the listbox sits in the DOM right after the field — a screen
    reader's spatial navigation (e.g. VoiceOver's ctrl-option-shift-up out of
    the list) lands back next to the input instead of at the end of `<body>`.
    Popper positioning is kept, so flip-above and the available-height
    constraint still work; the panel's z-index 1000 sits above the overlay from
    within the page as it did from the portal. Trade-off: an ancestor with
    `overflow: hidden` (or a transform) could clip or misplace the panel where
    the portal was immune — none of our layouts do this, and the APG examples
    accept the same constraint. The de-portaling also exposed an open-time race
    in the fit-to-viewport trim: the measure on open ran before the popper's
    first positioning wrote the available-height constraint, so a panel opening
    into tight space rendered untrimmed for that open (fixed by deferring every
    measure one frame, as the resize/scroll path already did).
20. **Desktop panels use the native top layer and CSS anchor positioning; Reka's
    popper layer removed** (2026-09-17, native-first architecture decision):
    both desktop panels — the listbox (`AutocompleteContent position="inline"`)
    and the aria-hidden message panel — carry `popover="manual"` (shown from
    script; manual because auto's light-dismiss would treat clicks on our own
    input as outside) and are glued to the field with `anchor-name` /
    `position-anchor` + `anchor()`/`anchor-size()`. Top-layer rendering makes
    them immune to ancestor `overflow: hidden`, transforms, and z-index while
    keeping them in the DOM next to the field (decision #19's screen-reader
    adjacency). The side choice and the row count come from one synchronous
    computation: `positionPanel` (run as the trim's `beforeMeasure` hook)
    compares the natural list height against the space around the field, picks
    below-unless-only-above-fits (the usual popper policy), and writes the
    panel's max-height — which the fit-to-viewport trim then divides into whole
    rows. This deletes the popper's async CSS-variable coupling (the source of
    the open-time race in #19) and the floating-ui dependency for this
    component; the browser tracks the anchor between re-measures (scroll/resize
    listeners re-run the side/limit/count). Anchor positioning is Baseline
    (Chrome/Edge 125, Safari 26, Firefox 147); browsers without it fall back via
    a `CSS.supports` check to in-page absolute placement below the field — no
    popover, no flip, still trimmed and fully functional. Reka is retained
    where it earns its keep: combobox ARIA (roles, ids, aria-activedescendant,
    expanded), the keyboard highlight engine and item collection, selection
    plumbing, and the mobile Dialog. The behavioral policy layer (open model,
    Enter semantics, mirroring, dismissal, trim) is deliberately ours.
21. **Takeover enter/exit choreography** (2026-09-18): the takeover cross-fades
    (~200ms) while a "ghost" of the field flies between the fake field's place
    on the page and the real field's place in the takeover, showing where the
    takeover comes from and returns to. The ghost is an inert clone of the fake
    field animated with the Web Animations API, so the real input keeps its
    synchronous in-tap-chain focus (what makes iOS show the keyboard) and the
    animation is purely presentational. Every close path — the Close button, Escape,
    selection, submit — routes through one animated close that delays the
    actual dialog unmount until the flight lands; the exit ghost carries the
    fake field's look and current (post-selection) text, so it lands exactly as
    the page renders it. Every animation is raced against a short timeout that
    cancels it — a page whose rendering is frozen (hidden or backgrounded tab)
    never advances its animation timeline, and the close must not hang on it.
    `prefers-reduced-motion`, or a browser without `Element.animate`, gets the
    instant behavior. The flight and fades are manual/§8c verification;
    the timeout-recovery path is what a frozen page exercises.
22. **Live announcements count displayed suggestions, per shell** (2026-09-18,
    from mobile VoiceOver testing): announcing the app's list length said
    "8 suggestions available" while the cap and fit-to-viewport trim displayed
    5. Each shell now owns its sr-only live region and announces its own
    `visibleSuggestions` count (or the no-results message, which the search
    composable exposes as `noResultsAnnouncement`); the inactive shell's region
    sits under `display: none`, which silences a live region. The takeover's
    listbox is also `aria-hidden` while it holds no real options, mirroring
    decision #18's desktop semantics, so VoiceOver's dialog summary ("dialog,
    with N items" — its enumeration of the dialog's accessible children: field,
    clear button, Close button, list) does not count an empty list.
23. **The takeover's dismiss button says "Close", not "Cancel"** (2026-09-18):
    dismissing the takeover keeps whatever is in the input — the takeover is
    just a full-screen way of editing the value, so clearing a selection and
    typing a few characters before dismissing leaves those characters as the
    value. That is the intended behavior; "Cancel" would promise a revert that
    never happens. The prop is `closeText` (default `'Close'`).
25. **The Reka Autocomplete layer is replaced by an owned combobox core**
    (2026-09-20, per docs/plans/autocomplete-code-review.md). Reka's
    Autocomplete is alpha-tier, and our integration had accumulated ~12
    workarounds — several depending on Reka internals (an injected context,
    handler order, hardcoded attributes stripped post-render) across an
    uncontrolled `^2.8.0` version range in a source-shipped package.
    `useAutocompleteCombobox` (~200 lines) now owns highlight state,
    aria-activedescendant wiring over non-focusable options, fully cyclic
    navigation, copy-on-highlight (atomic with the activedescendant change, by
    construction — one state, one flush), Enter's submit-vs-select, selection,
    clearing, focus retention, and the caret reveals. `es-autocomplete-field`
    is the shared input+clear component; the choreography moved to
    `autocomplete-choreography.ts` (with `settleAnimation` shared in
    `animation.ts`). Deleted outright: the highlight guard, the content-el
    resolver, the tabindex-stripping directive, the capture-phase ordering
    hacks, the blur/refocus net, and the `$el`/`closest` workarounds. The
    highlighted option now also carries `aria-selected="true"` (the APG/lab
    pattern Reka could not express). Reka remains only for the takeover's
    Dialog (stable-tier: focus trap, portal, aria-modal, Escape).
26. **The desktop panel is a drawer** (2026-09-20): it slides out from
    underneath the field — the edge nearest the user appears first and reveals
    the rest — and retracts back behind it on close (unmount waits for the
    retract; the closing panel is aria-hidden). Structure: an invisible clip
    wrapper owns the anchored/popover positioning and crops ONLY at the field's
    edge via clip-path with negative insets on the other three sides (so the
    panel's shadow survives), while the visual panel inside translates — a
    compositor-animated transform, unlike a height animation. The wrapper hosts
    whichever of the two panels applies, so the prompt/no-results message
    slides exactly like the listbox, and swapping between message and list
    morphs the PANEL's height (the visible bordered box, so shrinking animates
    too — animating the transparent wrapper only shows on growth, where its
    crop reveals the taller panel). A ResizeObserver watches the panel's inner
    content, which the panel's own height keyframes never resize, so every
    event is a real content change and one landing mid-morph retargets from the
    rendered height; this is the one remaining scripted animation, also used
    when the trim renders more or fewer rows. On the flipped side the panel
    pins to the wrapper's bottom via block align-content so the morph reveals
    rows from the top.
    prefers-reduced-motion gets the instant behavior. Typing never plays the
    retract: the search composable holds the previous list until the app
    answers. The slides are pure CSS (2026-09-21): the wrapper stays mounted
    and an --open class transitions the panel's transform, box-shadow, and
    visibility — visibility discretely via transition-behavior: allow-discrete,
    flipping visible at the start of the slide-out and hidden at the end of the
    retract — so interruption/reversal, reduced motion, and frozen-tab recovery
    come from the platform, and only the height morph (a content-driven
    auto-height change CSS cannot transition) remains scripted via
    ResizeObserver + Web Animations with the shared settle guard. The
    always-mounted wrapper is server-rendered, so nothing in its markup may
    branch on client-only capability checks: the anchored-vs-fallback
    positioning split lives in a CSS @supports (anchor-name) block, and the
    popover attribute and position-anchor style are unconditional (inert where
    unsupported — the popover is only ever shown, from script, where anchor
    positioning exists; an author display rule beats the UA's [popover]
    display: none for the fallback). An always-shown popover is also an
    always-present top-layer HIT TARGET: a fully transparent top-layer element
    swallows clicks over its whole box, silently blocking whatever page content
    (or, with certain viewport geometry, the field itself) sits beneath it. The
    wrapper is therefore pointer-events: none permanently, and the panel takes
    pointer events only in the --open state — which also lets clicks reach the
    field through a still-retracting panel. Hiding the popover instead would
    display: none it mid-retract and reintroduce script-driven exit timing.
27. **Desktop dismissal reads focus moves, never a bare blur** (2026-09-21,
    refining decision #18's list of close signals): the panel closes on
    Escape, select, submit, a focusout that names a control outside the root
    (Tab, or a screen reader's linear navigation past the widget — this part
    replaces the Tab-order keydown check), and a capture-phase document
    pointerdown outside the widget's working parts (the field, the panel, and
    the label, per decision #18 — the root's own dead space beside the label
    must close rather than strand an open list on an unfocused field).
    A focusout that names NO control — a null relatedTarget, or the document
    standing in for one as VoiceOver's "web area" — is a focus collapse, not
    the user leaving, and never closes: decision #24's mechanism still applies
    with the options non-focusable, because VoiceOver's
    keyboard-focus-follows-cursor can drag real focus off the input on the
    first ArrowDown anyway, and closing on that ends the interaction mid-navigation
    (the symptom decision #18 originally recorded as VoiceOver problem (3)).
    An outside click blurs the input into the same indistinguishable collapse,
    which is why the pointerdown listener stays: it closes from the pointer
    event, before any focus handling runs. The window itself losing focus
    (alt-tab, devtools) also collapses focus and also needs nothing — the
    interaction resumes on return, per the ignore-window-blur rule.
32. **`blur` is the field being left, not the input losing focus**
    (2026-09-22): forms validate on blur, so the component emits one — but a
    raw blur would fire constantly here. Focus moves to the clear button, into
    the takeover, and (under a screen reader) off the input entirely while the
    list is being read, none of which is the user leaving. So `blur` is emitted
    on exactly the departures the dismissal rules already recognise: focus
    moving to a control outside the widget, and a focus collapse that has not
    come back once the panel is down — the click on non-focusable space that
    decision #27's pointerdown listener dismisses. Escape, select and submit
    never emit: each leaves focus in the input and the interaction continues.
    Nor does a collapse while the panel is still up, which is decision #28's
    VoiceOver excursion — validating there would flag a field the user is in
    the middle of filling. On mobile the same rule reads off the takeover:
    focus leaving the resting field is a blur unless the takeover is open (the
    focus is moving into it, and the takeover is portaled out of the shell's
    root, so its input reads as somewhere else) — the focus Reka hands back on
    close arrives from outside that root and never bubbles through it. One
    emit per visit, so the two paths that can each notice the same departure
    cannot announce it twice.
30. **The mobile trigger is a readonly combobox input, not a button**
    (2026-09-21, superseding decision #24's "fake field" button): a button
    cannot be a form field, and every gap that followed came from that. It
    could carry no value of its own, so the value had to be folded into its
    accessible name (`aria-label="{label}, {value}"`), which then also discarded
    the label's required marker — so `required` was announced on desktop and,
    once the field held a value, nowhere on mobile. `aria-required` and
    `aria-invalid` are not supported on `role="button"` either, leaving the
    error state to `aria-describedby` alone. A readonly `<input role="combobox"`
    fixes all of it at once: the label names it, the value is a value
    (`combobox "Favorite fruit": papaya`, where the button read
    `button "Favorite fruit, papaya"`), and both states apply. `readonly` is
    what makes the tap safe — it denies typing and with it the on-screen
    keyboard, which would otherwise open on the trigger and again in the
    takeover — and it costs native constraint validation, which a readonly
    field is barred from; blocking submit stays the app's job on mobile, as the
    docs say. `role="combobox"` with a dialog popup is the shape APG's combobox
    pattern describes ("the popup may be a listbox, grid, tree, or dialog") and
    its date-picker example implements; Reka's DialogTrigger renders it via
    `as="input"` and supplies aria-haspopup, aria-expanded, aria-controls and
    the opening click, while the keys that activate a button (Enter, Space)
    and the combobox's ArrowDown are bound on the element, which a button got
    from the browser. Three knock-ons: es-ds-styles paints `[readonly]` exactly
    like `:disabled` (gray, borderless, `color` with `!important`), so the
    resting field re-asserts the normal field look for the non-disabled case;
    the ghost clone now carries `value` by hand, since an input's value is a
    property that `cloneNode` does not copy; and the ghost is a wrapper around
    that clone rather than the clone itself, because the clear button's clone
    has to render inside it and an `<input>` cannot have rendered children —
    appended to the input it was simply invisible, so the real button appeared
    to pop in when the takeover was revealed. `aria-readonly="false"` states what the HTML attribute cannot:
    the value is not typed over, but the user does change it, in the takeover
    the field opens. iOS VoiceOver announces "read only" anyway (device-tested
    2026-09-21) — WebKit maps the native attribute straight to the AX trait and
    ARIA does not override it there — and then offers "double tap to edit",
    which is the action that works, so the pair reads as contradictory but
    actionable. The alternative, dropping `readonly` for `inputmode="none"`,
    would trade a wording quirk for a keyboard that opens on the trigger and
    again in the takeover wherever iOS ignores that value, plus keystrokes to
    intercept for anyone on a Bluetooth keyboard; the attribute stays.

    Positioning a long value took two tries. Predicting it — measure the landing
    input, then `text-align: right` — was wrong twice over: `scrollWidth`
    exceeds `clientWidth` by a sub-pixel rounding artifact even for an EMPTY
    input, so the test was always true, and `text-align` does nothing on an
    input once its value overflows, which is the only case it was meant for. So
    short values jumped to the right edge and long ones still showed their
    start. The fix stops predicting: the ghost is held at its own scroll end for
    the flight (a frame loop, because the flight animates the box's width and
    the browser re-clamps `scrollLeft` against it). That reproduces both cases
    without asking which one it is — a value that fits clamps to zero and stays
    start-anchored — and the end is where both real fields leave a long value,
    the takeover's input because the caret is there, the resting field because
    it holds focus after the close and the browser keeps that caret in view.

    What that end is measured FROM is the second half: the two fields reserve
    different space for their text, because only the takeover's carries a clear
    button. `textInsets` reads each end's real padding and real button width
    (never a hardcoded `2.75rem`, which was off by the button's true 44px) and
    the flight animates the clone's padding between them, over the same 300ms
    the button clone spends fading in. So the reserved space arrives gradually
    and the scroll hold slides the value's end along with it — measured across
    an enter flight, the text's right edge runs 359px → 268 → 253 against a
    landing field at 252, where before it sat at 297 and stepped 45px on
    handoff. Two catches worth remembering. `px-100` (and the clear button's
    `h-100`) is `!important`, and an important declaration outranks an
    animation, so the clone drops those classes for the animated padding and
    insets to apply at all. And the button clone is pinned inside the field's
    BORDER — the real field lays its button out in its content box, so an inset
    of zero put the clone a border's width too far out and 2px too tall, which
    showed as the button stepping 1px left on handoff.
31. **`autocomplete` is a prop, defaulting to 'off'** (2026-09-21): the token
    rides on the real input in both shells (the trigger stays 'off' — browsers
    skip readonly fields, and the token belongs where text is really entered).
    'off' remains the default because the browser's own saved-value dropdown
    competes with the suggestion list; a field that maps to a real autofill
    token (an address, a name) can trade the other way and get the browser's
    saved value, which is the more valuable side of that trade for an address
    form. Any interference between the two dropdowns is left to be seen in
    practice.
29. **The shell switch is the breakpoint AND `(hover: none)`** (2026-09-21):
    the takeover is for small TOUCH screens, so the width test alone was the
    wrong question — a desktop page zoomed to 200-400% (WCAG 1.4.10 reflow)
    narrows past `md` and handed a mouse-and-keyboard user a tap-to-open
    dialog, where clicking the field and typing no longer works. Pairing the
    breakpoint with the primary input's hover capability keeps that user on the
    popover. The query lives in the public wrapper, not in the two shells: one
    rule decides both, so neither shell knows or cares whether it is the one on
    screen. It stays pure CSS because both shells are server-rendered with one
    under `display: none` — there is no capability check to hydrate and no
    flash of the wrong shell, which is why this is not a `matchMedia` ref. The
    desktop overlay, teleported to the body and so outside the wrapper, needs
    no gate of its own: it renders only while that shell is open, which it
    cannot be while hidden. A touch device
    that misreports hover keeps the popover, which a finger operates fine; that
    is the safer way for the query to be wrong. Cost: narrowing a desktop
    browser no longer shows the takeover, so the docs point at device emulation
    instead.
28. **Only the arrows' own echo gets focus back, and entering the field clears
    the highlight** (2026-09-21, from VoiceOver testing): the collapse of
    decision #27 has two causes that look identical in the event, so the arrow
    handler marks each press (`consumeArrowBlur`, a 250ms one-shot window — the
    accessibility sync lands within a frame or two of the keypress, while a
    human cannot answer the spoken suggestion that fast). A collapse inside the
    window is the rewrite's echo and hands focus back to the input, re-arming
    text entry so the arrows keep walking the list. Every other collapse
    belongs to the user: their VoiceOver cursor is exploring the page, DOM focus
    is left exactly where it went, and chasing it would drag them back into the
    widget — the cursor does not follow, so the field would silently reclaim
    focus behind them. Then `focusin` at the field clears the highlight,
    because arriving at the input is a fresh interaction from the typed text: a
    highlight surviving the excursion keeps `aria-activedescendant` pointed into
    the list, and VoiceOver landing on the input follows it straight back out to
    the active option. Without that reset, stepping out of the listbox by hand
    (ctrl-option-shift-up) and walking back two items to the field bounced
    focus onto the first suggestion every time, so the input could never be
    rested on. Our own restore is exempt: it continues the navigation the
    collapse interrupted rather than beginning one.
24. **Suggestion options are not focusable, and the takeover's Close button
    follows the list in the DOM** (2026-09-19, from VoiceOver testing on both
    platforms). Reka hardcodes `tabindex="-1"` on options (its internal binding
    beats fallthrough attrs), which makes them programmatically focusable —
    VoiceOver's keyboard-focus-follows-cursor then drags real focus off the
    input onto the highlighted option after the first ArrowDown, and the input
    stops receiving arrow keys (Google's and Amazon's comboboxes avoid this by
    leaving options with no tabindex at all). `es-autocomplete-item` strips the
    attribute with a local directive (mounted + updated), so focus can never
    leave the input during navigation and the full cyclic arrow behavior works
    identically under VoiceOver. Safe because `AutocompleteInput` sets the
    listbox non-focusable: Reka moves the highlight via `aria-activedescendant`
    and selects via `click()`, never by focusing items. Even then VoiceOver's
    cursor followed `aria-activedescendant` out to the options — after the
    first ArrowDown, further arrows became VoiceOver commands instead of
    reaching the input. An isolation lab (five bare comboboxes at
    `/sandbox/vo-arrows`, one ingredient apiece, VoiceOver-tested by hand)
    pinned the decisive ingredient: **the value rewrite**. When the field's
    value changes together with `aria-activedescendant`, VoiceOver treats the
    arrow press as in-field autocomplete navigation and stays anchored in text
    entry (the classic APG pattern without a rewrite fails this VoiceOver
    workflow outright; even options with `tabindex="-1"` pass once the rewrite
    is there). Google and Amazon both rewrite the value, which is why they
    work. Our copy-on-highlight already rewrote it — but a microtask too late:
    the mirror deferred through nextTick and a two-component v-model chain, so
    activedescendant patched one flush before the value, and VoiceOver read
    that first flush as "cursor left the field". The fix makes the mirror
    atomic with the highlight: the shells' arrow handlers moved to the anchor's
    capture phase (they must record the highlight source before Reka's own
    input-level handler moves the highlight — Reka's runs first at the target),
    and onHighlight writes the input's DOM value synchronously in the same
    keydown, so value and activedescendant always change in one flush. The
    input also declares `aria-autocomplete="both"` (the semantic for exactly
    this rewriting behavior, as Google declares), and the cyclic
    return-to-input blur/refocuses the already-focused input as a safety net
    that re-arms text entry if an AT's cursor wandered anyway; sighted users
    see nothing from either. Separately, the
    takeover's DOM order is field → list → Close button, so a screen reader's
    linear navigation reaches the suggestions right after the clear button; the
    root is a wrapping flex row whose `order` classes keep the Close button
    visually beside the field with the list on the line below.
