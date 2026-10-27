# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **EnergySage Design System (es-ds)** - a Nuxt 4-based design system monorepo containing npm packages and documentation for building EnergySage applications.

## Project Structure

The repository consists of 3 main packages:

- **es-ds-styles/**: Bootstrap 4-based SASS/CSS framework with EnergySage customizations
- **es-ds-components/**: Nuxt 4 component library built on PrimeVue and Reka UI
- **es-ds-docs/**: Nuxt 4 documentation site

## Development Commands

**Node version:**
The repo uses [`nodenv`](https://github.com/nodenv/nodenv) to manage Node versions, reading the pinned version from `.node-version` at the repo root. Any time `.node-version` changes, run `nodenv install` to install the declared version before `make install`, otherwise `node`/`npm` may fail or resolve to the wrong version.

**Setup and Installation:**
```bash
make install && make symlink  # Install deps and link local packages
```

**Development Workflow:**
```bash
make dev                      # Start docs site with hot reloading
make unlink                   # Restore to NPM versions
```

**Code Quality:**
```bash
make lint                     # Lint all packages
make format                   # Format code in components and docs
make typecheck                # Run TypeScript checks
make test                     # Run tests (styles only currently)
```

**Building:**
```bash
make build                    # Build all packages
```

## Architecture Notes

**es-ds-styles** (SASS/CSS):
- Fork of Bootstrap 4 with customized `_variables.scss`
- Uses modern Sass module system and dart-sass compiler
- Build outputs to `dist/css/`
- Contains comprehensive design tokens for colors, typography, spacing

**es-ds-components** (Nuxt 4):
- Component library using PrimeVue (unstyled) and Reka UI as base
- No build step - consumed directly as source
- Uses Vuelidate for form validation
- All components prefixed with `es-`
- Extensive icon library in `components/icon/`

**es-ds-docs** (Nuxt 4):
- Documentation and component showcase
- Uses local linking during development via `make symlink`
- Runs on port 8500 by default
- Contains usage examples and component demos

## Development Patterns

- Components follow PrimeVue/Reka UI patterns but are heavily customized
- SASS uses modern `@use` syntax, not `@import`
- TypeScript is enabled with type checking
- ESLint + Prettier for code formatting
- Uses Plus Jakarta Sans font family

## Key Dependencies

- Vue 3.5+
- Nuxt pinned to one exact version (see below)
- PrimeVue 3.53 (unstyled components)
- Reka UI 2.2 (headless components)
- Vuelidate 2.x (form validation)
- SASS 1.77+ with modern API

**Nuxt is pinned exactly, with no range.** `es-ds-components` lists that version in `peerDependencies`, so downstream apps must install the same one. The `nuxt` spec in `es-ds-components` `peerDependencies`, `es-ds-components` `devDependencies` and `es-ds-docs` `dependencies` must always match (CI checks this). Bump all three together, and only as a deliberate change, since it forces every downstream app to move too.

## Publishing Workflow

This is a public MIT-licensed repository. Versioning, changelogs and npm publishing are fully automated by release-please (`release-please-config.json`, `.github/workflows/release-please.yml`). Never edit package versions, `.release-please-manifest.json` or the `CHANGELOG.md` files by hand, and never publish manually.

- PR titles must follow conventional commits; the type (`feat`, `fix`, etc.) decides the version bump.
- Merging to `main` opens or updates a release PR titled `chore: release es-ds-styles and es-ds-components <version>`. Merging that PR publishes the release.
- es-ds-styles, es-ds-components and es-ds-docs always release together with the same version, and `es-ds-components` requires the exact matching `es-ds-styles` version as a peer dependency.
- Changes that only touch `es-ds-docs` never release; they deploy the docs site on merge.
