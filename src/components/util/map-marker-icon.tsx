import React from 'react'
import { View, StyleSheet } from 'react-native'
import { AnimatedRegion, LatLng, Marker } from 'react-native-maps'
import { useTheme } from '../../state'
import { ThemeType } from '../../theme'
import { LocationIcon } from '../icons'

type MyMarkerProps = {
    icon?: any,
    maincolor: string,
    secondaryColor: string,
}
export const MyMarkerIcon = (props: MyMarkerProps) => {
    const { icon = <LocationIcon size={14} color="#ffffff" />, maincolor, secondaryColor } = props
    const { theme } = useTheme()
    const styles = getStyles(theme)

    return (
            <View
                style={[styles.container, { backgroundColor: secondaryColor }]}
            >
                <View
                    style={[styles.wraper, { backgroundColor: maincolor }]}
                >
                    {icon}
                </View>
            </View>
    )
}

const getStyles = (theme: ThemeType) => {
    const { palette, mode, text } = theme
    return StyleSheet.create({
        container: {
            padding: 10,
            borderRadius: 38,
        },
        wraper: {
            width: 24,
            height: 24,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 18,
            borderColor: theme.palette.white[theme.mode].main,
            borderWidth: 1.5
        }
    })
}