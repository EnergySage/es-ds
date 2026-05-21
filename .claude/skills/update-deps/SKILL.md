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

After install, snapshot the **actually-installed** versions of every direct dep across the three packages. This is your "before" — and it's the only honest one, because `^` ranges in `package.json` are floors, not the resolved version:

```bash
for pkg in es-ds-styles es-ds-components es-ds-docs; do
  jq -r --arg pkg "$pkg" '
    . as $root
    | (.packages."".dependencies // {}) * (.packages."".devDependencies // {})
    | to_entries[]
    | [$pkg, .key, .value, ($root.packages["node_modules/" + .key].version // "?")]
    | @tsv
  ' "$pkg/package-lock.json"
done > /tmp/deps-before.tsv
```

Columns are `<package>\t<name>\t<package.json-spec>\t<resolved-version>`. Spot-check the file has ~80 rows split across the three packages and no `?` in the resolved-version column before moving on. Keep `/tmp/deps-before.tsv` around — Step 4 reads it for real current versions, and Step 8 diffs it against the after-snapshot.

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

For each direct dep across the three packages, get the latest published version:

```bash
npm view <package-name> version
```

(Use `npm view <package-name> dist-tags --json` if you're unsure whether `latest` is a stable release vs. a prerelease.)

### Don't edit `package.json` for in-range bumps — let the reinstall do it

`package.json` declares a *range* (typically `^X.Y.Z`), not a pinned version. When Step 2 deletes the lockfile, the Step 5 reinstall will resolve every range to the latest matching version on its own. So a minor or patch bump within an existing `^` range happens automatically — touching `package.json` for those just adds churn to the diff and misleads anyone reading "X → Y" in the file as the actual installed version.

**Only edit `package.json` when the existing specifier cannot reach the target version.** In practice:

- `^X.Y.Z` (with X ≥ 1): edit only when crossing the major (e.g., `^1.x` → `^2.0.0`). Minor and patch bumps inside the range happen via reinstall, not via edit.
- `^0.Y.Z`: edit when crossing the minor (e.g., `^0.43.1` → `^0.52.0`) — under `^`, pre-1.0 minors *are* breaking and the range doesn't span them.
- `~X.Y.Z`: edit when crossing the `X.Y` minor.
- Exact pin (`X.Y.Z` with no `^` or `~`): edit for any change you want.

If the bump is in-range, leave `package.json` alone — the bump still happens at install time. The reinstalled lockfile is the artifact.

### Exclusions — do not bump these automatically

- `primevue`
- `nuxt-primevue`
- `@energysage/es-ds-styles` and `@energysage/es-ds-components` — these are published from *this* repo; their specifiers are managed by the release-please workflow, not by this skill.

### Version cap: `@types/node` must match the Node runtime major

`@types/node`'s major version tracks the Node.js release line it provides types for. Bumping `@types/node` *past* the major declared in `.node-version` means TypeScript will surface APIs (new globals, new stdlib signatures) that don't exist at runtime — code typechecks, then crashes in dev/CI. So cap it:

- Read the major from `.node-version` (e.g., `24.15.0` → major `24`).
- Treat the highest `@types/node` version whose major matches that as "latest" for the purposes of this skill — don't propose anything higher, even if `npm view @types/node version` returns a newer major.
- To find the right ceiling: `npm view @types/node@'<major>' version` (e.g., `npm view @types/node@'24' version`) and use the last entry.
- If `.node-version` is bumped in Step 3 to a newer Node major, the `@types/node` ceiling moves with it — re-derive after that step.

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

Use `/tmp/deps-before.tsv` (real installed versions, from Step 1) as the "from" column — not whatever `package.json` says. Group by package and flag majors. Example:

```
es-ds-styles
  autoprefixer   10.4.20 → 10.5.0   (in-range; no package.json edit)
  cross-env      7.0.3   → 10.1.0   (MAJOR — edit package.json; drops Node 18)

es-ds-components
  nuxt           4.4.4 → 4.4.6     (in-range; no package.json edit)
  reka-ui        2.8.0 → 3.0.0     (MAJOR — edit package.json; Menubar slot API renamed; pairs with docs)

es-ds-docs
  nuxt           4.4.4 → 4.4.6     (in-range; no package.json edit)
  reka-ui        2.8.0 → 3.0.0     (MAJOR — edit package.json; must match components)
```

Wait for the user to approve, skip individual entries, or hold a package back to a lower major. Then apply edits **only** to the rows marked as needing a `package.json` change. Keep the prefix the existing entry uses (`^`, `~`, or none) — only the version number itself should change. In-range bumps will be picked up automatically by the Step 5 reinstall.

## Step 5: Reinstall and snapshot the "after"

```bash
make install
```

Watch the output. If install fails outright — unresolvable peer deps, registry errors, postinstall failures — that's the signal to **back off a version**, not to bypass the check. Go back to Step 4, drop the most suspect bump back to its previous major, and try again.

**Do not use `--force` or `--legacy-peer-deps` to muscle through.** The whole point of this skill is to reduce friction, not hide it; a forced install today is a real install failure on someone else's machine next week.

Once install succeeds, snapshot the freshly-resolved versions — same shape as `/tmp/deps-before.tsv`:

```bash
for pkg in es-ds-styles es-ds-components es-ds-docs; do
  jq -r --arg pkg "$pkg" '
    . as $root
    | (.packages."".dependencies // {}) * (.packages."".devDependencies // {})
    | to_entries[]
    | [$pkg, .key, .value, ($root.packages["node_modules/" + .key].version // "?")]
    | @tsv
  ' "$pkg/package-lock.json"
done > /tmp/deps-after.tsv
```

`/tmp/deps-after.tsv` paired with `/tmp/deps-before.tsv` is the source of truth for the Step 8 handoff.

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

Report to the user. Keep it concise and structured.

**Use the lockfile snapshots as the source of truth for versions.** Diff `/tmp/deps-before.tsv` against `/tmp/deps-after.tsv` and report `<before> → <after>` for every direct dep whose resolved version changed. Do **not** report the floor from `package.json` — that's misleading because in-range bumps don't touch it.

```bash
diff <(sort /tmp/deps-before.tsv) <(sort /tmp/deps-after.tsv)
```

…or join them by `(package, name)` and emit only rows where the version column changed.

Sections to include:

- **Bumped:** every direct dep whose resolved version changed, grouped by package, formatted as `name  <before-lockfile-version> → <after-lockfile-version>`. Flag which ones required a `package.json` edit (major-crossing or out-of-range) vs which ones came along for the ride via the reinstall (in-range minor/patch).
- **Held back:** packages that were proposed but rolled back, with the one-line reason.
- **`.node-version`:** what it was, what it is now (or "unchanged").
- **Warning diff vs. baseline:** what's new, what's gone, what's unchanged.
- **Manual smoke tests to run:** anything specific they should click through in the dev server given the majors that landed (e.g., "Reka 3 changed the Menubar slot API — please open the docs Menubar page and confirm it renders").

**Do not commit.** Leave the working tree dirty for the user to review the diff and commit themselves.

Once the handoff is delivered, clean up the scratch files this skill created so they don't linger across runs:

```bash
rm -f /tmp/deps-before.tsv /tmp/deps-after.tsv
```

(Do this *after* you've written the handoff — if you wipe them earlier, you can't go back and double-check a version you reported.)
