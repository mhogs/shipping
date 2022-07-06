import { View, Text, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'

export const RegisterScreen = () => {
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
        <>
            <StatusBar backgroundColor={theme.palette.primary[theme.mode].main} />
            <View style={styles.root}>
                <Text>register screen</Text>
            </View>
        </>
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
