# e2e Testing

## Visual Regression Testing

As this is a design / pattern library, visual regression is particularly useful (especially for making changes to `es-bs-base`).

### Usage

In one tab, serve the statically generated routes

**NOTE** `webpack-dev-server` is very flakey when using percy snapshot testing,
*best to use the nuxt server

```
cd es-design-system
npm run generate
npm run start
```

In another tab

```
cd e2e
npm run local
```

#### Updating the baseline

Percy is normally meant to be run as part of CI. But until that time, the snapshot tool is being used to compare locally built design-system documentation against what's deployed to `design.energysage.dev`.

Running `npm run baseline` will trigger percy to update all snapshots for a "production" branch (which in this case is whatever is deployed to `design.energysage.dev`).

Running `npm run local` will trigger percy to create and upload snapshots under a "local" branch which is configured to compare against a "production" branch.

Note "local" and "production" are not real branches. Once a CI pipeline is configured, the *baseline* branch should be changed to `main`, and the pull-request branch will be compared to it.
