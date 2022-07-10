import React from 'react'
import { Pressable, View,Text,StyleSheet } from 'react-native'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { LeftArrowIcon } from '../icons'

type SimpleScreenHeaderProps={
    title:string,
    goBack:()=>void,
    endIcon?:any
}
export const SimpleScreenHeader = (props:SimpleScreenHeaderProps) => {
    const {title,endIcon,goBack}= props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={styles.screenHeader}>
            <View style={{ borderRadius: 100, overflow: 'hidden' }}>
                <Pressable
                    style={styles.backButton}
                    onPress={goBack}
                    android_ripple={{ color: theme.palette.grey[theme.mode].main }}
                >
                    <LeftArrowIcon color={theme.palette.black[theme.mode].main} size={20} />
                </Pressable>
            </View>

            <Text style={styles.screenHeaderText}>{title}</Text>
            <Pressable>
              {endIcon}
            </Pressable>
            
        </View>
    )
}

const getStyles = (theme: ThemeType) => {

    const { palette, mode, text } = theme
    return StyleSheet.create({
      
      screenHeader: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center"
      },
      backButton: {
        padding: 12,
        borderWidth: 1.5,
        borderColor: palette.lightGrey[mode].main,
        borderRadius: 100
      },
      screenHeaderText: {
        ...text.medium.P16_Lh130,
        color: palette.black[mode].main,
        flex: 1,
        textAlign: "center"
      }
    })
  }