// Import vue components
import * as components from '@/src/lib-components/index';

// install function executed by Vue.use()
const install = function installEsVueBase(Vue) {
    Object.entries(components).forEach(([componentName, component]) => {
        Vue.component(componentName, component);
    });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/src/lib-components/index';

// To allow individual utils/mixin use
export * from '@/src/lib-utils/index';
