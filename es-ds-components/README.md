# es-ds-components

An EnergySage Nuxt layer library with design system components

## Usage

```
npm install @energysage/es-ds-components
```

Once the package is installed, you'll need to add a reference to it in your nuxt.config.ts like so:

```
// https://nuxt.com/docs/getting-started/layers#usage
extends: [
    '@energysage/es-ds-components',
],
```

That should be it! The config and components should automatically be available in your Nuxt app.

## Local development

Use the following commands to locally hook up this package to the es-ds-docs Nuxt app. Once the
es-ds-docs local dev server is running, any changes made within the es-ds-components codebase
will hot reload and automatically be reflected in the es-ds-docs Nuxt app.

```
~/es-ds/es-ds-components $ npm link
~/es-ds/es-ds-docs $ npm link @energysage/es-ds-components
```

To unlink the es-ds-docs Nuxt app from the local development version of es-ds-components,
run the following commands:

```
~/es-ds/es-ds-docs $ npm unlink --no-save @energysage/es-ds-components
~/es-ds/es-ds-components npm unlink @energysage/es-ds-components
```
