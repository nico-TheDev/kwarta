import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const LanguageStore = (set, get) => ({
    currentLanguage: 'ph',
    setLanguage: (language) => {
        set({
            currentLanguage: language
        })
    }
})

export const useLanguageStore = create(persist(LanguageStore, { name: 'language' }))
