import React from 'react'
import { Pressable, View,StyleSheet,Text } from 'react-native'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'

type SaveChangesButtonProps={
    text:string,
    onPress?:()=>void
}
export const SaveChangesButton = (props:SaveChangesButtonProps) => {
    const {text,onPress} =props
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <View style={styles.saveButtonWraper}>
            <Pressable
                style={styles.savebutton}
                onPress={onPress}
                android_ripple={{ color: theme.palette.grey[theme.mode].main }}
            >
                <Text style={styles.saveButtonText}>
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


