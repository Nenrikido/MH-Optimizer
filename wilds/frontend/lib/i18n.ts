/**
 * Internationalization translations and configuration.
 * Defines translation types and provides translations for supported UI languages.
 */

export type { Language, Translations } from './i18n/types';

import { en } from './i18n/translations/en';
import { fr } from './i18n/translations/fr';
import { de } from './i18n/translations/de';
import { es } from './i18n/translations/es';
import { es419 } from './i18n/translations/es419';
import { pt } from './i18n/translations/pt';
import { ptBR } from './i18n/translations/ptBR';
import { it } from './i18n/translations/it';
import { pl } from './i18n/translations/pl';
import type { Language, Translations } from './i18n/types';

export const SUPPORTED_LANGUAGES = ['en', 'fr', 'de', 'es', 'es-419', 'pt', 'pt-BR', 'it', 'pl'] as const;

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
  'es-419': 'Español (LatAm)',
  pt: 'Português',
  'pt-BR': 'Português (Brasil)',
  it: 'Italiano',
  pl: 'Polski',
};

export const LANGUAGE_FLAGS: Record<Language, string> = {
  en: '/flags/gb.svg',
  fr: '/flags/fr.svg',
  de: '/flags/de.svg',
  es: '/flags/es.svg',
  'es-419': '/flags/mx.svg',
  pt: '/flags/pt.svg',
  'pt-BR': '/flags/br.svg',
  it: '/flags/it.svg',
  pl: '/flags/pl.svg',
};

export function isLanguage(value: string | null | undefined): value is Language {
  return value != null && (SUPPORTED_LANGUAGES as readonly string[]).includes(value);
}

export function normalizeLanguage(value: string | null | undefined): Language {
  if (!value) return 'en';
  const normalized = value.trim();
  if (isLanguage(normalized)) return normalized;
  return 'en';
}

export const translations: Record<Language, Translations> = {
  en,
  fr,
  de,
  es,
  'es-419': es419,
  pt,
  'pt-BR': ptBR,
  it,
  pl,
};

export const getTranslations = (language: Language): Translations => {
  return translations[normalizeLanguage(language)];
};
