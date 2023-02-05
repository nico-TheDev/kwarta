import { create } from 'zustand';


const LanguageStore = (get, set) => ({
    currentLanguage: "ph",
    setLanguage: (language) => {
        set({
            currentLanguage: language
        });
    }
});

export const useLanguageStore = create(LanguageStore);