import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useTheme } from '../../state/theming'
import { ThemeType } from '../../theme'
import { infoCircleIcon } from '../../assets'
import { Space } from './Space'

type WarningTextProps = {
    text: string,
    withIcon: boolean
}

export const WarningText = (props : WarningTextProps) => {
    const { text, withIcon } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={styles.root}>
            { withIcon? <Image source={infoCircleIcon} />: null }
            { withIcon? <Space direction='horizontal' size={12} />: null }
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}


const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        root: {
            backgroundColor: palette.warning[mode][3],
            paddingHorizontal: 14,
            paddingVertical: 10,
            borderRadius: 12,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            
        },
        text: {
            ...text.medium.P14_Lh180,
            color: palette.warning[mode][2],
        },
    })
}