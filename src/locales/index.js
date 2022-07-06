import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import AsyncStorage from '@react-native-async-storage/async-storage'

import ar from './ar.json'
import en from './en.json'
import fr from './fr.json'
import { I18nManager } from 'react-native'

// prevent swapping left to right and vice versa, so we can use the same behaviour on RTL and LTR devices by using isRTL function.
I18nManager.forceRTL(false)
I18nManager.allowRTL(false)

function findBestAvailableLanguage() {
  return (
    Localization.locales.find((locale) =>
      ['en', 'ar', 'fr'].find((lng) => lng === locale.split('-')?.[0])
    ) || 'en'
  )
}

function changeLanguage(lng) {
  i18n.changeLanguage(lng)
  AsyncStorage.setItem('lng', lng)
}

function isRTL() {
  return i18n.dir() === 'rtl'
}

function initI18N() {
  AsyncStorage.getItem('lng').then((lng) => {
    i18n.changeLanguage(lng)
  })
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: { en, ar, fr },
  defaultNS: 'translation',
  fallbackLng: 'en',
  lng: findBestAvailableLanguage(),
  returnObjects: true,
  nonExplicitSupportedLngs: true,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
})
export { useTranslation } from 'react-i18next'
export { i18n, isRTL, initI18N, changeLanguage }
