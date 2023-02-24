import { resolve } from 'path';

export default function autoExport(customOptions) {
    const options = {
        components: true,
        ...customOptions,
    };

    this.addPlugin({
        src: resolve(__dirname, 'plugin.template.js'),
        fileName: 'es-vue-base.js',
        options,
    });
}
