# Versioning

## Semantic Versioning

All design-system packages follow [semantic versioning](https://semver.org/).

1. MAJOR version changes introduce incompatible API changes. API changes could mean:
    - removal of core-components used in other verticals
    - changing "props" of core-components causing breaking changes in other verticals
2. MINOR version changes add functionality in a backwards compatible manner. This could mean:
    - changing the hex value represented by the variable `$white` in `es-bs-base`
    - adding an additional SASS variable to `es-bs-extends`
    - adding an additional "prop" to a core-component, but otherwise not chancing the default behavior
3. PATCH version changes are backwards compatible bug-fixes and should have no impact on functionality aside from fixing a bug

## Commands

### Lerna

`npx lerna publish --no-private`

This will:

1. determine the current version of the packages
2. detect which packages has changed since the last publishing & then update its version in package.json accordingly
3. create a commit of the changed package.json files, tag the commit and push the tag & commit to the remote
4. publish the packages to NPM
