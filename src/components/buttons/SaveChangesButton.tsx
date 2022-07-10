import React from 'react'
import { Pressable, View,StyleSheet,Text, StyleProp, ViewStyle } from 'react-native'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type SaveChangesButtonProps={
    text:string
    onPress?:()=>void
    bgColor?:string,
    textColor?:string
}
export const SaveChangesButton = (props:SaveChangesButtonProps) => {
    const {text,onPress,bgColor,textColor} =props
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <View style={[styles.saveButtonWraper,bgColor?{backgroundColor:bgColor}:{}]}>
            <Pressable
                style={styles.savebutton}
                onPress={onPress}
                android_ripple={{ color: theme.palette.grey[theme.mode].main }}
            >
                <Text style={[styles.saveButtonText , textColor?{ color:textColor}:{}]}>
                    {text}
                </Text>
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
        borderColor:palette.grey[mode].main,
        borderWidth:1,
        
      },
      savebutton: {
        padding: 17.5,
        width: '100%',
        alignItems: 'center'
      },
      saveButtonText: {
        ...text.medium.P16_Lh180,
        color: palette.white[mode].main
      }
  
  
    })
  }


