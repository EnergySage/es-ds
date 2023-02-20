import { join } from 'path';

export default function autoExport(customOptions) {
    const options = {
        components: true,
        icons: true,
        ...customOptions,
    };

    this.nuxt.hook('components:dirs', (dirs) => {
        /**
         *  Auto import all components
         *  The resulting build will include bundles for all possible components.
         *  However those bundles will only be loaded if a component is needed
         */
        if (typeof options.components === 'boolean' && options.components) {
            dirs.push({
                path: join(__dirname, '../src/lib-components'),
                extensions: ['vue'],
            });
        }

        /**
         *  Auto import defined components only
         *  Imports are case sensitive and should not include an extension
         *
         *  components: ['EsAccordion', 'EsAccordionList']
         *
         */
        if (Array.isArray(options.components) && options.components.length) {
            dirs.push({
                path: join(__dirname, '../src/lib-components'),
                pattern: `**/@(${options.components.join('|')}).vue`,
            });
        }

        /**
         *  Auto import all icon components
         *  The resulting build will include bundles for all possible icons
         *  However those bundles will only be loaded if an icon is needed
         */
        if (typeof options.icons === 'boolean' && options.icons) {
            dirs.push({
                path: join(__dirname, '../src/lib-icons'),
                extensions: ['vue'],
            });
        }

        /**
         *  Auto import defined icons only
         *  Imports are case sensitive and should not include an extension
         *
         *  icons: ['icon-arrow-clockwise', 'icon-arrow-cycle']
         *
         */
        if (Array.isArray(options.icons) && options.icons.length) {
            dirs.push({
                path: join(__dirname, '../src/lib-icons'),
                pattern: `**/@(${options.icons.join('|')}).vue`,
            });
        }
    });
}
