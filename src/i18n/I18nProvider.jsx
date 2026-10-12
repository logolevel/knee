import { useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { I18nContext } from './I18nContext.js';
import { detectLanguage, isSupportedLanguage, translations } from './translations.js';

export function I18nProvider({ children }) {
  // Nothing is written to localStorage until the user picks a language by hand,
  // so until then the device language keeps being used.
  const [language, setLanguage] = useLocalStorage('knee.language', detectLanguage, {
    deserialize: (stored) => (isSupportedLanguage(stored) ? stored : detectLanguage()),
  });

  const messages = translations[language] ?? translations.en;

  useEffect(() => {
    document.documentElement.lang = messages.code;
    document.title = messages.documentTitle;
  }, [messages]);

  const value = useMemo(() => ({ language, setLanguage, messages }), [language, setLanguage, messages]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
