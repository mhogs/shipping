


import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { Fragment, useEffect, useState } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, Image, Pressable, TextInput, ScrollView } from 'react-native'
import { ArabicIcon, ChangeImageIcon, ColoredCallIcon, ColoredProfileIcon, EnglishIcon, FrenchIcon, lockIcon, ProfilePicture } from '../../assets'
import { SaveChangesButton } from '../../components/buttons'
import { CheckedIcon, EyeIcon, LeftArrowIcon, LockOutLineIcon } from '../../components/icons'
import { MyTextInput } from '../../components/inputs'
import { MenuItem, useHideBottomBar } from '../../components/navigation'
import { SimpleScreenHeader, Space } from '../../components/util'
import { changeLanguage, defaultLang, i18n, supportedLangCodeType, useTranslation, isRTL } from '../../locales'
import { ProfileStackParamList } from '../../navigation/ProfileStack'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'

type UpdateLanguageScreenProps = NativeStackScreenProps<ProfileStackParamList, 'LanguageSetting'>;

export const UpdateLanguageScreen = ({ navigation }: UpdateLanguageScreenProps) => {
  // 1 is the depth of this screen relative to the stack
  useHideBottomBar(navigation, 1)
  const { goBack } = navigation
  const { theme } = useTheme()
  const styles = React.useMemo(() => getStyles(theme), [theme, isRTL()])
  const { t } = useTranslation("update_lang")
  const [currentLang, setLang] = useState(i18n.language as supportedLangCodeType || defaultLang)
  function updateLang(lang: supportedLangCodeType) {
    changeLanguage(lang)
    setLang(lang)
    goBack()
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView style={styles.root} >

        <SimpleScreenHeader title={t("Language")} goBack={goBack} />
        <Space direction='vertical' size={30} />
        {
          getLangsList(currentLang).map(lang => (
            <Fragment key={lang.code}>
              <MenuItem
                title={lang.name}
                icon={lang.icon}
                selected={lang.selected}
                onPress={() => updateLang(lang.code)}
              />
              <Space direction='vertical' size={15} />
            </Fragment>
          ))
        }
      </KeyboardAvoidingView>
    </ScrollView>



  )
}

const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({
    root: {
      flex: 1,
      padding: 24,
      backgroundColor: palette.bg[mode].main,
    },
  })
}

type LangType = {
  name: "العربية" | "Français" | "English",
  code: supportedLangCodeType,
  icon: any,
  selected: boolean
}

function getLangsList(currentLang: supportedLangCodeType): LangType[] {


  return [
    {
      name: "العربية",
      code: 'ar',
      icon: <Image source={ArabicIcon} style={{ width: 24, height: 24 }} />,
      selected: currentLang.includes("ar")
    },
    {
      name: "Français",
      code: 'fr',
      icon: <Image source={FrenchIcon} style={{ width: 24, height: 24 }} />,
      selected: currentLang.includes("fr"),
    },
    {
      name: "English",
      code: 'en',
      icon: <Image source={EnglishIcon} style={{ width: 24, height: 24 }} />,
      selected: currentLang.includes("en")
    },
  ]
}
