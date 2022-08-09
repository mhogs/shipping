import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '../../state'
import { ThemeType } from '../../constants/theme';


type AdresseItemProps = {
    startIcon: any;
    adress: string
}
export const AdresseItem = (props: AdresseItemProps) => {
    const { theme } = useTheme()
    const styles = getStyles(theme)
    return (
        <View style={styles.adresse}>
            {props.startIcon}
            <Text style={styles.adresseText}>
                {props.adress}
            </Text>
        </View>
    )
}
const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({


        adresse: {
            flexDirection: "row",
            alignItems: "center"
        },
        adresseText: {
            marginLeft: 14,
            ...text.medium.P14_Lh130,
            color: palette.text[mode].main
        }
    })
}
