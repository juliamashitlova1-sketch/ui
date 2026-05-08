'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Language, TranslationSchema } from './types'
import { en } from './en'
import zh from './zh'

const translations: Record<Language, TranslationSchema> = { en, zh }

type I18nContextType = {
  lang: Language
  setLang: (lang: Language) => void
  t: TranslationSchema
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('pixelforge-lang') as Language | null
    if (saved === 'en' || saved === 'zh') {
      setLangState(saved)
    }
  }, [])

  function setLang(lang: Language) {
    setLangState(lang)
    localStorage.setItem('pixelforge-lang', lang)
  }

  const value: I18nContextType = {
    lang,
    setLang,
    t: translations[lang],
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return ctx
}
