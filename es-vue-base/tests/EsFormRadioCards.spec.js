import { mount } from '@vue/test-utils';
import EsFormRadioCards from '@/src/lib-components/EsFormRadioCards.vue';
import EsFormRadioCard from '@/src/lib-components/EsFormRadioCard.vue';
import jestVue from '@/tests/jest.vue.config';

describe('EsFormRadioCards', () => {
    // Basic test; should exist for most components
    test('<EsFormRadioCards />', async () => {
        const wrapper = mount(EsFormRadioCards, {
            ...jestVue,
            propsData: {
                label: 'What is one plus one?',
            },
            slots: {
                default: `
                  <es-form-radio-card value="2">
                      Two
                  </es-form-radio-card>
              `,
            },
            stubs: {
                'es-form-radio-card': EsFormRadioCard,
            },
        });
        const a11y = await axe(wrapper.element);

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();
        expect(a11y).toHaveNoViolations();
    });

    test('EsFormRadioCards card click updates value', async () => {
        const label = 'What is one plus one?';
        const wrapper = mount({
            ...jestVue,
            data() {
                return {
                    answer: '',
                };
            },
            template: `
                <EsFormRadioCards label="${label}" v-model="answer">
                    <EsFormRadioCard value="1">
                        One
                    </EsFormRadioCard>
                    <EsFormRadioCard data-testid="radioCardTwo" value="2">
                        Two
                    </EsFormRadioCard>
                    <EsFormRadioCard value="3">
                        Three
                    </EsFormRadioCard>
                </EsFormRadioCards>
            `,
            components: {
                EsFormRadioCards,
                EsFormRadioCard,
            },
        });

        expect(wrapper.vm).toBeTruthy();
        expect(wrapper.html()).toMatchSnapshot();

        // expect the data to be the default value
        expect(wrapper.vm.answer).toBe('');

        // "click" one of the radio cards by calling the "change" event on it
        const testRadioCard = wrapper.find('[data-testid="radioCardTwo"]');
        const testRadioButton = testRadioCard.find('input[type="radio"]');
        await testRadioButton.trigger('change');

        // expect that the value corresponding to the "clicked" card is set
        expect(wrapper.vm.answer).toBe('2');
    });
});
