import { useLanguageStore } from '../stores/useLanguageStore'
import { languages } from '../data/language-content'

export const getLanguage = (currentLanguage) => {
    return languages[currentLanguage];
};
