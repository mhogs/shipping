import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../constants/theme'

export const ModalTopBarIndicator = () => {
    const { theme } = useTheme()
    const styles = React.useMemo(() => getStyles(theme), [theme])  
    return (
        <View style={styles.modalTopBa} />
    )
}

function getStyles(theme: ThemeType) {
    return StyleSheet.create({
        modalTopBa: {
            width: 60,
            height: 6,
            backgroundColor: theme.palette.bg[theme.mode][2],
            borderRadius: 10,
            marginBottom: 30,
            alignSelf: "center"
        },
    })
} 