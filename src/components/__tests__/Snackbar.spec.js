import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Snackbar from '../Snackbar.vue';

const buttonLabel = 'Fermer';
const buttonLabelColor = 'blue';
const message = 'Tout va bien !';
const show = true;
const timeout = 2000;
const color = 'green';
const messageColor = "#000000";

describe('Snackbar', () => {

    it('renders snackbar with correct properties', async () => {
        const wrapper = mount(
            Snackbar,
            {
                props: {
                    buttonLabel: buttonLabel,
                    buttonLabelColor: buttonLabelColor,
                    message: message,
                    show: show,
                    timeout: timeout,
                    color: color,
                    messageColor: messageColor
                }
            }
        );
        const vSnackbar = wrapper.find('.snackbar-text');
        expect(vSnackbar.exists()).toBe(true);
        expect(vSnackbar.text()).equals(message);
        const vBtn = wrapper.find('.snackbar-btn-label');
        expect(vBtn.exists()).toBe(true);
    });
    
    it('emits event on button tapped', async () => {
        const wrapper = mount(
            Snackbar,
            {
                props: {
                    buttonLabel: buttonLabel,
                    buttonLabelColor: buttonLabelColor,
                    message: message,
                    show: show,
                    timeout: timeout,
                    color: color,
                    messageColor: messageColor
                }
            }
        );
        const vBtn = wrapper.find('.snackbar-btn-label');
        expect(vBtn.exists()).toBe(true);
        await vBtn.trigger('click');
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted()).toHaveProperty('on-button-tapped');
    });
    
})
