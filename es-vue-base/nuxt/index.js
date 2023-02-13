import { join } from 'path';

export default function autoExport(customOptions) {
    const options = {
        components: true,
        icons: true,
        ...customOptions,
    };

    this.nuxt.hook('components:dirs', (dirs) => {
        // Auto import components
        if (options.components) {
            dirs.push({
                path: join(__dirname, '../src/lib-components'),
                extensions: ['vue'],
            });
        }

        // Auto import icons
        if (options.icons) {
            dirs.push({
                path: join(__dirname, '../src/lib-icons'),
                extensions: ['vue'],
            });
        }
    });
}
