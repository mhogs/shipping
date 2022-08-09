import React from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from '../../state/theming'

export const MyStatusBar = (props: { bg?: string, barStyle?: "dark-content" | "light-content" }) => {
    const { bg, barStyle } = props
    const { theme } = useTheme()
    return (
        <StatusBar
            barStyle={barStyle ? barStyle : theme.mode === "light" ? "dark-content" : "light-content"}
            backgroundColor={bg ? bg : theme.palette.bg[theme.mode].main}
        />
    )
}
