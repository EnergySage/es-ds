# EsAutocomplete code review — branch `ceo-683-autocomplete` vs `main`

Date: 2026-09-19. Scope: everything the branch adds except the docs page prose
(explicitly out of scope — still in progress). Questions under review: what have
we built, how much of it exists to work around Reka UI, how risky is Reka's
alpha-stage Autocomplete, is there a simpler implementation, and what can be
reduced or shared.

## 1. Inventory

Production code (excluding tests and docs), by file and role:

| File | Lines | Role |
| --- | --- | --- |
| `es-autocomplete.vue` | 177 | Public API, prop defaults, search wiring, hint/error text |
| `es-autocomplete-desktop.vue` | 475 | Desktop shell: field, panel, positioning, dismissal |
| `es-autocomplete-mobile.vue` | 570 | Mobile takeover: dialog, list sizing, enter/exit choreography |
| `es-autocomplete-item.vue` | 80 | Option rendering + focusability directive |
| `es-autocomplete-highlight-guard.vue` | 45 | Nulls Reka's automatic highlights |
| `es-autocomplete-label.vue` / `-clear-button.vue` / `-suggestion-text.vue` | 102 | Presentation |
| `autocomplete-shell.ts` | ~280 | Shared interaction policy (Enter, mirror, cyclic nav, caret) |
| `autocomplete-search.ts` | 141 | Debounced `complete` contract, staleness, panel messages |
| `fit-to-viewport.ts` | 119 | Whole-row list trimming |
| `autocomplete-content-el.ts` | 23 | Resolves the panel element from a Reka component ref |
| `utils/autocomplete.ts` | 116 | Predictive-bolding text splitter |
| types | 14 | Suggestion/segment shapes |

Roughly **2,100 lines of production code**, plus ~860 lines of tests (58
passing) and the plan document. The docs page and sample data add ~800 lines in
es-ds-docs.

## 2. Workaround census

Every behavior below was added to counteract something Reka's Autocomplete
does. Each is individually documented in code comments and the plan's decision
log; this is the first time they are listed side by side.

| # | Workaround | What it fights | Depth |
| --- | --- | --- | --- |
| 1 | `es-autocomplete-highlight-guard` injects `injectListboxRootContext` and nulls `highlightedElement` | Reka auto-highlights the first item when results arrive; Enter would select something the user never chose | **Internal context injection** |
| 2 | `onEnterKey` in the capture phase | Reka's Enter selects the (possibly automatic) highlight before we can decide submit-vs-select | Event-order dependence |
| 3 | `displayText` mirror layer + synchronous DOM `el.value` write | Copy-on-highlight isn't a Reka feature; the v-model chain patches a flush after Reka's `aria-activedescendant` | Timing dependence on Reka's render |
| 4 | Arrow handlers on the anchor's capture phase | Reka's input-level keydown runs before same-element listeners, moving the highlight before we record its source | **Handler-order dependence** |
| 5 | Cyclic return-to-input + blur/refocus net | Reka's navigation doesn't wrap at list ends | Feature gap |
| 6 | `v-not-focusable` directive stripping `tabindex` per render | Reka hardcodes `tabindex="-1"` on options; its internal binding beats fallthrough attrs | **Post-render DOM patching** |
| 7 | `aria-autocomplete="both"` override on the input | Reka declares `"list"`, wrong for a value-rewriting combobox | Attr override (benign) |
| 8 | De-portaled content, `position="inline"`, own `popover="manual"` + CSS anchor positioning + `positionPanel()` | Reka's popper portal broke screen-reader adjacency and clipped under `overflow: hidden` | **Full replacement of Reka positioning** |
| 9 | Own dismissal: document pointerdown (capture), Tab-order close, Escape; blur never closes | Reka's dismiss layer only exists while the listbox is mounted, and light-dismiss semantics fought the input itself | Full replacement of dismissal |
| 10 | `onFieldFocusout` stopPropagation | Reka's listbox root clears the highlight on focusout to odd targets (screen readers) | Event suppression |
| 11 | `data-es-autocomplete-root` + `closest()` | `$el` through Reka's renderless roots doesn't land on the root element | Ref-shape dependence |
| 12 | `useAutocompleteContentEl` | `$el` is a comment node while unmounted and isn't reactive | Ref-shape dependence |
| 13 | `DialogOverlay` rendered solely to engage the body scroll lock; `aria-describedby=""` neutralization; trigger `aria-label` value folding | Reka Dialog details (lock lives in the overlay; dialog description over-announces; label association suppresses button text) | Small, documented (Dialog is stable-tier) |

Rows 1, 4, 6, 8 are the heavy ones: they depend on Reka **internals** — an
injected context, handler registration order, hardcoded attributes patched
after render, and the removal of an entire subsystem (popper) while keeping
what's left. Rows 2–5 and 9–12 are behavior-order and ref-shape dependencies
that no semver contract covers.

What Reka's Autocomplete still provides after all of this: element id wiring
(`aria-activedescendant`, `aria-controls`), the highlight state machine and
plain up/down movement, Enter/click selection dispatch, and open-state
plumbing. That is a thin core — the isolation lab (`/sandbox/vo-arrows`)
implements the equivalent in about 120 lines of dependency-free code.

Reka's **Dialog** (mobile takeover) is a different story: it is stable-tier and
provides real, hard-to-rebuild value (focus trap, portal, `aria-modal`,
Escape). Its workarounds (row 13) are small and self-contained.

## 3. Alpha-status risk assessment

Reka marks the Autocomplete component **alpha**, i.e. its API and behavior may
change in any release. Our exposure is worse than ordinary API risk, because we
depend on unversioned behavior:

- an internal context injection (`injectListboxRootContext`) whose shape has no
  compatibility promise;
- the **order** in which Reka's own listeners run relative to ours (rows 2, 4);
- hardcoded rendered attributes we strip after every render (row 6);
- the `$el` shapes of renderless roots (rows 11–12);
- empirically established semantics (highlight emit payloads and timing,
  focusout behavior, `position="inline"` scoping) that we verified against
  **2.9.7 specifically**.

Compounding factors:

- `package.json` declares `reka-ui: ^2.8.0`, and `es-ds-components` ships as
  **source** with no build step — every consuming app resolves its own
  `reka-ui` inside that caret range. Two consumers can run different Reka
  versions against identical es-ds source. An alpha component is exactly the
  kind that changes behavior between those versions, and we cannot pin the
  range without pinning it for every other Reka component in the library.
- The failure mode is silent: none of the behaviors above throw when they
  drift; they produce subtle interaction and accessibility regressions of the
  kind that took days to diagnose the first time.

**Verdict: high risk.** This is not "using an alpha API" — it is *extending an
alpha implementation through its internals*, multiplied across an uncontrolled
version range.

## 4. What the VoiceOver investigation showed

Four successive fixes (option focusability, `aria-autocomplete="both"`,
blur/refocus, atomic value/activedescendant updates) were each grounded in a
real difference from working reference implementations, each verified at the
DOM level — and none fixed the arrow-key breakage. The isolation lab then
produced *internally inconsistent* results across sessions (variants 2–5
passed in one run; variants 6–10, several of which are near-identical to 3,
all failed in a later run). Two readings, both instructive:

1. VoiceOver's behavior here varies with session/settings state, so
   single-variant test results are noisy; and
2. whatever governs the failure is not among the attributes we can vary from
   *outside* a library-rendered DOM.

Either way, the strategy of layering compensations onto a base we don't
control has hit its limit: every experiment currently requires fighting the
library first. In first-party code, each of these experiments is a one-line
change.

## 5. Simpler implementation: assessment

**Yes — and most of it is already written.** The custom code on this branch is
not incidental scaffolding around Reka; it *is* the majority of an
implementation. The pieces below are Reka-independent and carry over unchanged:

- `autocomplete-search.ts` (debounce/staleness contract) and its tests
- `fit-to-viewport.ts` and its tests
- `utils/autocomplete.ts` text splitter, `es-autocomplete-suggestion-text`
- label, clear button, item styling, focus-ring styles
- desktop positioning (popover + CSS anchor + `positionPanel`) and dismissal
  policy — these already replaced Reka's
- the mobile takeover choreography
- live regions, hint/description structure, docs page and sample data

What would be replaced is the thin core Reka still provides, as an owned
composable (`useComboboxCore`, est. 120–180 lines — the lab page is the
working prototype): a `highlightIndex`, option id generation,
`aria-activedescendant` on the input we render, up/down movement **with
cycling and mirroring as first-class behavior**, Enter/click selection, and
open state. The immediate dividends, all subtractive:

- highlight guard deleted (no auto-highlight exists unless we create one)
- capture-phase ordering hacks deleted (only our handlers exist)
- mirror timing atomic by construction (one state, one flush)
- `tabindex` directive deleted (we simply don't render the attribute)
- `useAutocompleteContentEl`, `data-es-autocomplete-root`/`closest()`,
  `onFieldFocusout`, `onEnterKey` capture — all deleted (plain template refs,
  no foreign handlers to pre-empt)
- `aria-*` values are decisions, not overrides

Net line count is roughly neutral (≈ –320 workaround lines, +≈150 core), but
the *dependency class* changes: zero internal-API, ordering, or ref-shape
dependencies; every remaining behavior is first-party and directly testable.
The existing test suite survives nearly intact because it tests our logic, not
Reka's.

The mobile Dialog should stay on Reka initially: it is stable-tier, its value
(focus trap, portal, aria-modal) is real, and its workarounds are small. A
native `<dialog show-modal>` is a plausible later simplification (free top
layer, Escape, backdrop) but is not needed to remove the alpha dependency —
after this change the only Reka usage is stable-tier components.

Estimated effort: 1–2 days, concentrated in the two shells and the shell
composable, with the plan doc's decision log as the behavioral spec and the
lab page as the reference DOM. Doing it now — before the component is
published — is the cheapest it will ever be; after release it becomes a
breaking-change conversation.

This also changes the VoiceOver situation: the real component can then be made
attribute-for-attribute and timing-identical to whichever lab variant passes a
*controlled* VO retest, and any further discrepancy is diagnosable in code we
fully control.

## 6. Reduction and sharing opportunities (independent of the rewrite)

- The two shells duplicate the field block (input + clear button + aria wiring
  + comments). Extract an `es-autocomplete-field.vue` used by both; the shells
  keep only what genuinely differs (popover vs takeover).
- `es-autocomplete-mobile.vue` (570 lines) is half choreography. Moving the
  ghost/flight code to `autocomplete-choreography.ts` would make both halves
  readable and the choreography unit-testable (the `settle()` timeout path
  already effectively is).
- Desktop's open/dismissal policy (pointerdown, Tab close, Escape) could move
  into the shell composable next to the rest of the interaction policy, making
  it testable and shared if the takeover ever needs it.
- `revealCaretOnFocus`/`revealCaretAtEnd` are subtle enough to deserve their
  own small composable with the canvas-measure caveat (letter-spacing is not
  accounted for — acceptable, worth a comment).
- The docs page has repetition (out of scope here, per above).

## 7. Smaller findings (worth fixing regardless of direction)

- `es-autocomplete.vue` hardcodes the two hint texts in English; every other
  string is an i18n-able prop. Consider `hintText` / `triggerHintText` props.
- `fit-to-viewport` attaches window resize/scroll listeners for the life of
  the component, not just while open. Harmless (guarded, rAF-coalesced), but
  attach-on-open would be tidier.
- The `^2.8.0` caret on `reka-ui` predates the branch but is worth revisiting
  in the publishing checklist while any alpha-tier Reka component is in use.

## 8. Recommendation

1. **Replace the Reka Autocomplete layer with an owned combobox core** (§5),
   keeping Reka Dialog and all Reka-independent code. This removes the alpha
   dependency, deletes workaround classes 1–12, and makes the VO problem
   tractable.
2. Fold in the sharing refactors (§6) during the rewrite — the shared field
   component falls out naturally.
3. Re-run the VoiceOver lab as a controlled matrix afterward (same session,
   variants re-tested together, component tested alongside its matching
   variant).
4. Keep the lab page until VO is resolved, then delete it.
