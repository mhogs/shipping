import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'

type AuthButtonProps = {
    label: string,
    bgColor?: string,
    textColor: string,
    borderColor?: string,
    icon?: any,
    onClick: () => void,
}

export const SocialLoginButton = (props: AuthButtonProps) => {
    const { label, icon, bgColor = "white", textColor, borderColor, onClick } = props
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme])  

    return (
        <View style={[{ ...styles.buttonContainer, backgroundColor: bgColor, }, borderColor ? { borderWidth: 1, borderColor } : {}]} >
            <Pressable
                android_ripple={{color:theme.palette.grey[theme.mode][3]}}
                onPress={onClick}
                style={styles.pressable}
            >
                {icon}
                <Text style={{ ...styles.buttonText, color: textColor }}>{label}</Text>
            </Pressable>
        </View>

    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        buttonContainer: {
            borderRadius: 27,
            overflow:'hidden'
        },
        pressable:{
            height: 56,
            width:'100%',
            flexDirection:"row", 
            alignItems:"center",
            justifyContent:'center'
        },
        buttonText: {
            ...text.medium.P16_Lh130,
            marginLeft: 10,
        }
    })
}