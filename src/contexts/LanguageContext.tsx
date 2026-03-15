import React, { createContext, useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type Lang = 'ar' | 'en'
type Dir = 'rtl' | 'ltr'

interface LanguageContextType {
  lang: Lang
  dir: Dir
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState<Lang>(
    (localStorage.getItem('ksu-lang') as Lang) || 'ar'
  )

  const dir: Dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    localStorage.setItem('ksu-lang', lang)
    i18n.changeLanguage(lang)
  }, [lang, dir, i18n])

  const toggleLanguage = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))

  return (
    <LanguageContext.Provider value={{ lang, dir, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
