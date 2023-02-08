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
import { EsButton } from '@energysage/es-vue-base';

export default {
    name: 'HelloWorld',
    components: {
        EsButton,
    },
};
</script>
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
