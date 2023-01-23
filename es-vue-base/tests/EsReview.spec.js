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
                reviewerId: 2,
                userId: 1,
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
                reviewerId: 2,
                userId: 1,
                rating: 5,
                comment: 'Nice Proj',
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
        expect(comment.text()).toContain('Nice Proj');
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Title and subtext exist', () => {
        const wrapper = mount(EsReview, {
            ...jestVue,
            propsData: {
                id: 1,
                reviewerName: 'Test Bob',
                reviewerId: 2,
                userId: 1,
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

    test('Does not show edit link to non review owner', () => {
        const wrapper = mount(EsReview, {
            ...jestVue,
            propsData: {
                id: 1,
                reviewerName: 'Test Bob',
                reviewerId: 2,
                userId: 1,
                rating: 5,
                comment: 'Nice Proj',
                title: 'Proj Bob',
                created: new Date(2022, 2, 2),
            },
        });
        expect(wrapper.find('[data-testid="edit-review"]').exists()).toBe(false);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Shows edit link to review owner', () => {
        const wrapper = mount(EsReview, {
            ...jestVue,
            propsData: {
                id: 1,
                reviewerName: 'Test Bob',
                reviewerId: 1,
                userId: 1,
                rating: 5,
                comment: 'Nice Proj',
                title: 'Proj Bob',
                created: new Date(2022, 2, 2),
            },
        });
        expect(wrapper.find('[data-testid="edit-review"]').exists()).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Shows a review was updated', () => {
        const wrapper = mount(EsReview, {
            ...jestVue,
            propsData: {
                id: 1,
                reviewerName: 'Test Bob',
                reviewerId: 1,
                userId: 1,
                rating: 5,
                comment: 'Nice Proj',
                updatedComment: 'Really Nice Proj',
                title: 'Proj Bob',
                created: new Date(2022, 2, 2),
                modified: new Date(2022, 3, 2),
            },
        });

        const text = wrapper.text();

        expect(text).toContain('4/2/2022');
        expect(text).toContain('Updated by');
        expect(wrapper.find('[data-testid="badge-test"]').exists()).toBe(true);

        const esViewMore = wrapper.findComponent(EsViewMore);
        expect(esViewMore.exists()).toBe(true);

        const comment = esViewMore.find('span');
        expect(comment.exists()).toBe(true);
        expect(comment.text()).toContain('Really Nice Proj');
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Shows a review has a response', () => {
        // check for provider response

        const wrapper = mount(EsReview, {
            ...jestVue,
            propsData: {
                id: 1,
                reviewerName: 'Test Bob',
                reviewerId: 1,
                userId: 1,
                rating: 5,
                comment: 'Nice Proj',
                title: 'Proj Bob',
                created: new Date(2022, 2, 2),
                response: 'Thanks, Bob!',
                developerLogo: 'logo',
                responseDate: new Date(2022, 9, 23),
                developerName: 'Test Dev',
            },
        });

        const text = wrapper.text();

        expect(wrapper.get('[data-testid="view-response"]').exists()).toBe(true);
        expect(text).toContain('View provider response');
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('Shows both comments and response when modal is open', () => {
        // check for provider response

        const wrapper = mount(EsReview, {
            ...jestVue,
            propsData: {
                id: 1,
                reviewerName: 'Test Bob',
                reviewerId: 1,
                userId: 1,
                rating: 5,
                commentLimit: null,
                comment: 'Nice Proj',
                updatedComment: 'Very very nice proj',
                title: 'Proj Bob',
                created: new Date(2022, 2, 2),
                modified: new Date(2022, 5, 16),
                response: 'Thanks, Bob!',
                developerLogo: 'logo',
                responseDate: new Date(2022, 9, 23),
                developerName: 'Test Dev',
            },
        });
        const text = wrapper.text();
        expect(text).toContain('Nice Proj');
        expect(text).toContain('Very very nice proj');
        expect(text).toContain('Thanks, Bob!');
        expect(text).toContain('Responded on 10/23/2022');
        expect(text).toContain('3/2/2022');
        expect(text).toContain('6/16/2022');
        expect(wrapper.get('[data-testid="both-comments"]').exists()).toBe(true);
        expect(wrapper.get('[data-testid="developer-response"]').exists()).toBe(true);
        expect(wrapper.html()).toMatchSnapshot();
    });
});
