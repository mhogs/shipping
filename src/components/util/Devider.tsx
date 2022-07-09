import React from 'react'
import { View } from 'react-native'
import { useTheme } from '../../state'


export const Devider = () => {
    const { theme } = useTheme()
    return (
        <View style={{ height: 1.5, backgroundColor: theme.palette.lightGrey[theme.mode].main,  }} />
    )
}
