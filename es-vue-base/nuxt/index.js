import { addComponent, defineNuxtModule, createResolver } from '@nuxt/kit';
import fs from 'fs';
import path from 'path';

export default defineNuxtModule({
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url);
        for (const directory of ['../src/lib-components', '../src/lib-icons']) {
            const filenames = fs.readdirSync(`${__dirname}/${directory}`);
            const filteredFiles = filenames.filter((file) => path.extname(file).toLowerCase() === '.vue');
            filteredFiles.forEach((file) => {
                const fileWithoutExt = file.slice(0, -'.vue'.length);
                addComponent(({
                    name: fileWithoutExt,
                    filePath: resolver.resolve(`${directory}/${fileWithoutExt}`),
                }));
            });
        }
    },
});
