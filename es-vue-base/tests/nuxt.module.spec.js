import { join } from 'path';
import autoExport from '@/nuxt';

describe('autoExport', () => {
    let hookCallback;
    let nuxtMock;

    beforeEach(() => {
    // Mock the `hook` method and capture the callback passed to it.
        hookCallback = jest.fn();
        nuxtMock = {
            hook: jest.fn((eventName, callback) => {
                if (eventName === 'components:dirs') {
                    hookCallback = callback;
                }
            }),
        };
    });

    it('should add all components and icons directories to the `dirs` array when no options are provided', () => {
        autoExport.call({ nuxt: nuxtMock }, {});

        const dirs = [];
        hookCallback(dirs);

        expect(dirs).toContainEqual({
            path: join(__dirname, '../src/lib-components'),
            extensions: ['vue'],
        });
        expect(dirs).toContainEqual({
            path: join(__dirname, '../src/lib-icons'),
            extensions: ['vue'],
        });
    });

    it('should add only the specified components to the `dirs` array', () => {
        autoExport.call({ nuxt: nuxtMock }, { components: ['ComponentA', 'ComponentB'] });

        const dirs = [];
        hookCallback(dirs);

        expect(dirs).toContainEqual({
            path: join(__dirname, '../src/lib-components'),
            pattern: '**/@(ComponentA|ComponentB).vue',
        });
        expect(dirs).not.toContainEqual({
            path: join(__dirname, '../src/lib-components'),
            extensions: ['vue'],
        });
        expect(dirs).toContainEqual({
            path: join(__dirname, '../src/lib-icons'),
            extensions: ['vue'],
        });
    });

    it('should add only the specified icons to the `dirs` array', () => {
        autoExport.call({ nuxt: nuxtMock }, { icons: ['icon1', 'icon2'] });

        const dirs = [];
        hookCallback(dirs);

        expect(dirs).toContainEqual({
            path: join(__dirname, '../src/lib-icons'),
            pattern: '**/@(icon1|icon2).vue',
        });
        expect(dirs).not.toContainEqual({
            path: join(__dirname, '../src/lib-icons'),
            extensions: ['vue'],
        });
        expect(dirs).toContainEqual({
            path: join(__dirname, '../src/lib-components'),
            extensions: ['vue'],
        });
    });
});
