**NOTICE: this is a vue3 based design system, if you're working with a vue2 and/or bootstrap based micro-frontend, please see [EnergySage/es-ds-legacy](https://github.com/EnergySage/es-ds-legacy) instead**

# EnergySage Design System

This is a **monorepo** containing the elements required for building experiences
following the EnergySage Design System, or _es-ds_ for short.

- [Public works](#public-works)
- [The parts](#the-parts)
- [Contributing](#contributing)

## Public works

This repository `es-ds` **is public** and the contents are licensed under the
[MIT](https://tldrlegal.com/license/mit-license#summary)

For that reason discussion and documentation specific to EnergySage should probably be kept
within private org channels.

### EnergySage specific channels

For EnergySage specific resources & channels see the
[Quick Links section of the Design System confluence page](https://energysage.atlassian.net/wiki/spaces/DS/overview#%F0%9F%96%B1%EF%B8%8F-Quick-Links)

## The parts

Starting in version 3.0, the EnergySage Design System is composed of 2 core npm packages:

- [@energysage/es-ds-styles](https://www.npmjs.com/package/@energysage/es-ds-styles)
- [@energysage/es-ds-components](https://www.npmjs.com/package/@energysage/es-ds-components)

```mermaid
graph TB
    subgraph es-ds
        subgraph "@energysage"
            A["@energysage/es-ds-styles"]
            C["@energysage/es-ds-components"]
        end
        D[es-ds-docs]
        C-->D
    end
    Y(nuxt3)
    Z(primevue) --> C
    Y-->D
```

**es-ds-styles**

- [es-ds-styles](es-ds-styles/) started as a fork of **Bootstrap 4**.
- This package overrides the `_variables.scss` file in Bootstrap to the defaults required by the EnergySage design system.
- There are additional variables and colors that diverge and extend from the core
Bootstrap framework.
- The SASS has also been refactored to use
[the modular system](https://sass-lang.com/blog/the-module-system-is-launched/)
and dart-sass compiler.
- Prior to v3.0, `es-ds-styles` worked with the `es-vue-base` package, which is based on
[bootstrap-vue](https://bootstrap-vue.org/). As such, there are still some legacy
Bootstrap Vue styles present in `es-ds-styles`. Those are deprecated and will be removed
in a future version.

**es-ds-components**
- [es-ds-components](./es-ds-components/) contains Vue 3 components for use in Nuxt 3 projects.
It is primarily based on [PrimeVue](https://primevue.org/), with some customizations specific to EnergySage.

**es-ds-docs**
- This is the design system documentation site powered by Nuxt 3.
- It also serves a reference for
how to integrate `es-ds` packages into a Nuxt 3 project.

### Legacy packages

Prior to version 3.0, the EnergySage Design System was composed of 2 core npm packages:

- [@energysage/es-ds-styles](https://www.npmjs.com/package/@energysage/es-ds-styles)
- [@energysage/es-vue-base](https://www.npmjs.com/package/@energysage/es-vue-base)

```mermaid
graph TB
    subgraph es-ds
        subgraph "@energysage"
            A["@energysage/es-ds-styles"]
            C["@energysage/es-vue-base"]
        end
        D[es-design-system]
        C-->D
    end
    Y(nuxt2)
    Z(bootstrap-vue) --> C
    Y-->D
```

**es-vue-base**
- [es-vue-base](./es-vue-base/) contains vue components for use in nuxt projects.
It has a dependency of [bootstrap-vue](https://bootstrap-vue.org/) as components
extends or are composed of bootstrap components.
- `es-ds-styles` is a sibling dependencies and should provide the baseline CSS
styling to vue rendered components.

**es-design-system**
- This is our v2.x design-system documentation site, and reference integration for
the `es-ds` packages.

## Contributing

### Setting up the repo

clone `git@github.com:EnergySage/es-ds.git`

When publishing changes you will commit to the _origin_ branch of the _es-ds_
repo. So your git set-up should look like this:

```bash
$ git remote -v
origin  git@github.com:EnergySage/es-ds.git (fetch)
origin  git@github.com:EnergySage/es-ds.git (push)
```

### Installing Dependencies and Linking packages

1. `make install` - installs all packages from npm

### Development workflow

```
make dev
```

This command will:

- Locally link your `es-ds-styles` and `es-ds-components` folders to the `es-ds-docs` Nuxt app
- Start the `es-ds-docs` local dev server

You can then make changes as desired in either upstream package folder and the local dev server should immediately reflect those changes.

```
make unlink
```

This command will:

- Undo the local linking set up by the above command
- Reinstall the public NPM versions of the `es-ds-styles` and `es-ds-components` packages

This enables you to run the `es-ds-docs` server with the state of code that is publicly available on NPM.

```
cd es-ds-docs
npm run dev
```

These commands will:
- Run the `es-ds-docs` local dev server without locally linking to the `es-ds-styles` and `es-ds-components` packages folders
- Whichever versions of the two upstream packages are installed (or already locally linked) will be used

#### Development workflow prior to v3.0

To develop with hot reloading for all packages you'll want to run `make legacy-dev` in
the `es-ds` directory. This will build and package `es-ds-styles` and
`es-vue-base` and symlink them to `es-design-system` for use in the nuxt app. It
will then start a dev instance for `es-design-system` that will be available at
`http://localhost:8500`.

Hot reloading will take longer than a typical nuxt app, as it will need to
rebuild the packages and re-link them. This is expected.

**Faster reloads hack**

In a terminal run:

```
find es-vue-base/src/ | entr -s 'npm --prefix es-vue-base run build'
```

(You may need to run `brew install entr` first)

In another terminal run:


```
(cd es-design-system && FAST_LOCAL=true npm run dev)
```

This will result in much faster reloads that skip rebuilding all of `es-ds-styles`
as well as skipping server-side rendering. But *note* this will also throw an
error in webpack-dev server until `es-vue-base` finishes compiling, then it
should recover.

You must also ensure things work server-side before committing your changes.

Once we upgrade to Lerna 6, this should all be much faster & smoother via native [Workspace watching](https://lerna.js.org/docs/features/workspace-watching)


#### Vue Component Process

##### Unit Tests

When adding vue components to [es-vue-base](./es-vue-base/src/lib-components),
it is expected that you also write [unit-tests](./es-vue-base/tests/).

At a minimum it's recommended you create a snapshot test to catch any potential
regressions in rendered output. Depending on complexity further tests may be
required.

Tests can be run via `make test`, but this will run tests for all packages in
the repo. For faster feedback, you can `cd es-vue-base` and run `npm run test`
to only run tests for the _es-vue-base_ package.

##### Building & Re-linking

Once tests are passing, you'll need to rebuild the _es-vue-base_ package. This
can be done via `npm run build`.

Next you'll want to move back to the root of the monorepo, and run `make
symlink`. This will ensure the new package is _sym-linked_ to the other projects
in the monorepo.

### Documenting change

Once your changes have been made, you'll want to ensure they're documented
somewhere in `es-design-system`. If the change is a new component, it's expected
you'll create a new page to display the component.

_Note_ This step also functions as a form of integration testing as it will
validate the component will import and render on a nuxt page.

### Updating the changelog

In your PR, make sure to include a section in the changelog documenting your
change. Following [keep a changelog](https://keepachangelog.com/en/1.0.0/)
conventions this will look similar to the following:

```markdown
## [Unreleased]

### Added

- Thing one

### Changed

- Thing two

```

This will make it easier to ensure all changes merged into `main` are captured
in the changelog when publishing a new release.

### Publishing and Versioning

Assuming changes are approved, the process of publishing a new version is...
0. Ensure your local environment is
   [setup](./README.md#installing-dependencies-and-linking-packages) and you are on
   the `main` branch
1. Make sure the package.json versions in `es-ds-styles` and `es-ds-components` is updated to a new version 
   that hasn't been published before on NPM.
2. `npm login` - Logs you into the npm.js registry. You'll need access to our `es-ds` package there in order for things to work.
3. `make install && make symlink` - Install and symlink dependencies locally
4. `make build` - Build all packages to `*/dist` folders locally
5. `make lint && make test` - Run tests and linting to ensure they pass
6. `make publish` - Publish updated packages to
   [npmjs.com](https://www.npmjs.com/org/energysage)
7. Update [CHANGELOG.md](./CHANGELOG.md) with our newly published changes
8. `make update-docs-deps` - Install the new published versions locally
9. `git commit -m "docs: :memo: add version X.X.X to the changelog" && git push` -
   Commit and push the changelog and `package-lock.json` updates
