import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'

export const ModalTopBarIndicator = () => {
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={styles.modalTopBa} />
    )
}

function getStyles(theme: ThemeType) {
    return StyleSheet.create({
        modalTopBa: {
            width: 60,
            height: 6,
            backgroundColor: theme.palette.lightGrey[theme.mode].main,
            borderRadius: 10,
            marginBottom: 30,
            alignSelf: "center"
        },
    })
} 