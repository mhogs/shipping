import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

type AuthButtonProps = {
    label: string,
    onClick: ()=>void,
}

export const AuthActionButton = (props: AuthButtonProps) => {
    const { label, onClick } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <Pressable 
            style={styles.actionButtonContainer}
            onPress={onClick}
        >
            <Text style={styles.actionButtonText}>{label}</Text>
        </Pressable>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        actionButtonContainer:{
            height: 56,
            backgroundColor: palette.primary[theme.mode].main,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:27,
        },
        actionButtonText:{
            color: palette.white[theme.mode].main,
            ...text.medium.P16_Lh130
        }
    })
}