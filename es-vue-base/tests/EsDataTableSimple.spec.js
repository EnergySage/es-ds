import { mount } from '@vue/test-utils';
import EsDataTableSimple from '@/src/lib-components/EsDataTableSimple.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsDataTableSimple', () => {
    // Basic test; should exist for most components
    test('<EsDataTableSimple items="[\'It1\', \'It2\']" />', async () => {
        const wrapper = mount(EsDataTableSimple, {
            ...jestVue,
            propsData: {
                items: ['It1', 'It2'],
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    // Test default prop values
    test('<EsDataTableSimple items="[\'It1\', \'It2\']" /> default prop values', async () => {
        const wrapper = mount(EsDataTableSimple, {
            ...jestVue,
            propsData: {
                items: ['It1', 'It2'],
            },
        });
        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        expect(wrapper.props('fields')).toBeNull();
        expect(wrapper.props('tableClass')).toBeNull();
        expect(wrapper.props('striped')).toBeFalsy();
    });

    // Test props are there
    test('<EsDataTableSimple props />', async () => {
        const wrapper = mount(EsDataTableSimple, {
            ...jestVue,
            propsData: {
                fields: ['Fld1', 'Fld2'],
                items: ['It1', 'It2'],
                tableClass: 'cls-for-table',
                striped: true,
            },
        });

        expect(wrapper.props('fields')).toStrictEqual(['Fld1', 'Fld2']);
        expect(wrapper.props('items')).toStrictEqual(['It1', 'It2']);
        expect(wrapper.props('tableClass')).toBe('cls-for-table');
        expect(wrapper.props('striped')).toBeTruthy();

        const table = wrapper.findComponent(EsDataTableSimple);
        expect(table.text()).toContain('Fld1');
        expect(table.text()).toContain('It1');
        expect(table.find('table').classes()).toContain('table-striped');
    });

    test('<EsDataTableSimple fields="[...]" items="[...]" /> error fields and items length not matching', async () => {
        expect(() => {
            mount(EsDataTableSimple, {
                ...jestVue,
                propsData: {
                    fields: ['Fld1', 'Fld2'],
                    items: ['It1'],
                },
            });
        }).toThrow('The number of fields and items must be the same.');

        expect(() => {
            mount(EsDataTableSimple, {
                ...jestVue,
                propsData: {
                    fields: ['Fld1'],
                    items: ['It1', 'It2'],
                },
            });
        }).toThrow('The number of fields and items must be the same.');
    });

    test('<EsDataTableSimple /> error neither items prop nor slot content is defined', async () => {
        expect(() => {
            mount(EsDataTableSimple, {
                ...jestVue,
            });
        }).toThrow('Neither items prop nor slot content is defined.');
    });

    // Test slot content is there
    test('<EsDataTableSimple>Table Content</EsDataTableSimple>', async () => {
        const wrapper = mount(EsDataTableSimple, {
            ...jestVue,
            slots: {
                default: 'Table Content',
            },
        });

        expect(wrapper.props('items')).toStrictEqual([]);
        expect(wrapper.vm.$slots.default[0].text).toBe('Table Content');
        expect(wrapper.html()).toMatchSnapshot();
    });
});
