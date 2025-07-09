# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **EnergySage Design System (es-ds)** - a Vue 3-based design system monorepo containing npm packages and documentation for building EnergySage applications.

## Project Structure

The repository consists of 3 main packages:

- **es-ds-styles/**: Bootstrap 4-based SASS/CSS framework with EnergySage customizations
- **es-ds-components/**: Vue 3 component library built on PrimeVue and Reka UI
- **es-ds-docs/**: Nuxt 3 documentation site

## Development Commands

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

**es-ds-components** (Vue 3):
- Component library using PrimeVue (unstyled) and Reka UI as base
- No build step - consumed directly as source
- Uses Vuelidate for form validation
- All components prefixed with `es-`
- Extensive icon library in `components/icon/`

**es-ds-docs** (Nuxt 3):
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

- Vue 3.5+, Nuxt 3.15+
- PrimeVue 3.53 (unstyled components)
- Reka UI 2.2 (headless components)
- Vuelidate 2.x (form validation)
- SASS 1.77+ with modern API

## Publishing Workflow

This is a public MIT-licensed repository. When publishing:
1. Update package.json versions in both es-ds-styles and es-ds-components
2. Run `make build && make lint && make typecheck && make test`
3. Publish to NPM manually in correct order (styles first, then components)
4. Update CHANGELOG.md following keepachangelog.com format