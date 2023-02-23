import { resolve } from 'path';

export default function autoExport(customOptions) {
    const options = {
        ...customOptions,
    };

    this.addPlugin({
        src: resolve(__dirname, 'es-vue-base.js'),
        fileName: 'es-vue-base.js',
        options,
    });
}
