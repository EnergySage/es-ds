import { mount } from '@vue/test-utils';
import EsReview from '@/src/lib-components/EsReview.vue';
import EsRating from '@/src/lib-components/EsRating.vue';
import EsViewMore from '@/src/lib-components/EsViewMore.vue';
import VerifiedIcon from '@/src/lib-icons/verified.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsReview', () => {
    // Basic test; should exist for most components
    test('<EsReview />', async () => {
        const wrapper = mount(EsReview, {
            ...jestVue,
            propsData: {
                id: 1,
                reviewerName: 'My Name',
                rating: 5,
                comment: 'Nice Proj',
                created: new Date(2022, 2, 2),
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('Imported components exist', () => {
        const wrapper = mount(EsReview, {
            ...jestVue,
            propsData: {
                id: 1,
                reviewerName: 'My Name',
                rating: 5,
                comment: 'Nice Proj',
                updatedComment: 'Not a nice proj',
                title: 'Proj Bob',
                certified: true,
                created: new Date(2022, 2, 2),
            },
        });
        expect(wrapper.findComponent(EsRating).exists()).toBe(true);
        expect(wrapper.findComponent(VerifiedIcon).exists()).toBe(true);

        const esViewMore = wrapper.findComponent(EsViewMore);
        expect(esViewMore.exists()).toBe(true);

        const comment = esViewMore.find('span');
        expect(comment.exists()).toBe(true);
        expect(comment.text()).toContain('Not a nice proj');
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Title and subtext exist', () => {
        const wrapper = mount(EsReview, {
            ...jestVue,
            propsData: {
                id: 1,
                reviewerName: 'Test Bob',
                rating: 5,
                comment: 'Nice Proj',
                title: 'Proj Bob',
                created: new Date(2022, 2, 2),
            },
        });
        expect(wrapper.find('[data-testid="title-test"]').exists()).toBe(true);
        const subtextTest = wrapper.find('[data-testid="subtext-test"]');
        expect(subtextTest.exists()).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
