# The EnergySage Design System

The EnergySage design system is build off of [Bootstrap v4](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
and [bootstrap-vue v2](https://bootstrap-vue.org/)

## Documentation

To get started working with the design system locally see [getting-started.md](./docs/es-design-system/getting-started.md).

To get started using the design system packages in a seperate repo read the main [introduction story](./content/introduction/introduction.stories.mdx).

### Public Works

`es-bs-base` and `es-bs-extends` are **public repositories** and under the
[MIT](https://tldrlegal.com/license/mit-license#summary). For that reason
Discussion and documentation specific to EnergySage should probably be kept
within private org channels.

When in doubt you can ask questions in email, slack, confluence, or jira regarding these repositories.

### The es-design-system Documentation

`es-design-system` is a statically generated nuxt.js project. The content is published
to an unlisted, but **publicly facing URL**. Therefore be mindful of what you
put into this repo.

With that being said, internal documentation can be added to the `./docs/` folder in this repo,
or in confluence.

### See Also

- [Design System Engineering](https://energysage.atlassian.net/wiki/spaces/DSE/overview) confluence page
- [UX + Design](https://energysage.atlassian.net/wiki/spaces/UX/overview)

## Components of the Design System

### es-bs-base

This is EnergySage's flavor of Bootstrap.

This package modifies the default values in bootstrap to the ones used for energysage.

- GitHub [EnergySage/es-bs-base](https://github.com/EnergySage/es-bs-base)
- npm [@energysage/es-bs-base](https://www.npmjs.com/package/@energysage/es-bs-base)

### es-bs-extends

This is non-standard extensions to the Bootstrap framework

This package includes things like an extend color-pallet.

- GitHub [EnergySage/es-bs-extends](https://github.com/EnergySage/es-bs-extends)
- npm [@energysage/es-bs-extends](https://www.npmjs.com/package/@energysage/es-bs-extends)

### es-design-system

Vue components for use in our nuxt-powered verticals

## Design System Inspiration

Our hope is to aspire to a beautiful, flexible, and well engineered
design system. Some inspiration of where we can take this system:

- [Spectrum](https://spectrum.adobe.com/) by Adobe
- [Flame](https://bancosantander.invisionapp.com/dsm/santander-group/flame-ds-santander?mode=preview) by InvisionApp
- [Polaris](https://polaris.shopify.com/) by Shopify
- [Photon](https://design.firefox.com/photon/) by FireFox
- [Material](https://material.io/design) by Google
