import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import plTranslations from './locales/pl.json';

i18n
    .use(LanguageDetector) // automatyczne wykrywanie języka
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslations },
            pl: { translation: plTranslations },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // React już zabezpiecza przed XSS
        }
    });

export default i18n;