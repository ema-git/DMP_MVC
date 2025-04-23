import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ErrorFetch from '../ErrorFetch.vue';

const defaultMessage = 'Une erreur est survenue';
const defaultButtonText = 'Réessayer';

describe('ErrorFecth', () => {

    it('renders default component', async () => {
        const wrapper = mount(
            ErrorFetch,
            {
                props: {},
            }
        );
        const messageComponent = wrapper.find('.ma-5');
        expect(messageComponent.exists()).toBe(true);
        expect(messageComponent.text()).equals(defaultMessage);
        const btnComponent = wrapper.find('.v-btn');
        expect(btnComponent.exists()).toBe(true);
        expect(btnComponent.text()).equals(defaultButtonText);
    });

    it('renders component with custom texts', async () => {
        const customMessage = 'custom message !';
        const customBtnText = 'try again';
        const wrapper = mount(
            ErrorFetch,
            {
                props: {
                    message: customMessage,
                    buttonText: customBtnText
                },
            }
        );
        const messageComponent = wrapper.find('.ma-5');
        expect(messageComponent.exists()).toBe(true);
        expect(messageComponent.text()).equals(customMessage);
        const btnComponent = wrapper.find('.v-btn');
        expect(btnComponent.exists()).toBe(true);
        expect(btnComponent.text()).equals(customBtnText);
    });
    
    it('emits event on button tapped', async () => {
        const wrapper = mount(
            ErrorFetch,
            {
                props: {},
            }
        );
        const btnComponent = wrapper.find('.v-btn');
        btnComponent.trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted()).toHaveProperty('onButtonTapped');
    });
    
});