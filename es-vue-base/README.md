# es-vue-base

An EnergySage Vue component library

## Getting Started

`npm install @energysage/es-bs-base @energysage/es-vue-base bootstrap-vue`

### Basic Example Usage

main.scss:

```scss
@import '~@energysage/es-bs-base/scss/bootstrap';
@import '~bootstrap-vue/src/index';
```

App.vue:

```javascript
<template>
    <div>
        <es-button>
            Hello World
        </es-button>
    </div>
</template>

<script>
// Imports are only necessary if you are not using nuxt plugin
import { EsButton } from '@energysage/es-vue-base';

export default {
    name: 'HelloWorld',
    components: {
        EsButton,
    },
};
</script>
```

nuxt.config.ts:

```javascript
    /** 
     * Default; import all icons and components
     * The resulting build will include bundles for all components even if they are not used
     * Unused bundles should not impact page speed performance as they are never loaded but does
     * result in longer build times
     */
    buildModules: [
        '@energysage/es-vue-base/nuxt'
    ],
```

jest.config.js:

```javascript
    // TODO: Why can't jest support SSR?
    module.exports = {
        moduleNameMapper: {
            '^@energysage/es-vue-base$': '@energysage/es-vue-base/dist/es-vue-base.umd.js',
        }
    };
```
