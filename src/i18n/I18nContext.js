import { createContext, useContext } from 'react';
import { translations } from './translations.js';

export const I18nContext = createContext({
  language: 'en',
  setLanguage: () => {},
  messages: translations.en,
});

export function useI18n() {
  return useContext(I18nContext);
}
