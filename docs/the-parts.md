# The Parts

The EnergySage Design System is made up of 3 core npm packages `@energysage/es-bs-base`, `@energysage/es-bs-extends`, and `@energysage/es-vue-base`.

### es-bs-base

[es-bs-base](./es-bs-base/) is our baseline CSS for all verticals. It is a drop-in replacement for bootstrap 4.

### es-bs-extends

[es-bs-extends](./es-bs-extends/) is where extensions to our core-bootstrap CSS live. This includes things like an extended color-pallet for example.

### es-vue-base

[es-vue-base](./es-vue-base/) contains vue components for use in nuxt projects. `es-bs-base` and `es-bs-extends` are sibling dependencies and should provide the baseline CSS for the vue components.
