import { useLanguageStore } from '../stores/useLanguageStore'
import { languages } from '../data/language-content'

export const getLanguage = () => {
    const currentLanguage = useLanguageStore((state) => state.currentLanguage)
    return languages[currentLanguage]
}
