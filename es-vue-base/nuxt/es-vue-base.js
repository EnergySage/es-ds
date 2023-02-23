import Vue from 'vue';
// eslint-disable-next-line import/no-unresolved
import install from '@energysage/es-vue-base';

export default function autoExport(customOptions) {
    const options = {
        components: true,
        icons: true,
        ...customOptions,
    };

    /**
     *  Auto import all components
     *  The resulting build will include bundles for all possible components.
     *  However those bundles will only be loaded if a component is needed
     */
    if (typeof options.components === 'boolean' && options.components) {
        install(Vue);
    }
}
