# Nuxt 4 dev server slowness — investigation and resolution

## Status: RESOLVED via local patch

**Root cause:** Nuxt 4.4+ enables `impound`'s import-graph trace pass (PR [nuxt/nuxt#34454](https://github.com/nuxt/nuxt/pull/34454), shipped in Nuxt 4.4.0) with `trace: true` hardcoded and no config knob to disable. `impound`'s `traceTransform` does a BFS over the full module-import graph (up to 20 levels deep) on every `.vue` transform. On `es-ds-components`'s ~975-file auto-imported layer, that walk costs ~30s per slow nav.

**Fix:** patched locally via `patch-package` — see `es-ds-docs/patches/impound+1.1.5.patch`. The patch short-circuits `traceTransform` **only when `process.env.NODE_ENV === 'development'`**, so dev mode is fast and every other environment (production, staging, integration, test, or `NODE_ENV` unset) retains the full import-protection reporting. The main import-protection plugin (`name: "impound"`) is unmodified — only the trace pass is skipped in dev.

**Verification:** with the patch applied, second-page navigation drops from ~30–40s to near-instant. CPU profile confirms `traceTransform` no longer appears as a hot function.

## What the patch means in plain language

**What Nuxt's import protection does:** it's a built-in safety check that catches certain kinds of mistakes when one file references code from another file. The classic mistake it prevents: code in a `server/` folder that holds things like database passwords or API keys should run on the server only and never get bundled into the JavaScript that browsers download. If you accidentally write `import { dbPassword } from '~/server/secrets'` in a browser-facing component, Nuxt normally throws an error: "nope, that would leak server-only code to the client."

**What our patch changes:**

- **Local dev only (`nuxt dev` / `make dev`)** — these guardrails are silently turned off. If you write a forbidden import, the dev server just shrugs and keeps going. No error, no warning.
- **Everywhere else (production builds, staging, integration, test, CI)** — the guardrails run as designed. The build fails with a clear error message before any problematic code can be deployed.

**What this means in practice:**

- **For `es-ds-docs`:** zero impact. It's a frontend-only docs site — no server code, no API routes, no secrets to leak. There is literally nothing for these guardrails to protect.
- **For downstream EnergySage repos that DO have server code:** you trade an *immediate* dev-mode error for a *"your build broke right when you tried to deploy"* error. Both prevent the bad code from reaching users. The prod-build catch just feels later in your workflow — you might write a problematic import on Tuesday and only find out on Friday when you try to ship.

The patch never lets dangerous code ship to production. It just lets it sit quietly in your dev environment without complaining, until the build tries to catch it.

## Symptoms (before fix)

Run `make dev` in `es-ds-docs`, then in the browser:

- `/` (index page) — TTI ~10s
- click any nav link as second navigation — TTI ~30–40s (page-agnostic)
- third+ navigations — varies by page complexity (Spacing/Badge near-instant, File Input ~10s, Menu Bar ~30s)
- once every page has been visited once — all subsequent navigations near-instant
- reproducible on multiple developer machines, including a personal machine outside the corporate IT environment

## Evidence trail

Investigation proceeded by ruling out hypotheses with direct observation rather than plausibility arguments. Documenting the full trail because the dead ends are valuable: each one is a hypothesis that *seems* reasonable for a Nuxt/Vite dev-mode slowness report and would otherwise tempt re-investigation later.

1. **No `[vite]`/`optimizeDeps`/reload messages in the dev server console during the slow nav.** The Vite on-demand `optimizeDeps` re-bundle pattern has a characteristic signature; it is absent here.
2. **Page-agnostic second-nav timing.** Typography (no Reka, no PrimeVue, trivial markup), Segmented Control (PrimeVue, no Reka), and Site Navigation (heavy Reka) all take ~30–40s as the second nav.
3. **`[vue-tsc] Found 0 errors. Watching for file changes.` appears only on first nav.** vue-tsc runs once during initial dev startup, then stays idle. It does not run during the slow second nav.
4. **Complete server console silence during the 35s gap.**
5. **Network tab: 611 requests on the slow second nav, but a single request dominates.** `/_nuxt/pages/atoms/typography.vue` took **28 seconds** for the server to respond. Browser-side waterfall is not the issue — a single server-side transform is.
6. **Third+ navigation timing varies with page complexity.** Per-page first-visit transform cost scales with imports; cached afterward.
7. **`make unlink` did not help.** Symlink boundary is not the cause.
8. **Removing all non-core modules (`@nuxt/image`, `@nuxt/eslint`, `motion-v/nuxt`) and disabling `devtools` did not help.** The cost is in Nuxt's core pipeline.
9. **CPU profile is decisive.** `node --cpu-prof` capturing the slow nav shows `traceTransform` in `node_modules/impound/dist/index.mjs` consuming ~36 seconds of self time. Everything else is microseconds in comparison.

Evidence #9 was the smoking gun. Once we had it, the remaining work was understanding *why* `traceTransform` ran, and how to disable it without losing legitimate functionality.

## What we wrongly hypothesized along the way

Before the CPU profile, the investigation pursued several plausible-but-wrong root cause theories. Documenting them so they're not re-litigated:

| Wrong hypothesis | Evidence that ruled it out |
|---|---|
| Vite `optimizeDeps` re-bundle on second nav | No `optimizeDeps` console signature. |
| Reka UI fan-out as universal primary cause | Typography (no Reka) was just as slow. |
| PrimeVue tree-shaking quirks as primary | Typography (no PrimeVue) was just as slow. |
| `typescript.typeCheck: true` gating second-nav | vue-tsc message appears only on first nav. Disabling typeCheck had no effect on second-nav. |
| Prism client plugin re-init | Runtime cost too small; doesn't fit silent server. |
| Browser-side dev module waterfall | 611 requests is moderate; one 28s server request dominates. |
| Vite `server.warmup` to pre-transform pages at startup | Nuxt 4 ignores the legacy `vite.server.warmup` config — its Environment-API equivalent path is hard to mutate from `vite:extendConfig`. Even if we'd landed it, warming source `.vue` files wouldn't have addressed `impound`'s import-graph trace. |
| Symlinked layer boundary slowing module resolution | `make unlink` did not improve second-nav. |
| `@nuxt/eslint` / `@nuxt/image` / `motion-v/nuxt` / devtools running inline | Disabling them all simultaneously did not improve second-nav. |
| "One-time TS Program init + per-page transform cost" composite theory | Looked correct from observable symptoms (page-agnostic 2nd nav + complexity-varying 3rd+ navs), but turned out to be impound's trace doing graph walks of different costs based on the importing module's transitive deps. |

The mitigation plan in earlier drafts of this doc (Vite `server.warmup`, drop `typescript.typeCheck`, drop server sourcemaps, expand `optimizeDeps.include` for Reka subpaths) was speculation based on those wrong hypotheses. None of those steps would have helped the actual root cause.

## Root cause (in detail)

[`unjs/impound`](https://github.com/unjs/impound) is Nuxt's import-restriction Vite plugin. It enforces things like "server-only code can't be imported from client code" by checking each module's imports against forbidden-path patterns.

In [PR nuxt/nuxt#34454](https://github.com/nuxt/nuxt/pull/34454) (merged March 2026, shipped in Nuxt 4.4.0), Nuxt opted into `impound`'s **trace** mode by setting `trace: true` in its plugin config. The trace mode walks each module's full import graph (BFS, default `maxTraceDepth: 20`) so that when a violation is detected, the error message can show the chain of imports back to the original entry point. This is helpful for debugging violations.

In Nuxt 4.4.x, `trace: true` is **hardcoded** in `node_modules/nuxt/dist/index.mjs:7079-7104` with no config knob to disable. There is no `experimental.importProtectionTrace` flag, no env var, no Nuxt option that surfaces it.

`traceTransform` runs as part of every `.vue` transform. Its cost is O(modules × imports), and on the ~975-file auto-imported layer in `es-ds-components` it's about 36 CPU-seconds per slow nav.

Subsequent navigations after the first slow one are fast because Vite's transform cache holds the results — `traceTransform` doesn't re-run on cached modules.

## Fix

`es-ds-docs/patches/impound+1.1.5.patch` — short-circuits `traceTransform` at the top of the function body:

```js
async function traceTransform(code, id, getCombinedSourcemap) {
    // Dev-only short-circuit. See es-ds-docs/patches/impound-1.1.5-patch-investigation.md
    // for the full investigation. Nuxt 4.4+ enables impound's trace pass
    // (PR nuxt/nuxt#34454) with no opt-out config knob. On large auto-import
    // surfaces, the BFS module-graph walk costs ~30s per .vue transform in dev.
    // We gate on === 'development' (not !== 'production') so that any
    // non-dev environment — production, staging, integration, test,
    // or NODE_ENV unset — retains full import-protection reporting.
    if (process.env.NODE_ENV === 'development') return;
    await init;
    // ...rest of original function
}
```

The patch is applied by `patch-package` (already configured in `es-ds-docs/package.json`'s `postinstall` script alongside existing patches for `nuxt-primevue` and `prismjs`). It survives `npm install`.

**Dev (`nuxt dev` / `make dev`):** `NODE_ENV` is `'development'`, so the trace pass is skipped entirely. Because Nuxt hardcodes `trace: true` in impound's config and impound's main plugin only reports through the trace pass when `trace: true`, **all import-protection violations are silently dropped in dev**. The main plugin still runs and detects violations — but the reports queue into `pendingViolations` and never flush. Practical impact for frontend-only sites (like `es-ds-docs`) with no server-only code paths is negligible.

**Every other environment (production, staging, integration, test, `NODE_ENV` unset):** the patch is a no-op. `traceTransform` runs unmodified, the module graph is built normally, and violations are reported with full trace chains. The protection guarantee for any non-dev pipeline is preserved.

**Net result of the patch:** zero impact on anything except local dev; ~30s saved per `.vue` transform in dev.

## Why we didn't fix this via `nuxt.config.ts` hooks

Three hook attempts to filter or neutralize the trace plugin via `vite:extendConfig` failed:

1. Filtering `viteConfig.plugins` by name — found 0 matches.
2. Filtering both top-level `viteConfig.plugins` and `viteConfig.environments.*.plugins` — found 0 matches.
3. Neutralizing the plugin in-place by setting its hook methods to `undefined` — also found 0 matches.

At the time `vite:extendConfig` fires in Nuxt 4.4, impound's plugins are not yet present in either the top-level or per-environment plugin arrays exposed to the hook. They're added to a Nuxt-internal location that gets merged into the final Vite config later. We'd need a different (and probably undocumented) lifecycle hook to intercept them. `patch-package` is more reliable and more honest about what we're doing — patching upstream code that has no surfaced opt-out.

## Follow-ups

### 1. File an upstream Nuxt issue
There is currently no open issue about this performance regression. Worth filing at `nuxt/nuxt` requesting either:
- A config option to disable the trace pass: `experimental.importProtectionTrace: false`, or
- Making `trace: false` the default in dev with opt-in for the diagnostic detail.

`patch-package` will print "💡 impound is on GitHub! To draft an issue based on your patch run `npx patch-package impound --create-issue`" — but the issue should go to `nuxt/nuxt` (the place that opted into `trace: true`), not `unjs/impound` (which exposes the option and is performing as designed).

Reference the CPU profile, link this doc, and link Nuxt PR #34454.

### 2. Re-evaluate when Nuxt or impound ships a fix
Watch for:
- A new Nuxt version that exposes a config knob for import-protection tracing.
- A new `impound` version that adds an option to skip trace for specified paths/layers.

When that lands, remove the patch.

### 3. Consider also patching `es-ds-components/node_modules/impound`
The patch currently only covers `es-ds-docs/node_modules/impound` because that's where `make dev` runs. If `es-ds-components` ever gains its own dev server (e.g., a Storybook or component playground that runs Nuxt), it will need a similar patch.

## Critical files

- `es-ds-docs/patches/impound+1.1.5.patch` — **the fix**.
- `es-ds-docs/package.json` — `postinstall: patch-package && nuxt prepare` already in place.
- `es-ds-docs/node_modules/impound/dist/index.mjs` — line 284, where `traceTransform` is defined; the patch inserts an early `return;`.
- `node_modules/nuxt/dist/index.mjs:7079-7104` — where Nuxt registers impound with hardcoded `trace: true`.

## Background

- Nuxt PR [#34454](https://github.com/nuxt/nuxt/pull/34454) — added `trace: true` to import protection.
- Nuxt PR [#34382](https://github.com/nuxt/nuxt/pull/34382) — Nuxt 4.4.0 release containing the above.
- `unjs/impound` source: [`src/index.ts`](https://github.com/unjs/impound/blob/main/src/index.ts) — the `traceTransform` BFS walk lives here.
