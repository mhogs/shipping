import React,{useMemo} from 'react'
import { Pressable, View, StyleSheet, Text, StyleProp, ViewStyle, ActivityIndicator } from 'react-native'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'

type SaveChangesButtonProps = {
  text: string
  onPress?: () => void
  bgColor?: string,
  textColor?: string,
  pending?: boolean,
  disabled?: boolean
}
export const SaveChangesButton = (props: SaveChangesButtonProps) => {
  const { theme } = useTheme()
  const {
    text,
    onPress,
    bgColor = theme.palette.primary[theme.mode].main,
    textColor = theme.palette.white[theme.mode].main,
    pending = false,
    disabled
  } = props


  const styles = React.useMemo(() => getStyles(theme), [theme])  

  return (
    <View style={[styles.saveButtonWraper, { backgroundColor: disabled?theme.palette.grey[theme.mode].main: bgColor }]}>
      <Pressable
        disabled={disabled}
        style={styles.savebutton}
        onPress={onPress}
        android_ripple={{ color: theme.palette.grey[theme.mode].main }}
      >
        {pending ?
          <ActivityIndicator color={textColor} size="small" />
          :
          <Text style={[styles.saveButtonText, { color: textColor }]}>
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
      //borderColor: palette.grey[mode].main,
      //borderWidth: 1,

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


