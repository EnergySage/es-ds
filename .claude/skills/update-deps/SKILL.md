---
name: update-deps
description: Walks through refreshing npm dependencies across the three packages in the es-ds monorepo (`es-ds-styles`, `es-ds-components`, `es-ds-docs`) and bumping `.node-version` to the latest LTS. Use this skill whenever the user says "update deps", "bump versions", "do a dependency update", "refresh package.json", asks to upgrade a specific dep like Nuxt/Vue/ESLint/Reka, or otherwise indicates they want to refresh outdated packages in this repo — even if they don't say the word "skill". Also use when the user mentions bumping `.node-version`. The skill handles the shared-version guardrail between `es-ds-components` and `es-ds-docs` (the latter consumes the former as a Nuxt layer) and intentionally excludes PrimeVue from automatic bumps.
---

# Update dependencies in es-ds

This skill refreshes npm dependencies across the three packages in this monorepo (`es-ds-styles`, `es-ds-components`, `es-ds-docs`) and updates `.node-version` to the latest LTS.

It exists because:

1. The docs site is the only thing you can really *exercise* a dep change against, so a baseline-then-diff loop is the cheapest way to catch regressions.
2. `es-ds-docs` consumes `es-ds-components` as a Nuxt layer — shared deps must stay at the same major/minor in both, or layer resolution can quietly pull two different copies.
3. PrimeVue is intentionally pinned and should not be auto-bumped here.

Three jobs are non-negotiable: establish a baseline, make the version changes consistently across packages, and re-verify against the baseline — falling back to older versions rather than papering over breakage. Then hand off to the human. **Do not commit anything along the way.** The user will review the diff and commit themselves.

`e2e/` also has its own `package.json` but is out of scope for this skill — leave it alone unless the user explicitly asks otherwise.

## Step 1: Baseline the dev server

Before touching anything, capture what "working" looks like *today* so you can compare after the bump.

```bash
make install
```

Then start the dev server in the background and watch for it to come up on port 8500:

```bash
make dev   # run_in_background: true
```

Use the Monitor tool (or tail the background process) until you see the `Local: http://localhost:8500` line. Then write down, in your working notes:

- Whether the server actually started
- Every warning, deprecation notice, peer-dep complaint, or unresolved-import message that scrolled past during `make install` *and* `make dev` startup
- Any errors that didn't prevent startup

This list is the diff target for Step 6. Kill the dev server before moving on.

While you're baselining, also run `make format`, `make test`, `make typecheck`, and `make build` once on the *current* tree so you know whether they pass before the bump. If any of them is already failing, treat that the same as a broken dev server — stop and report rather than stacking a dep update on top of pre-existing breakage.

If the baseline is already broken, **stop and report**. Don't stack a dep update on top of a pre-existing failure — you'll lose the ability to attribute new breakage.

## Step 2: Clean slate

Remove install artifacts so the next install pulls fresh resolutions rather than reusing whatever's already locked:

```bash
rm -rf es-ds-styles/node_modules es-ds-styles/package-lock.json
rm -rf es-ds-components/node_modules es-ds-components/package-lock.json es-ds-components/.nuxt es-ds-components/.output
rm -rf es-ds-docs/node_modules es-ds-docs/package-lock.json es-ds-docs/.nuxt es-ds-docs/.output
```

`.nuxt` and `.output` may not exist in every package — `rm -rf` is a no-op when they're absent, which is fine.

## Step 3: Bump `.node-version` to latest LTS

The `.node-version` file at the repo root pins the Node version for the team and CI. The repo uses **`nodenv`** as the Node version manager — not nvm or asdf. Look up the current latest LTS:

- Use WebFetch on `https://nodejs.org/en/about/previous-releases` and find the highest version line in **Active LTS**. Do not fall back to Maintenance LTS — only Active LTS is acceptable here.
- Pin to a concrete `major.minor.patch` (e.g., `24.15.0`), not a bare major.

If the current `.node-version` is already on the latest Active LTS line, leave it alone and skip the install step below.

If you change `.node-version`, immediately run:

```bash
nodenv install   # installs the version now declared in .node-version
```

This is required — without it, `node` and `npm` will fail or silently resolve to the wrong version when you hit Step 5. If `nodenv install` reports the version is already installed, that's fine; move on.

## Step 4: Find latest versions and propose bumps

For each of the three `package.json` files, walk through `dependencies` and `devDependencies`. For each entry, get the latest published version:

```bash
npm view <package-name> version
```

(Use `npm view <package-name> dist-tags --json` if you're unsure whether `latest` is a stable release vs. a prerelease.)

### Exclusions — do not bump these automatically

- `primevue`
- `nuxt-primevue`
- `@energysage/es-ds-styles` and `@energysage/es-ds-components` — these are published from *this* repo; their specifiers are managed by the release-please workflow, not by this skill.

### Shared-version guardrail (critical)

`es-ds-docs` extends `es-ds-components` as a Nuxt layer. Any dep that appears in **both** `es-ds-components/package.json` and `es-ds-docs/package.json` must end up at the **same major.minor** in both. If they drift, `es-ds-components` may rely on functionality working differently than the installed version in `es-ds-docs` will provide.

Don't trust a hardcoded list — compute the overlap from the current `package.json` files at the time you run this. As of the most recent check the overlap included `nuxt`, `vue`, `vue-tsc`, `typescript`, `sass`, `@nuxt/eslint`, `@nuxtjs/google-fonts`, `@phosphor-icons/vue`, `@vuelidate/core`, `@vuelidate/validators`, `@vueuse/core`, `eslint`, `eslint-config-prettier`, `prettier`, `html-truncate`, `maska`, `mitt`, `prismjs`, `reka-ui` — but this drifts, so re-derive it.

### Surface possible breaking changes

For every bump that **crosses a major version**, do a quick changelog scan and call out anything load-bearing:

- Removed or renamed APIs
- Dropped Node / Vue / Nuxt / TypeScript support
- Peer-dep changes that could ripple
- Config-format changes (e.g., ESLint flat config)

A one-line summary per major bump is enough — e.g., "ESLint 9: requires flat config; legacy `.eslintrc` no longer supported." Don't paste full changelogs. Pull from the package's GitHub releases or `CHANGELOG.md`; npm's page links to the source repo.

Patch and minor bumps don't need a breaking-change writeup — note them but don't dwell.

### Present and confirm

Present the proposed bumps to the user *before* editing anything, grouped by package and flagged for majors. Something like:

```
es-ds-styles
  autoprefixer  10.4.20 → 10.4.21  (patch)
  eslint         8.13.0 → 9.x      (MAJOR — flat config required)
  ...

es-ds-components
  nuxt           4.3.1 → 5.0.0     (MAJOR — drops Node 20; pairs with docs)
  reka-ui        2.8.0 → 3.0.0     (MAJOR — Menubar slot API renamed; pairs with docs)
  ...

es-ds-docs
  nuxt           4.4.2 → 5.0.0     (MAJOR — must match components)
  reka-ui        2.8.0 → 3.0.0     (MAJOR — must match components)
  ...
```

Wait for the user to approve, skip individual entries, or hold a package back to a lower major. Then apply the edits to all three `package.json` files. Keep the `^` (or whatever prefix the existing entry uses) — only the version number itself should change.

## Step 5: Reinstall

```bash
make install
```

Watch the output. If install fails outright — unresolvable peer deps, registry errors, postinstall failures — that's the signal to **back off a version**, not to bypass the check. Go back to Step 4, drop the most suspect bump back to its previous major, and try again.

**Do not use `--force` or `--legacy-peer-deps` to muscle through.** The whole point of this skill is to reduce friction, not hide it; a forced install today is a real install failure on someone else's machine next week.

## Step 6: Verify dev server matches baseline

Start the dev server again:

```bash
make dev   # run_in_background: true
```

Wait for it to come up on port 8500, then diff what you see against the Step 1 baseline.

- **Same warnings as before, server starts** → clean bump. Move on.
- **New warnings, server still starts** → investigate. If a single package is clearly the cause, the default response is to roll *that* package back to its prior major and re-run install. Avoid workarounds.
- **Server won't start, or a route crashes** → identify the suspect dep, roll it back, re-run install, re-verify.

**Strong default: hold a version back rather than build a workaround.** Workarounds in this layer (new `patch-package` patches for unrelated deps, type shims, polyfills, monkey-patches, custom Vite plugins) get expensive to maintain and undermine the point of staying current. If your fix is more than a one-line `package.json` field or a single `nuxt.config` toggle that the dep's own docs recommend, that's the line — roll back instead and tell the user that package can't be bumped right now.

The existing `patch-package` postinstall in `es-ds-docs` is a known, deliberate exception; don't remove it, but don't add new patches to "fix" a bumped dep either.

Kill the dev server when verification is done.

## Step 7: Format, test, typecheck, build

The dev server only exercises Nuxt + Vue runtime. It doesn't touch the styles pipeline, the lockfile-lint check, the auto-format config, type checking, or the production build — so a clean dev server isn't enough on its own. Run the repo's other verification targets, in this order:

```bash
make format     # prettier + eslint --fix across es-ds-components and es-ds-docs
make test       # currently runs lockfile-lint + sass dist build in es-ds-styles
make typecheck  # nuxi typecheck (vue-tsc) against es-ds-docs
make build      # sass dist build in styles + nuxt build in docs
```

- `make format` will rewrite source files according to the (possibly bumped) `prettier` / `eslint` / `@nuxt/eslint` versions. If it produces changes, that's part of the diff the user will commit — call it out in the handoff so they know formatting churn is separate from the `package.json` edits.
- `make test` failure is a real signal: it usually means a `sass`, `stylelint`, or `lockfile-lint` major broke the styles build. Apply the same rule as Step 6 — roll back the suspect dep rather than working around it.
- `make typecheck` is where Vue / Nuxt / `vue-tsc` / `typescript` / `@types/node` bumps tend to surface — new compiler errors that the dev server's runtime-only path didn't catch. If you see new errors here, the bumped TS/Vue/Nuxt is the suspect; roll the most recently bumped one back.
- `make build` is the production-mode equivalent of the dev-server check. Nitro's prerender + Vite's production bundle can fail when dev mode silently tolerated something (e.g., ESM/CJS interop, missing exports after a major bump). Treat a build failure the same as a dev-server failure: roll back the suspect dep.
- Run them in the order above. `format` first so a later step doesn't fail on a fixable lint nit; `test`/`typecheck` before `build` because the cheaper checks should fail fast.

## Step 8: Hand off

Report to the user. Keep it concise and structured:

- **Bumped:** final list of packages that landed at new versions
- **Held back:** packages that were proposed but rolled back, with the one-line reason
- **`.node-version`:** what it was, what it is now (or "unchanged")
- **Warning diff vs. baseline:** what's new, what's gone, what's unchanged
- **Manual smoke tests to run:** anything specific they should click through in the dev server given the majors that landed (e.g., "Reka 3 changed the Menubar slot API — please open the docs Menubar page and confirm it renders")

**Do not commit.** Leave the working tree dirty for the user to review the diff and commit themselves.
