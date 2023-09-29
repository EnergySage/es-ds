import { addComponent, defineNuxtModule, createResolver } from '@nuxt/kit';
import Vue from 'vue';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import install from '..';

export default defineNuxtModule({
    setup(options, nuxt) {
        const resolver = createResolver(import.meta.url);
        addComponent(({
            name: 'EsDataTable',
            filePath: resolver.resolve('../src/lib-components/EsDataTable'),
        }));
        addComponent(({
            name: 'EsButton',
            filePath: resolver.resolve('../src/lib-components/EsButton'),
        }));
    },
});
