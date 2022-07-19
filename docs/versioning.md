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
