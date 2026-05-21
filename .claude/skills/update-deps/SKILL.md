---
name: update-deps
description: Refresh npm dependencies and `.node-version` across the es-ds monorepo (`es-ds-styles`, `es-ds-components`, `es-ds-docs`) by wiping lockfiles and letting `npm install` resolve in-range bumps. Use whenever the user says "update deps", "bump versions", "do a dependency update", "refresh package.json", or otherwise indicates they want to refresh outdated packages in this repo — even if they don't say the word "skill". Also covers `.node-version` patch bumps within the current Active LTS major. The skill **never crosses a major version** (for npm packages or for Node) and **never edits `package.json` specifiers** as part of a routine refresh. Two narrow exceptions: an explicit user request to cross a major, and a security advisory that an in-range bump can't clear.
---

# Refresh dependencies in es-ds

This skill performs a **routine refresh**. It is not for upgrading to new majors.

## The mental model

Every dep in `package.json` is declared as a range like `^X.Y.Z`. The actual installed version comes from the lockfile, not the spec — and `npm install` against a missing lockfile resolves each range to the highest matching published version. So:

- A refresh is: wipe the lockfile, run `npm install`, let the resolver pick up every in-range minor/patch.
- No `package.json` edits. No `npm view` queries. No changelog scans. No "which deps should we bump" deliberation.

Crossing a major (e.g. `^3.x` → `^4.x`) requires a deliberate `package.json` edit. **The skill does not do that as part of a refresh.** Every major bump is a breaking-change decision that deserves its own PR and its own verification — not a hidden line in a "deps refresh" commit. This applies uniformly: `nuxt`, `vue`, `primevue`, `eslint`, `@types/node`, everything. Drift is expected and acceptable — under this policy, deps will fall behind their absolute latest. That's the trade.

The same logic applies to `.node-version`: stay within the major that's currently pinned. Don't cross to a newer Active LTS major even if one exists.

## The two exceptions

Both narrow. If you're unsure whether one applies, the answer is "no" and you stay in-range.

1. **Security advisory that requires a major.** If `npm audit` reports an advisory whose only fix is in a newer major, surface it to the user with the advisory ID, severity, and source dep, and wait for explicit approval before editing the spec. Apply the *minimum* bump that clears the advisory.
2. **Explicit user request.** If the user said "bump Nuxt to 5" or "upgrade @vueuse/core to 14", honor it. Edit the spec, keep the existing prefix (`^`, `~`, or none), and if it's a shared dep (see below), bump in both `es-ds-components` and `es-ds-docs` together.

For either exception, the rest of the refresh still runs as normal — but the handoff should call out the exception explicitly so the reviewer knows that one bump is different.

## Shared-version guardrail

`es-ds-docs` extends `es-ds-components` as a Nuxt layer. Shared deps must resolve to the same major.minor in both, or layer resolution can quietly pull two different copies. Under in-range-only this is normally self-enforcing — both `package.json`s declare the same `^` range, the resolver picks the same version — but verify after the install by comparing resolved versions in the after-snapshot. If a shared dep drifted, something is wrong with the specifiers (likely a hand-edit out of sync) and you should reconcile before continuing.

Don't hardcode the overlap list — re-derive it from the current `package.json` files. As of the most recent check it included `nuxt`, `vue`, `vue-tsc`, `typescript`, `sass`, `@nuxt/eslint`, `@nuxtjs/google-fonts`, `@phosphor-icons/vue`, `@vuelidate/core`, `@vuelidate/validators`, `@vueuse/core`, `eslint`, `eslint-config-prettier`, `prettier`, `html-truncate`, `maska`, `mitt`, `prismjs`, `reka-ui`.

## Scope

This skill operates on the three packages at the repo root: `es-ds-styles`, `es-ds-components`, `es-ds-docs`. The `e2e/` directory has its own `package.json` but is **out of scope** — leave it alone unless the user explicitly asks otherwise.

---

## Step 1: Baseline

Capture "working today" so you can compare after.

Install against the existing lockfile:

```bash
make install
```

Snapshot resolved versions for every direct dep across all three packages:

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

Columns: `<package>\t<name>\t<package.json-spec>\t<resolved-version>`. Spot-check there are no `?` rows.

Capture the baseline audit counts so you can diff them later:

```bash
for pkg in es-ds-styles es-ds-components es-ds-docs; do
  echo "=== $pkg ==="
  npm --prefix "$pkg" audit 2>&1 | tail -3
done > /tmp/audit-before.txt
```

Start the dev server in the background and wait for it to come up on `http://localhost:8500`:

```bash
make dev   # run_in_background: true
```

While it starts, note every warning, deprecation, peer-dep complaint, or unresolved-import message that scrolled past during `make install` *and* `make dev`. That list is the diff target for Step 4. Then kill the dev server.

Run the rest of the checks on the *current* tree:

```bash
make format
make test
make typecheck
make build
```

If any of those is already failing, **stop and report**. Don't stack a refresh on top of a pre-existing failure — you'll lose the ability to attribute new breakage.

## Step 2: `.node-version` (within current major only)

`.node-version` pins the Node `major.minor.patch` for the team and CI. The repo uses **`nodenv`** as the version manager.

Read the current pin and find the highest published patch on the **same major**:

```bash
cat .node-version
```

Then look up the latest published `v<major>.x.x` at `https://nodejs.org/dist/` (the directory listing — not the `previous-releases` summary, which has been observed returning hallucinated patch numbers). Cross-check that `nodenv install --list | grep '^<major>\.'` actually knows about the version before pinning to it.

**Do not cross majors**, even if a newer Active LTS major line exists. Crossing a Node major is a deliberate decision the user makes separately, not part of a refresh.

If the current pin is already the highest published patch on the current major, leave it alone and skip the rest of this step. Otherwise edit `.node-version` and immediately run:

```bash
nodenv install
```

If that errors with "definition not found" for a version that should exist, run `brew upgrade node-build` to refresh node-build's registry, then retry. If it still fails after that, the version isn't actually published yet despite what any summary claimed — revert `.node-version` to what it was.

## Step 3: Refresh

Wipe install artifacts so the resolver picks fresh in-range versions instead of reusing whatever's already locked:

```bash
rm -rf es-ds-styles/node_modules es-ds-styles/package-lock.json
rm -rf es-ds-components/node_modules es-ds-components/package-lock.json es-ds-components/.nuxt es-ds-components/.output
rm -rf es-ds-docs/node_modules es-ds-docs/package-lock.json es-ds-docs/.nuxt es-ds-docs/.output
```

`.nuxt` and `.output` may not exist in every package — `rm -rf` is a no-op when they're absent, which is fine.

Reinstall and re-link local packages:

```bash
make install
make symlink
```

If install fails:

- Transient network blip → retry once.
- Peer-dep conflict introduced by a newly-resolved in-range bump → identify the suspect dep, pin it temporarily to the prior resolved version (you can read the prior version out of `/tmp/deps-before.tsv`), and reinstall. Roll back the smallest thing necessary.
- **Do not use `--force` or `--legacy-peer-deps`.** A forced install today is a real install failure on someone else's machine next week.

Snapshot the freshly-resolved versions:

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

for pkg in es-ds-styles es-ds-components es-ds-docs; do
  echo "=== $pkg ==="
  npm --prefix "$pkg" audit 2>&1 | tail -3
done > /tmp/audit-after.txt
```

## Step 4: Verify

Re-run the same checks from Step 1, in the same order, against the refreshed tree.

```bash
make dev   # run_in_background: true; wait for localhost:8500
make format
make test
make typecheck
make build
```

Diff what you see against the Step 1 baseline:

- **Same warnings, server starts, all checks pass** → clean refresh. Move on.
- **New warnings, new errors, or a failing check** → identify the suspect dep from the diff between `/tmp/deps-before.tsv` and `/tmp/deps-after.tsv`, roll it back to its prior resolved version (by temporarily narrowing the spec or pinning), reinstall, re-verify. Roll back the *smallest* thing that clears the regression.

**Strong default: hold a version back rather than build a workaround.** Workarounds in this layer (new `patch-package` patches for unrelated deps, type shims, polyfills, monkey-patches, custom Vite plugins) get expensive to maintain. If your fix is more than a one-line `package.json` field or a single `nuxt.config` toggle that the dep's own docs recommend, that's the line — roll back instead and tell the user that package can't be bumped right now.

The existing `patch-package` postinstall in `es-ds-docs` is a known, deliberate exception; don't remove it, but don't add new patches to "fix" a bumped dep either.

`make format` may rewrite source files according to bumped `prettier` / `eslint` / `@nuxt/eslint`. Call that out separately in the handoff so the user knows formatting churn isn't part of the version edits.

Kill the dev server when verification is done.

## Step 5: Hand off

Report concisely. **Use the lockfile snapshots as the source of truth for versions.** Do not report `package.json` floors — under in-range refresh those don't move, even though resolved versions did.

```bash
diff <(sort /tmp/deps-before.tsv) <(sort /tmp/deps-after.tsv)
```

Sections to include:

- **Bumped:** every direct dep whose resolved version changed, grouped by package, formatted as `name  <before> → <after>`. Under the default flow these are all in-range minor/patch; you don't need to flag anything as "major" because none of them are.
- **Held back:** in-range bumps that were rolled back because they broke verification, with the one-line reason.
- **`.node-version`:** what it was, what it is now (or "unchanged"). Always within the same major.
- **Security advisories:** baseline count vs. after-install count. If any remain unresolved, list them with severity and the source dep. If any required a major-bump exception, name the dep and the new spec.
- **Exceptions applied:** if any major bump landed under one of the two escape valves, name it with the reason (advisory ID for security, or "user-requested" with the verbatim ask). For an in-range-only refresh this section is just "none".
- **Warning diff vs. baseline:** what's new, what's gone, what's unchanged.
- **Manual smoke tests:** for an in-range-only refresh, default to "none — all bumps are minor/patch". Only list smoke tests when an exception landed, and only for the specific UI surface that the exception touches.

**Do not commit.** Leave the working tree dirty for the user to review the diff and commit themselves.

Clean up scratch files *after* writing the handoff:

```bash
rm -f /tmp/deps-before.tsv /tmp/deps-after.tsv /tmp/audit-before.txt /tmp/audit-after.txt
```
