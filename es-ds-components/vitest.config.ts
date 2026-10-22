import { defineVitestProject } from '@nuxt/test-utils/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        projects: [
            {
                test: {
                    name: 'unit',
                    include: ['app/composables/**/*.test.ts', 'app/utils/**/*.test.ts'],
                    environment: 'node',
                },
            },
            // component tests mount SFCs inside a Nuxt runtime so auto-imports resolve
            await defineVitestProject({
                test: {
                    name: 'nuxt',
                    include: ['app/components/**/*.test.ts'],
                    environment: 'nuxt',
                    environmentOptions: {
                        nuxt: {
                            // dev mode keeps import.meta.dev warnings, which tests assert on
                            overrides: { dev: true },
                        },
                    },
                },
            }),
        ],
    },
});
