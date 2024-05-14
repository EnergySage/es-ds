// iife/cjs usage extends esm default export - so import it all
// TODO: How to make this work for utils
import plugin, * as exports from './entry.esm';

// Attach named exports directly to plugin. IIFE/CJS will
// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)
Object.entries(exports).forEach(([componentName, component]) => {
    if (componentName && componentName !== 'default') {
        plugin[componentName] = component;
    }
});

export default plugin;

export * from './entry.esm';

export const esVueBaseVersion = '2.0.0-alpha.5';
