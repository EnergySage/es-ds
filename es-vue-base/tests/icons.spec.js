import { mount } from '@vue/test-utils';
import jestVue from './jest.vue.config';
import * as icons from '../src/lib-components/icons';

describe('icons', () => {
    const cases = Object.keys(icons).map((iconName) => [
        iconName,
        // eslint-disable-next-line import/namespace
        icons[iconName],
    ]);

    test.concurrent.each(cases)('%s renders correctly', async (name, icon) => {
        const wrapper = mount(icon, {
            ...jestVue,
        });
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
    });
});
