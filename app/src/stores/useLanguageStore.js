import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const LanguageStore = (set, get) => ({
    currentLanguage: 'en',
    setLanguage: (language) => {
        set({
            currentLanguage: language
        });
    },
    isTutorialOpen: false,
    setIsTutorialOpen: (value) => {
        set(() => ({ isTutorialOpen: value }));
    }
});

export const useLanguageStore = create(persist(LanguageStore, { name: 'language' }));
