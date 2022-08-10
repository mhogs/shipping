import React from 'react'
import { Pressable, View,Text,StyleSheet } from 'react-native'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'
import { LeftArrowIcon } from '../icons'
import { isRTL } from '../../locales'

type SimpleScreenHeaderProps={
    title?:string,
    goBack:()=>void,
    endIcon?:any
}
export const SimpleScreenHeader = (props:SimpleScreenHeaderProps) => {
    const {title,endIcon,goBack}= props
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme,isRTL()])  
    return (
        <View style={styles.screenHeader}>
            <View style={{ borderRadius: 100, overflow: 'hidden' }}>
                <Pressable
                    style={styles.backButton}
                    onPress={goBack}
                    android_ripple={{ color: theme.palette.grey[theme.mode].main }}
                >
                    <LeftArrowIcon color={theme.palette.text[theme.mode].main} size={20} />
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
        flexDirection: isRTL()? "row-reverse" : "row",
        alignItems: "center",
        paddingBottom:20
      },
      backButton: {
        padding: 12,
        borderWidth: 1.5,
        borderColor: palette.bg[mode][2],
        borderRadius: 100,
        transform: [{rotateY: isRTL()?'180deg':'0deg'}]
      },
      screenHeaderText: {
        ...text.medium.P16_Lh130,
        color: palette.text[mode].main,
        flex: 1,
        textAlign: "center"
      }
    })
  }