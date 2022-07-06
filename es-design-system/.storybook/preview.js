/* eslint-disable import/no-extraneous-dependencies */
import { parameters as globalParameters, decorators as globalDecorators } from '~/.nuxt-storybook/storybook/preview';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { themes } from '@storybook/theming';
import { designStages, bsVariables } from '@/utils/metadata';

import theme from './theme';
import './style.css';

export const parameters = {
    ...globalParameters,
    layout: 'centered',
    // https://storybook.js.org/docs/react/essentials/viewport
    viewport: {
        viewports: INITIAL_VIEWPORTS,
    },
    // https://storybook.js.org/addons/storybook-dark-mode
    darkMode: {
        dark: {
            ...themes.dark,
            ...theme,
        },
        light: {
            ...themes.normal,
            ...theme,
        },
    },
    backgrounds: {
        default: 'default',
        values: [
            {
                name: 'default',
                value: bsVariables.bodyBg,
            },
        ],
    },
    // https://storybook.js.org/addons/@whitespace/storybook-addon-html/
    html: {
        prettier: {
            tabWidth: 4,
            printWidth: 118,
        },
    },
    // https://storybook.js.org/docs/react/essentials/controls
    controls: {
        expanded: true,
    },
    // https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
    options: {
        storySort: {
            method: 'alphabetical',
            order: ['Introduction', 'Documentation', ...designStages],
        },
    },
};

export const decorators = [
    ...globalDecorators,
];
