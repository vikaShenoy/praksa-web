import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './en.json'

const resources = {
  en: {
    translation: en,
  },
}

i18n.use(LanguageDetector).use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  resources,
})
