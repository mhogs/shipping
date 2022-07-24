import React from 'react'
import { Pressable, View, StyleSheet, Text, StyleProp, ViewStyle, ActivityIndicator } from 'react-native'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type SaveChangesButtonProps = {
  text: string
  onPress?: () => void
  bgColor?: string,
  textColor?: string,
  pending?: boolean
}
export const SaveChangesButton = (props: SaveChangesButtonProps) => {
  const { theme } = useTheme()
  const {
    text,
    onPress,
    bgColor = theme.palette.primary[theme.mode].main,
    textColor = theme.palette.white[theme.mode].main,
    pending = false } = props

  const styles = getStyles(theme)

  return (
    <View style={[styles.saveButtonWraper, { backgroundColor: bgColor }]}>
      <Pressable
        disabled={pending}
        style={styles.savebutton}
        onPress={onPress}
        android_ripple={{ color: theme.palette.grey[theme.mode].main }}
      >
        {pending ?
          <ActivityIndicator color={textColor} size="small" />
          :
          <Text style={[styles.saveButtonText,  { color: textColor }]}>
            {text}
          </Text>
        }

      </Pressable>
    </View>
  )
}

const getStyles = (theme: ThemeType) => {
  const { palette, mode, text } = theme
  return StyleSheet.create({


    saveButtonWraper: {
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: palette.primary[mode].main,
      borderColor: palette.grey[mode].main,
      borderWidth: 1,

    },
    savebutton: {
      height: 60,
      width: '100%',
      alignItems: 'center',
      justifyContent: "center"
    },
    saveButtonText: {
      ...text.medium.P16_Lh180,
      color: palette.white[mode].main
    }


  })
}


