import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type AuthButtonProps = {
    label: string,
    bgColor: string,
    textColor: string,
    icon?: any,
    onClick: ()=>void,
}

export const SocialLoginButton = (props: AuthButtonProps) => {
    const { label, icon, bgColor, textColor, onClick } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <Pressable 
            style={{...styles.buttonContainer, backgroundColor: bgColor}}
            onPress={onClick}
        >   
            {icon}
            <Text style={{...styles.buttonText, color: textColor}}>{label}</Text>
        </Pressable>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        buttonContainer:{
            height: 56,
            alignItems:'center',
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            borderRadius:27,
        },
        buttonText:{
            ...text.medium.P16_Lh130,
            marginLeft: 10,
        }
    })
}