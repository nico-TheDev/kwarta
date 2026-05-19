import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageStore {
    currentLanguage: 'en' | 'ph';
    setLanguage: (language: 'en' | 'ph') => void;
    isTutorialOpen: boolean;
    setIsTutorialOpen: (value: boolean) => void;
}

const LanguageStore = (set: any): LanguageStore => ({
    currentLanguage: 'en',
    setLanguage: (language) => set({ currentLanguage: language }),
    isTutorialOpen: false,
    setIsTutorialOpen: (value) => set({ isTutorialOpen: value }),
});

export const useLanguageStore = create(persist(LanguageStore, { name: 'language' }));
