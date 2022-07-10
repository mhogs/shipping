import React from 'react'
import { View } from 'react-native'
import { useTheme } from '../../state'

type DeviderProps = {
    spacing?: number,
    color?: string
}
export const Devider = (props: DeviderProps) => {
    const { color, spacing } = props
    const { theme } = useTheme()
    return (
        <View style={
            {
                height: 1.5,
                backgroundColor: color ? color : theme.palette.lightGrey[theme.mode].main,
                marginVertical: spacing,
                alignSelf:'stretch'
            }
        } />
    )
}
