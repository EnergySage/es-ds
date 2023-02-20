// Import vue components
import * as components from './lib-components/index';
import * as icons from './lib-icons/index';

// install function executed by Vue.use()
const install = function installEsVueBase(Vue) {
    Object.entries(components).forEach(([componentName, component]) => {
        Vue.component(componentName, component);
    });
    Object.entries(icons).forEach(([componentName, component]) => {
        Vue.component(componentName, component);
    });
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from './lib-components/index';
export * from './lib-icons/index';

// To allow individual utils/mixin use
export * from './lib-mixins/index';
export * from './lib-validators/index';
