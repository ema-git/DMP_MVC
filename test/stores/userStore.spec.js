import { describe, it, expect, beforeEach } from 'vitest'
import { useUserStore } from '../../src/stores/userStore.js';
import { createPinia, setActivePinia } from 'pinia';

beforeEach(() => {
    setActivePinia(createPinia())
})

describe('userStore', () => {

    

});