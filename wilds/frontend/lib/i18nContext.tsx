/**
 * Internationalization context and hooks.
 * Provides language switching functionality and translation access throughout the app.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, getTranslations, Translations } from './i18n';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

/**
 * I18n provider component that wraps the application.
 * Manages current language state and persists selection to localStorage.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('mh_opti_lang');
    return (saved as Language) || 'en';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('mh_opti_lang', lang);
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage: handleSetLanguage, t: getTranslations(language) }}>
      {children}
    </I18nContext.Provider>
  );
}

/**
 * Hook to access internationalization context.
 * Provides current language, language setter, and translations object.
 * @returns I18n context with language controls and translations
 * @throws Error if used outside of I18nProvider
 */
export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
