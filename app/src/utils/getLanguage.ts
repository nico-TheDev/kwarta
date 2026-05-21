import { languages } from '../data/language-content';

export type LanguageStrings = Record<string, string>;

export const getLanguage = (currentLanguage: string): LanguageStrings => {
    return (languages as Record<string, LanguageStrings>)[currentLanguage] ?? (languages as Record<string, LanguageStrings>).en;
};
