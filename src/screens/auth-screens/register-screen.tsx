import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

export const RegisterScreen = () => {
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <KeyboardAvoidingView style={styles.root}>
            <Text>login screen</Text>
        </KeyboardAvoidingView>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            flex: 1,
            backgroundColor: palette.white[theme.mode].main,

        },
        
    })
}
