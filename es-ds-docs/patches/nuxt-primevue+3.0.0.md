# `nuxt-primevue` 3.0.0 patch

Applied automatically by `patch-package` in the `postinstall` script. Source: `nuxt-primevue+3.0.0.patch`.

`nuxt-primevue` 3.0.0 is the last release of the Nuxt module for PrimeVue 3. It is no longer maintained, so the fixes below live here instead of upstream.

## 1. Allow the module to load on Nuxt 4

**Files:** `dist/module.json`, `dist/module.mjs`

The module declares `compatibility.nuxt: "^3.0.0"`. Nuxt 4 refuses to load it and prints:

```
WARN  Module nuxt-primevue is disabled due to incompatibility issues:
 - [nuxt] Nuxt version ^3.0.0 is required but currently using 4.x
```

The patch widens the constraint to `^4.0.0`. The module works on Nuxt 4 without other changes.

## 2. Add `.d.mts` type declarations for the runtime plugins

**Files:** `dist/runtime/plugin.client.d.mts`, `dist/runtime/plugin.server.d.mts` (new)

The runtime plugins ship as `plugin.client.mjs` and `plugin.server.mjs`, but their declarations are named `plugin.client.d.ts` and `plugin.server.d.ts`. TypeScript only pairs an `.mjs` file with a `.d.mts` file, so the shipped declarations are never found and the client plugin is typed as `any`.

Nuxt 4.4 worked around this: when it generated `.nuxt/types/plugins.d.ts`, it detected the mis-named `.d.ts` and imported the plugin as `plugin.client.js`. Nuxt 4.5 removed that fallback and imports `plugin.client.mjs` directly.

The consequence is severe. Nuxt builds `NuxtAppInjections` as an intersection of every plugin's injected types. One `any` collapses the whole intersection, so the `NuxtApp` augmentation is lost for **all** plugins. Every `$foo` from `useNuxtApp()` falls back to `unknown`. In `es-ds-docs` this showed up as ~160 errors from `npx nuxi typecheck`:

```
error TS2339: Property 'normalizeCode' does not exist on type '{}'.
```

The patch adds a `plugin.client.d.mts` that types the default export as Nuxt's `Plugin`, and a `plugin.server.d.mts` copied from the existing server declaration. With these in place the injection types resolve and the typecheck passes.

## Updating

If `nuxt-primevue` is bumped, `patch-package` will fail to apply. Re-create the patch:

1. Re-apply the two changes above in `node_modules/nuxt-primevue`.
2. Run `npx patch-package nuxt-primevue` from `es-ds-docs`.
3. Run `npx nuxi typecheck` to confirm zero errors.

The long-term fix is to move to PrimeVue 4 and its official `@primevue/nuxt-module`, which removes the need for this patch.
