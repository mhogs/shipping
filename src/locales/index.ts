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

export type supportedLangCodeType = "en" | "fr" | "ar"

const supportedLanguages: supportedLangCodeType[] = ['en', 'ar', 'fr']
export const defaultLang: supportedLangCodeType = "en"

function findBestAvailableLanguage() {
  const systemLangs = Localization.locales
  console.log("=============================");
  return (
    systemLangs.map(sys_lang => sys_lang.split('-')[0]).find((locale) =>
      supportedLanguages.find((lng) => lng === locale)
    ) || defaultLang

  )
}

function changeLanguage(lng: supportedLangCodeType) {
  i18n.changeLanguage(lng)
  AsyncStorage.setItem('lng', lng)
}

function isRTL() {
  return i18n.dir() === 'rtl'
}


async function findLngFromStorage() {
  const lng = await AsyncStorage.getItem('lng')
  return lng || defaultLang

}

async function initLang() {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: { en, ar, fr },
    defaultNS: 'translation',
    fallbackLng: defaultLang,
    lng: await findLngFromStorage(),
    returnObjects: true,
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
}

initLang()

export { useTranslation } from 'react-i18next'
export { i18n, isRTL, changeLanguage }


