import { languages } from '../data/language-content';

export const getLanguage = (currentLanguage: string) => {
    return (languages as Record<string, unknown>)[currentLanguage];
};
