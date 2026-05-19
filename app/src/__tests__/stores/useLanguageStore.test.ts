import { useLanguageStore } from 'stores/useLanguageStore';

const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => { store[key] = value; },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { store = {}; },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useLanguageStore', () => {
    beforeEach(() => {
        useLanguageStore.setState({ currentLanguage: 'en', isTutorialOpen: false });
    });

    it('defaults to English', () => {
        expect(useLanguageStore.getState().currentLanguage).toBe('en');
    });

    it('setLanguage switches to Filipino', () => {
        useLanguageStore.getState().setLanguage('ph');
        expect(useLanguageStore.getState().currentLanguage).toBe('ph');
    });

    it('setLanguage switches back to English', () => {
        useLanguageStore.getState().setLanguage('ph');
        useLanguageStore.getState().setLanguage('en');
        expect(useLanguageStore.getState().currentLanguage).toBe('en');
    });

    it('isTutorialOpen defaults to false', () => {
        expect(useLanguageStore.getState().isTutorialOpen).toBe(false);
    });

    it('setIsTutorialOpen toggles the value', () => {
        useLanguageStore.getState().setIsTutorialOpen(true);
        expect(useLanguageStore.getState().isTutorialOpen).toBe(true);
        useLanguageStore.getState().setIsTutorialOpen(false);
        expect(useLanguageStore.getState().isTutorialOpen).toBe(false);
    });
});
