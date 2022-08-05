import { mount } from '@vue/test-utils';
import EsReviewModal from '@/src/lib-components/EsReviewModal.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsHorizontalList', () => {
    // Basic test; should exist for most components
    test('<EsHorizontalList />', async () => {
        const wrapper = mount(EsReviewModal, {
            ...jestVue,
            propsData: {
                avgRating: 3.5,
                developerName: 'testDev',
                visible: true,
                reviews: [
                    {
                        id: 16,
                        reviewer_name: 'Ryan Dev',
                        certified: false,
                        created: '2022-06-10T14:48:56.604194Z',
                        rating: 5,
                        title: 'Really Really Long Title Really Really Long Title',
                        comment: 'shrt',
                    }, {
                        id: 11,
                        reviewer_name: 'Ryan Residential Really Long Name',
                        certified: true,
                        created: '2022-06-03T18:27:41.718753Z',
                        rating: 3,
                        title: 'testers',
                        comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex.
                Nullam vestibulum ex mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi
                molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum.
                Mauris vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus
                et magnis dis parturient montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus.
                Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet
                sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                Donec eleifend elit quam.`,
                    }, {
                        id: 12,
                        reviewer_name: 'Ryan Smith',
                        certified: true,
                        created: '2022-06-03T18:27:41.718753Z',
                        rating: 5,
                        title: 'My Title',
                        comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi in aliquam ex.
                Nullam vestibulum ex mi, ut suscipit libero condimentum id. Pellentesque eu diam vel nisi
                molestie porta eget sed odio. Quisque congue risus id metus facilisis, non imperdiet libero rutrum.
                Mauris vitae ante porttitor, consectetur purus faucibus, euismod ex. Orci varius natoque penatibus
                et magnis dis parturient montes, nascetur ridiculus mus. Nulla ullamcorper elit sed viverra finibus.
                Mauris vitae tortor mauris. Cras suscipit nibh nec nisi cursus ornare. Maecenas quis turpis sit amet
                sapien dapibus sollicitudin viverra eu justo. Vivamus posuere metus sit amet purus tempus volutpat.
                Donec eleifend elit quam.`,
                    }, {
                        id: 10,
                        reviewer_name: 'shrt',
                        certified: true,
                        created: '2022-06-03T18:26:46.588897Z',
                        rating: 4,
                        title: 'Test',
                        comment: '123',
                    }, {
                        id: 15,
                        reviewer_name: 'test',
                        certified: false,
                        created: '2022-06-09T14:10:30.290508Z',
                        rating: 5,
                        title: 'test',
                        comment: '',
                    }, {
                        id: 13,
                        reviewer_name: 'testers',
                        certified: false,
                        created: '2022-06-09T14:05:08.901091Z',
                        rating: 5,
                        title: '',
                        comment: '',
                    },
                ],
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });
});
