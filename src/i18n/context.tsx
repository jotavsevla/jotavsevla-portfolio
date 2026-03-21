import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Lang, TranslationDict } from './types';
import enDict from './locales/en.json';
import ptDict from './locales/pt.json';

const STORAGE_KEY = 'portfolio_lang';

function detectLang(): Lang {
  const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored === 'pt' || stored === 'en') return stored;
  const nav = navigator.language ?? '';
  return nav.startsWith('pt') ? 'pt' : 'en';
}

interface LanguageContextValue {
  lang: Lang;
  t: (key: string) => string;
  toggleLang: () => void;
  dict: TranslationDict;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const dicts: Record<Lang, TranslationDict> = {
  pt: ptDict as TranslationDict,
  en: enDict as TranslationDict,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(detectLang);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang((l) => (l === 'pt' ? 'en' : 'pt'));
  }, []);

  const t = useCallback(
    (key: string): string => {
      const parts = key.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let value: any = dicts[lang];
      for (const part of parts) {
        if (value == null || typeof value !== 'object') return key;
        value = value[part];
      }
      if (typeof value === 'string') return value;
      return key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, dict: dicts[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
